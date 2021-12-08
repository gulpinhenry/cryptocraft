import React, { useEffect, useState } from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { useQuery } from '@apollo/client';
import { GET_CRYPTODETAILS, GET_PORTFOLIO, GET_ME } from '../utils/queries';

import { useCryptoContext } from '../utils/CryptoContext';


// gridType is either "my" or "all"
export default function InfoTab({ gridType }) {
    const { currentticker } = useCryptoContext();
    
    // ============================================================================ //    
    //  ORDER OF OPERATIONS MUST GO:  GET_ME => GET_PORTFOLIO => GET_CRYPTODETAILS  //
    // ============================================================================ //


    // ============================================================================ //    
    //                             //   GET_ME   //                                 //
    // ============================================================================ //

    let un; //checks username -> profile username
    const { loading: getme_loading, data: getme_data } = useQuery(GET_ME);
    if (getme_data) {
        un = getme_data.me.username;
        console.log(un, " un via IT")
    }

    // ============================================================================ //    
    //                             //   GET_ME   //                                 //
    // ============================================================================ //






    // CRYPTO DETAILS QUERY
    const { loading: cryptoDetails_loading, data: cryptoDetails_data } = useQuery(GET_CRYPTODETAILS, {
        variables: { pair: currentticker }
    });





    // Grabs portfolio data
    const { loading, data } = useQuery(GET_PORTFOLIO, {
        variables: { name: un }
    });

    // CRYPTO DETAILS LOADING
    let info = 'Loading';
    useEffect(() => {
        if (cryptoDetails_loading) {
            console.log('loading info tab..');
        } else {
            info = cryptoDetails_data.cryptoDetails.cryptoInfo;
        }
    
    }, [cryptoDetails_loading, cryptoDetails_data]);




    // PORTFOLIO LOADING
    let curUSDbalance = 1000000;
    if (loading) {
        console.log('loading portfolio data..');
    } else {
        if (data?.getPortfolio?.usdBalance) {
            curUSDbalance = data?.getPortfolio?.usdBalance;
            // console.log(curUSDbalance);
        }
    }

    // useEffect(() => {
    //     if (loading) {
    //         console.log('loading portfolio data..');
    //     } else {
    //         console.log(data);
    //         curUSDbalance = data.getPortfolio.usdBalance;
    //         // console.log(curUSDbalance);
    //     }

    // }, [loading, data]);





    let url = `https://cryptowat.ch/charts/COINBASE-PRO:${currentticker}-USD`

    return (
        <React.Fragment>
            <Title>{gridType === "all"
                ? currentticker.toUpperCase()
                : "My Portfolio"}</Title>
            {
                gridType === "all"
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