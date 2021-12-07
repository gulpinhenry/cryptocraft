import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { useQuery } from '@apollo/client';
import { GET_CRYPTODETAILS, GET_PORTFOLIO } from '../utils/queries';
import Auth from '../utils/auth';

import { useCryptoContext } from '../utils/CryptoContext';

function preventDefault(event) {
    event.preventDefault();
}

// gridType is either "my" or "all"
export default function InfoTab({ gridType }) {
    const { currentTicker, handleTickerChange } = useCryptoContext();

    // query multiple ========================================================
    // const queryMultiple = () => {
    //     const cryptoDetails_res = useQuery(GET_CRYPTODETAILS, {
    //         variables: { pair: currentTicker }
    //     });
    //     const portfolio_res = useQuery(GET_PORTFOLIO, {
    //         variables: { name: Auth.getProfile().data.username }
    //     });

    //     return [cryptoDetails_res, portfolio_res];
    // }

    // const [
    //     { loading: loading1, data: data1 },
    //     { loading: loading2, data: data2 }
    // ] = queryMultiple();
    // //


    const { loading: cryptoDetails_loading, data: cryptoDetails_data } = useQuery(GET_CRYPTODETAILS, {
        variables: { pair: currentTicker }
    });
    const { loading, data } = useQuery(GET_PORTFOLIO, {
        variables: { name: Auth.getProfile().data.username }
    });



    // const { loading: cryptoDetails_loading, data: cryptoDetails_data } = useQuery(GET_CRYPTODETAILS, {
    //     variables: { pair: currentTicker }
    // });
    let info = 'Loading';
    if (cryptoDetails_loading) {
        console.log('loading info tab..');
    } else {
        info = cryptoDetails_data.cryptoDetails.cryptoInfo;
    }
    let url = `https://cryptowat.ch/charts/COINBASE-PRO:${currentTicker}-USD`


    // Load in portfolio data
    // const {loading: portfolio_loading, data: portfolio_data} = useQuery(GET_PORTFOLIO, {
    //     variables: { name: Auth.getProfile().data.username }
    // });

    let curUSDbalance = "";
    if (loading) {
        console.log('loading portfolio data..');
    } else {
        curUSDbalance = data;
        console.log(curUSDbalance);
        // console.log(curUSDbalance.getPortfolio.usdBalance);
        // console.log(curUSDbalance);
    }
    //





    return (
        <React.Fragment>
            <Title>{gridType == "all"
                ? currentTicker.toUpperCase()
                : "My Portfolio"}</Title>
            {
                gridType == "all"
                    ?
                    // Crypto info
                    <div><Typography component="p">
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
                        </Typography></div>
                    :
                    // Portfolio info
                    <div>
                        <Typography component="h4">
                            Current USD available:
                            $ {curUSDbalance}
                        </Typography>
                    </div>
            }
            {/* add a chart pie chart hereinstead of the value */}
            <Typography color="text.secondary" sx={{ flex: 1 }}>
                on {new Date().toDateString()}
            </Typography>
            <div>
                {/* https://www.coinbase.com/price/bitcoin, format to make href like this */}
                <Link color="primary" href={url} target="_blank" >
                    Buy Real Coin
                </Link>
            </div>
        </React.Fragment>
    );
}