import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { useQuery } from '@apollo/client';
import { GET_CRYPTODETAILS } from '../utils/queries';
import { useCryptoContext } from '../utils/CryptoContext';

function preventDefault(event) {
    event.preventDefault();
}

export default function InfoTab() {
    const { currentTicker, handleTickerChange } = useCryptoContext();
    const { loading, data } = useQuery(GET_CRYPTODETAILS, {
        variables: { pair: currentTicker }
    });
    let info = 'Loading';
    if (loading) {
        console.log('loading info tab..');
    } else {
        info = data.cryptoDetails.cryptoInfo;
    }
    let url = `https://cryptowat.ch/charts/COINBASE-PRO:${currentTicker}-USD`
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
                {/* TODO change later */}
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
                {/* https://www.coinbase.com/price/bitcoin, format to make href like this */}
                <Link color="primary" href={url} target = "_blank" >
                    Buy Real Coin
                </Link>
            </div>
        </React.Fragment>
    );
}