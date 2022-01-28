import React from 'react';
import { useQuery } from '@apollo/client';

import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import Title from './Title';

import Transaction from './Transaction';
import { useCryptoContext } from '../utils/CryptoContext';
import { GET_ME, GET_PORTFOLIO, GET_CRYPTOINFO } from '../utils/queries';


// gridType will either be 'my' or 'all'
export default function CryptoGrid({ gridType }) { // prop validation??? Default props??

    // ============================================================================ //
    //                       //   Crypto Table   //                                 //
    // ============================================================================ //
    const columns = gridType === 'all'
        ?
        [{ id: 'name', label: 'Name', minWidth: 170 },
        { id: 'ticker', label: 'Ticker', minWidth: 100 },
        { id: 'price', label: 'Price\u00a0(USD)', minWidth: 170 },
        { id: 'buysell', label: 'Buy/Sell', minWidth: 100, align: 'right' }]
        :
        [{ id: 'name', label: 'Name', minWidth: 170 },
        { id: 'ticker', label: 'Ticker', minWidth: 100 },
        { id: 'price', label: 'Price per Coin\u00a0(USD)', minWidth: 170 },
        { id: 'quantity', label: 'Quantity', minWidth: 170 },
        { id: 'investment', label: 'Total Value', minWidth: 170 },
        { id: 'buysell', label: 'Buy/Sell', minWidth: 100, align: 'right' }];

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(100);
    const [open, setOpen] = React.useState(false);
    const [price, setPrice] = React.useState(Number.MIN_VALUE);
    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ //


    // ============================================================================ //
    //  ORDER OF OPERATIONS MUST GO:  GET_ME => GET_PORTFOLIO => GET_CRYPTOINFO  //
    // ============================================================================ //
    const { currentticker, handletickerchange } = useCryptoContext();

    // ============================================================================ //
    //                             //   GET_ME   //                                 //
    // ============================================================================ //
    let un = 'Loading...'; // Init variable for holding. Prevents crashing due to null values if the query is too slow.
    const { loading: getme_loading, data: getme_data } = useQuery(GET_ME);

    if (getme_loading) {
        console.log('Loading username data in CryptoGrid.js...');
    } else {
        if (!getme_data) {
            console.log(un, 'Falsey \'un\' in CryptoGrid.js. Should never get here.'); // Delete this (if) once working to increase performance
        } else if (getme_data) {
            un = getme_data.me.username;
            console.log(un, 'Truthy \'un\' in CryptoGrid.js');
            // SHOULD HAVE QUIT HERE???
        }
    }
    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ //



    // ============================================================================ //
    //                         //   GET_PORTFOLIO   //                              //
    // ============================================================================ //

    let curCryptos = [{ __typename: 'Crypto', ticker: 'BTC', quantity: 9.99999 }]; //, { __typename: 'Crypto', ticker: 'ETH', quantity: 9.99999 }]; // Init variable for holding. Prevents crashing due to null values if the query is too slow.
    const { loading: getPortfolio_loading, data: getPortfolio_data } = useQuery(GET_PORTFOLIO, { variables: { name: un } });

    if (getPortfolio_loading) {
        console.log('Loading portfolio data in CryptoGrid.js...');
    } else {
        if (!getPortfolio_data) {
            console.log(curCryptos, 'Falsey \'curCryptos\' in CryptoGrid.js. Should never get here.'); // Delete this (if) once working to increase performance
        } else if (getPortfolio_data?.getPortfolio?.cryptos) {
            curCryptos = getPortfolio_data.getPortfolio.cryptos;
            console.log(curCryptos, 'Truthy \'curCryptos\' in CryptoGrid.js');
            // SHOULD HAVE QUIT HERE???
        }
    }
    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ //



    // ============================================================================ //
    //                         //   GET_CRYPTOINFO   //                             //
    // ============================================================================ //

    const { loading: getCryptoInfo_loading, data: getCryptoInfo_data } = useQuery(GET_CRYPTOINFO);

    let map = new Map();
    curCryptos.forEach((element) => {
        if (map.has(element.ticker)) {
            map.set(element.ticker, map.get(element.ticker) + element.quantity);
        } else {
            map.set(element.ticker, element.quantity);
        }
    });

    const cryptoQuantities = [...map.entries()];

    function getButton(ticker) {
        return (
            <button type="button">Trade</button>
        );
    }
    function createData(name, ticker, price) {
        const btn = getButton(ticker);
        return { name, ticker, price, btn };
    }

    // default seed getCryptoInfo_data
    var rows = [
        createData('Bitcoin', 'BTC', 44000),
        createData('Ethereum', 'ETH', 4080),
    ];

    if (getCryptoInfo_loading) {
        // console.log('loading crypto grid...');
    } else {
        const temp = [];

        if (gridType === 'all') {
            for (let i = 0; i < getCryptoInfo_data.cryptoData.cryptoInfo.length; i++) {
                temp[i] = getCryptoInfo_data.cryptoData.cryptoInfo[i].slice();
            }
            temp.forEach((element) => {
                element.push(getButton(element[1]));
            });
        } else {
            for (let i = 0; i < getCryptoInfo_data.cryptoData.cryptoInfo.length; i++) {
                if (map.has(getCryptoInfo_data.cryptoData.cryptoInfo[i][1])) {
                    temp[i] = getCryptoInfo_data.cryptoData.cryptoInfo[i].slice();
                }
            }
            temp.forEach((element) => {
                // quantity
                element.push(map.get(element[1]));
                // investment
                const total = map.get(element[1]) * element[2];
                element.push(total.toFixed(2));
                element.push(getButton(element[1]));
            });
        }
        rows = temp;
    }
    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ //

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handleOpen = (bool) => setOpen(bool);


    return (
        <React.Fragment>
            <Title>{gridType === 'all' ? 'Browse Cryptos' : 'My Cryptos'}</Title>
            <Stack spacing={2} sx={{ width: 300 }}>
                <Autocomplete
                    id="search-for-crypto"
                    freeSolo
                    options={rows.map((option) => option[1])}
                    renderInput={(params) => <TextField
                        {...params}
                        label="Search For Crypto"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                const ticker = params.inputProps.value.toLowerCase();
                                handletickerchange(ticker);
                            }
                        }}
                    />}
                />
            </Stack>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="Crypto Table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    return (
                                        <TableRow
                                            hover role="checkbox"
                                            tabIndex={-1}
                                            key={index}
                                            currentticker={currentticker}
                                            handletickerchange={handletickerchange}
                                            onClick={(event) => {
                                                // handleOpen(true);
                                                event.preventDefault();
                                                handletickerchange(row[1]);
                                                // handles what row is being clicked on, saves ticker to render other components, saves to context
                                            }}
                                        >
                                            {columns.map((column, index) => {
                                                const value = row[index];
                                                if (index === 3 && gridType === 'all') {
                                                    return (
                                                        <TableCell
                                                            key={index}
                                                            align={column.align}
                                                            onClick={(event) => {
                                                                event.preventDefault();
                                                                event.stopPropagation();
                                                                handletickerchange(row[1]);
                                                                // console.log(row[1] + " button clicked");
                                                                setPrice(row[2]);
                                                                handleOpen(true);
                                                            }}
                                                        >
                                                            {column.format && typeof value === 'number'
                                                                ? column.format(value)
                                                                : value}
                                                        </TableCell>
                                                    );
                                                } else if (index === 5 && gridType === 'my') {
                                                    return (
                                                        <TableCell
                                                            key={index}
                                                            align={column.align}
                                                            onClick={(event) => {
                                                                event.preventDefault();
                                                                event.stopPropagation();
                                                                handletickerchange(row[1]);
                                                                // console.log(row[1] + " button clicked");
                                                                setPrice(row[2]);
                                                                handleOpen(true);
                                                            }}
                                                        >
                                                            {column.format && typeof value === 'number'
                                                                ? column.format(value)
                                                                : value}
                                                        </TableCell>
                                                    );
                                                }
                                                return (
                                                    <TableCell
                                                        key={index}
                                                        align={column.align}
                                                    >
                                                        {column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : value}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>

                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <div>
                {open
                    ? <Transaction open={open} handleOpen={handleOpen} action={'buy'} price={price} />
                    : <div></div>
                }
            </div>
            <Link color="primary" target="_blank" href="https://coinmarketcap.com/" sx={{ mt: 3 }}>
                See more Cryptos
            </Link>
        </React.Fragment>
    );
}
