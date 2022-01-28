import React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useQuery } from '@apollo/client';
import Title from './Title';
import { GET_ME, GET_PORTFOLIO, GET_CRYPTODETAILS } from '../utils/queries';

import { useCryptoContext } from '../utils/CryptoContext';

// gridType is either 'my' or 'all'
export default function InfoTab({ gridType }) {
    // ============================================================================ //
    //  ORDER OF OPERATIONS MUST GO:  GET_ME => GET_PORTFOLIO => GET_CRYPTODETAILS  //
    // ============================================================================ //
    const { currentticker } = useCryptoContext();


    // ============================================================================ //
    //                             //   GET_ME   //                                 //
    // ============================================================================ //

    let un = 'Loading...'; // Init variable for holding. Prevents crashing due to null values if the query is too slow.
    const { loading: getme_loading, data: getme_data } = useQuery(GET_ME);

    if (getme_loading) {
        console.log('Loading username data in InfoTabs.js...');
    } else {
        if (!getme_data) {
            console.log(un, 'Falsey \'un\' in InfoTabs.js. Should never get here.'); // Delete this (if) once working to increase performance
        } else if (getme_data) {
            un = getme_data.me.username;
            console.log(un, 'Truthy \'un\' in InfoTabs.js');
            // SHOULD HAVE QUIT HERE???
        }
    }
    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ //



    // ============================================================================ //
    //                         //   GET_PORTFOLIO   //                              //
    // ============================================================================ //

    let curUSDbalance = 'Loading...'; // Init variable for holding. Prevents crashing due to null values if the query is too slow.
    const { loading: getPortfolio_loading, data: getPortfolio_data } = useQuery(GET_PORTFOLIO, { variables: { name: un } });

    if (getPortfolio_loading) {
        console.log('Loading portfolio data in InfoTabs.js...');
    } else {
        if (!getPortfolio_data) {
            console.log(curUSDbalance, 'Falsey \'curUSDbalance\' in InfoTabs.js. Should never get here.'); // Delete this (if) once working to increase performance
        } else if (getPortfolio_data?.getPortfolio?.usdBalance) {
            curUSDbalance = getPortfolio_data.getPortfolio.usdBalance;
            console.log(curUSDbalance, 'Truthy \'curUSDbalance\' in InfoTabs.js');
            // SHOULD HAVE QUIT HERE???
        }
    }
    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ //

    // OLD VERSION OF THE GET_PORTFOLIO CHECK. KEEP TO REFERENCE IF PIECES ARE NEEDED FOR NOW
    // if (getPortfolio_loading) {
    //     console.log('loading portfolio data..');
    // } else {
    //     if (getPortfolio_data?.getPortfolio?.usdBalance) {
    //         curUSDbalance = getPortfolio_data?.getPortfolio?.usdBalance;
    //     }
    // }



    // ============================================================================ //
    //                       //   GET_CRYPTODETAILS   //                            //
    // ============================================================================ //
    let info = { 'dailyChange': 'Loading...', 'weeklyChange': 'Loading...', 'yearlyChange': 'Loading...', 'yearly_high': 'Loading...', 'yearly_low': 'Loading...' }; // Init variable for holding. Prevents crashing due to null values if the query is too slow.
    const { loading: cryptoDetails_loading, data: cryptoDetails_data } = useQuery(GET_CRYPTODETAILS, { variables: { pair: currentticker } });

    if (cryptoDetails_loading) {
        console.log('Loading cryptoDetails data in InfoTabs.js...');
    } else {
        if (!cryptoDetails_data) {
            console.log(info, 'Falsey \'info\' in InfoTabs.js. Should never get here.'); // Delete this (if) once working to increase performance
        } else if (cryptoDetails_data?.cryptoDetails?.cryptoInfo) {
            info = cryptoDetails_data.cryptoDetails.cryptoInfo;
            console.log(info, 'Truthy \'cryptoDetails_data\' in InfoTabs.js');
            // SHOULD HAVE QUIT HERE???
        }
    }
    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ //

    // OLD VERSION OF THE GET_CRYPTODETAILS CHECK. KEEP TO REFERENCE IF PIECES ARE NEEDED
    // useEffect(() => {
    //     if (cryptoDetails_loading) {
    //         console.log('Loading cryptoDetails data in InfoTabs.js...');
    //     } else {
    //         info = cryptoDetails_data.cryptoDetails.cryptoInfo;
    //         console.log(info, 'Truthy \'cryptoDetails_data\' in InfoTabs.js');
    //     }
    // });


    // URL for cryptowatch link. Not used in queries
    const url = `https://cryptowat.ch/charts/COINBASE-PRO:${currentticker}-USD`;

    return (
        <React.Fragment>
            <Title>{gridType === 'all' ? currentticker.toUpperCase() : 'My Portfolio'}
            </Title>
            {gridType === 'all'
                // Crypto info
                ? <div>
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
                </div>

                // Portfolio info
                : <div>
                    <Typography component="h4">
                        Current Purchasing Power:
                        <br />
                        $ {curUSDbalance}
                    </Typography>
                </div>}
            {/* add a chart pie chart here instead of the value */}
            <Typography color="text.secondary" sx={{ flex: 1 }}>
                on {new Date().toDateString()}
            </Typography>
            <div>
                {/* https://www.coinbase.com/price/bitcoin, format to make href like this */}
                <Link color="primary" href={url} target="_blank">
                    Buy Real Coin
                </Link>
            </div>
        </React.Fragment>
    );
}
