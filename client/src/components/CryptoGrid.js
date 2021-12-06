import * as React from 'react';
import { useQuery } from '@apollo/client'

import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import Title from './Title';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';

import Transaction from './Transaction';
import { useCryptoContext } from '../utils/CryptoContext';
import { GET_CRYPTOINFO } from '../utils/queries';


const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'ticker', label: 'Ticker', minWidth: 100 },
    { id: 'price', label: 'Price\u00a0(USD)', minWidth: 170 },
    { id: 'buysell', label: 'Buy/Sell', minWidth: 100, align: 'right' }
];


export default function CryptoGrid() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [open, setOpen] = React.useState(false);
    const [price, setPrice] = React.useState(0)

    const { currentTicker, handleTickerChange } = useCryptoContext();
    const { loading, data } = useQuery(GET_CRYPTOINFO);


    
    function getButton(ticker) {
        return (
            <button>Trade</button>
        )
    }
    function createData(name, ticker, price) {
        // TODO add button
        let btn = getButton(ticker);
        // console.log(btn);
        return { name, ticker, price, btn };
    }

    // default seed data
    var rows = [
        createData('Bitcoin', 'BTC', 44000),
        createData('Ethereum', 'ETH', 4080),
    ];

    if (loading) {
        console.log('loading crypto grid...')
    } else {
        let temp = [];
        for (let i = 0; i < data.cryptoData.cryptoInfo.length; i++)
            temp[i] = data.cryptoData.cryptoInfo[i].slice();
        temp.forEach(element => {
            element.push(getButton(element[1]));
        });
        rows = temp;
    }

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
            <div>
                {open
                    ? <Transaction open = {open} handleOpen = {handleOpen} action = {"buy"} price = {price}/>
                    : <div></div>
                }
            </div>
            <Title>Browse Cryptos</Title>
            <Stack spacing={2} sx={{ width: 300 }}>
                <Autocomplete
                    id="search-for-crypto"
                    freeSolo
                    options={rows.map((option) => option[1])}
                    renderInput={(params) => <TextField {...params} label="Search For Crypto" onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          const ticker = params.inputProps.value.toLowerCase();
                          handleTickerChange(ticker);
                        }
                      }}  />}
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
                                        <TableRow hover role="checkbox" tabIndex={-1} key={index}
                                            currentTicker={currentTicker} handleTickerChange={handleTickerChange} onClick={(event) => {
                                                event.preventDefault();
                                                handleTickerChange(row[1]);
                                                // handles what row is being clicked on, saves ticker to render other components, saves to context
                                            }}>
                                            {columns.map((column, index) => {
                                                const value = row[index];
                                                if (index == 3) {
                                                    return (
                                                        <TableCell key={index} align={column.align} onClick={(event) => {
                                                            event.preventDefault();
                                                            event.stopPropagation();
                                                            handleTickerChange(row[1]);
                                                            console.log(row[1] + " button clicked");
                                                            setPrice(row[2]);
                                                            console.log("price here" + price)
                                                            handleOpen(true);
                                                        }}>
                                                            {column.format && typeof value === 'number'
                                                                ? column.format(value)
                                                                : value}
                                                        </TableCell>
                                                    );
                                                }
                                                return (
                                                    <TableCell key={index} align={column.align}>
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
            <Link color="primary" target="_blank" href="https://coinmarketcap.com/" sx={{ mt: 3 }}>
                See more Cryptos
            </Link>
        </React.Fragment>
    );
}