import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';

function preventDefault(event) {
    event.preventDefault();
}

export default function Deposits() {
    // get our user data here or maybe portfolio
    return (
        <React.Fragment>
            <Title>My Portfolios</Title>
            <Typography component="p" variant="h4">
                Some chart here?
            </Typography>
            {/* add a chart pie chart hereinstead of the value */}
            <Typography color="text.secondary" sx={{ flex: 1 }}>
                on {new Date().toDateString()}
            </Typography>
            <div>
                <Link color="primary" href="#" onClick={preventDefault}>
                    View Portfolio Allocations
                </Link>
            </div>
        </React.Fragment>
    );
}