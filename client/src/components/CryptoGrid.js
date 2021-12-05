import * as React from 'react';
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

const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'ticker', label: 'Ticker', minWidth: 100 },
    { id: 'price', label: 'Price\u00a0(USD)', minWidth: 170},
    { id: 'buysell', label: 'Buy/Sell', minWidth: 100, align: 'right' }
];

const getButton = () => {
    return (
        <h1>hi</h1>
    )
}
function createData(name, ticker, price) {
    // conditional part here
    return { name, ticker, price, getButton};
}

const rows = [
    createData('Bitcoin', 'BTC', 44000),
    createData('Ethereum', 'ETH', 4080),
    // query data here
];

export default function CryptoGrid() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    function tableClick(row){
        console.log(row);
        // display data here
        // {name: 'Bitcoin', ticker: 'BTC', price: 44000, getButton: ƒ}
        // import call to query the api 
    }
    return (
        <React.Fragment>
            <Title>Browse Cryptos</Title>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
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
                                .map((row) => {
                                    return (
                                        
                                        <TableRow  hover role="checkbox" tabIndex={-1} key={row.code} onClick={() => tableClick(row)}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
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