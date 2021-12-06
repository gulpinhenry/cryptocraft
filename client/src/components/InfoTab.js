import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { useQuery } from '@apollo/client';
import { GET_CRYPTODETAILS } from '../utils/queries';

function preventDefault(event) {
    event.preventDefault();
}

export default function InfoTab(props) {
    // get our user data here or maybe portfolio
    
    let curTicker = props.currentTicker;
    const { loading, data } = useQuery(GET_CRYPTODETAILS, {
        variables: { pair: props.currentTicker }
    });
    console.log("here");
    let info = 'Loading';

    if (loading) {
        // console.log(props.currentTicker);
        console.log(':D');
    } else {
        console.log(props.currentTicker);
        // curTicker = props.currentTicker;
        info = data.cryptoDetails.cryptoInfo;
        console.log(info);
    }

    return (
        <React.Fragment>
            <Title>My Portfolios</Title>
            <Typography component="p">
                Daily Change: {info.dailyChange}%
            </Typography>
            <Typography component="p">
                Weekly Change: {info.weeklyChange}%
            </Typography>
            <Typography component="p">
                Yearly Change: {info.yearlyChange}%
            </Typography>
            <Typography component="p">
                52-Wk High: ${info.yearly_high}
            </Typography>
            <Typography component="p">
                52-Wk Low: ${info.yearly_low}
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