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

import { useCryptoContext } from '../utils/CryptoContext';
import { GET_CRYPTOINFO } from '../utils/queries';


const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'ticker', label: 'Ticker', minWidth: 100 },
    { id: 'price', label: 'Price\u00a0(USD)', minWidth: 170 },
    { id: 'buysell', label: 'Buy/Sell', minWidth: 100, align: 'right' }
];

const getButton = () => {
    // buy/sell TODO
    return (
        <h1>hi</h1>
    )
}

export default function CryptoGrid() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const { currentTicker, handleTickerChange } = useCryptoContext();
    const { loading, data } = useQuery(GET_CRYPTOINFO);

    function createData(name, ticker, price) {
        // TODO add button
        return { name, ticker, price, getButton };
    }

    // default seed data
    var rows = [
        createData('Bitcoin', 'BTC', 44000),
        createData('Ethereum', 'ETH', 4080),
    ];

    if (loading) {
        console.log('loading crypto grid...')
    } else {
        rows = data.cryptoData.cryptoInfo;
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <React.Fragment>
            <Title>Browse Cryptos</Title>
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