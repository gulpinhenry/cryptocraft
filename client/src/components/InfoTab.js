import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { useQuery } from '@apollo/client';
import {GET_CRYPTODETAILS} from '../utils/queries';

function preventDefault(event) {
    event.preventDefault();
}

export default function InfoTab(props) {
    // get our user data here or maybe portfolio
    const { loading, data } = useQuery(GET_CRYPTODETAILS, {
        variables: { pair: 'btc'}
    });

    let info = 'Loading';

    if (loading) {
        console.log(':D')
    } else {
        info = data.cryptoDetails.cryptoInfo;
       console.log(info);
    }

    return (
        <React.Fragment>
            <Title>My Portfolios</Title>
            <Typography component="p" variant="h4">
                {info.dailyChange}
                {info.weeklyChange}
                {info.yearlyChange}
                {info.yearly_high}
                {info.yearly_low}
                Add more crypto data here
                for portfolio this would be a pie chart
            </Typography>
            {/* add a chart pie chart hereinstead of the value */}
            <Typography color="text.secondary" sx={{ flex: 1 }}>
                on {new Date().toDateString()}
            </Typography>
            <div>
                <Link color="primary" href="#" onClick={preventDefault}>
                    View More Data (in portfolios this would portfolio allocation)
                </Link>
            </div>
        </React.Fragment>
    );
}