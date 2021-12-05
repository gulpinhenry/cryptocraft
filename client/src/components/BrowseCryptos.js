import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

// Generate Order Data
function createData(id, name, ticker, price) {
    return { id, name, ticker, price };
}

const rows = [
    createData(
        1,
        'Bitcoin',
        'BTC',
        40000
    ),
    createData(
        2,
        'Ethereum',
        'ETH',
        4085
    ),
    // query data here
];


export default function Browse() {
    return (
        <React.Fragment>
            <Title>Browse Cryptos</Title>
            <Table id="dashboard-table" size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Ticker</TableCell>
                        <TableCell >Price (USD)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        // add onclick to this TableRow to get stats for graph
                        <TableRow key={row.id}>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.ticker}</TableCell>
                            <TableCell>${row.price}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Link color="primary" target="_blank" href="https://coinmarketcap.com/" sx={{ mt: 3 }}>
                See more Cryptos
            </Link>
        </React.Fragment>
    );
}