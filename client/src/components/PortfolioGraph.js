import * as React from 'react';
// import { useEffect } from 'react';

import '../styles/Graph.css';

import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto'; // needs to be here in order for the graph to load.

import { useQuery } from '@apollo/client';
import { GET_CRYPTOCANDLES, GET_CRYPTOHISTORICAL, GET_CRYPTOINFO, GET_PORTFOLIO, GET_ME } from '../utils/queries';
import { useCryptoContext } from '../utils/CryptoContext';
// import { hourTimeInterval, sixHourTimeInterval, dayTimeInterval, weekTimeInterval } from '../utils/timeHelpers';



export default function PortfolioGraph() {
    const { currentticker } = useCryptoContext();
    // const { currentticker, handletickerchange } = useCryptoContext(); // possibly need handletickerchange

    // queries
    const { loading, data } = useQuery(GET_CRYPTOINFO);
    const { loading: getme_loading, data: getme_data } = useQuery(GET_ME);
    const { loading: historical_loading, data: historical_data } = useQuery(GET_CRYPTOHISTORICAL, {
        variables: { pair: "btc" }
    });


    let un; //checks username -> profile username

    if (getme_data) {
        un = getme_data.me.username;
        console.log(un)
    }
    let curCryptos = [];
    // Grabs portfolio data
    const { data: getportfolio_data } = useQuery(GET_PORTFOLIO, {
        variables: { name: un }
    });

    console.log(getportfolio_data)
    if (getportfolio_data) {
        curCryptos = getportfolio_data.getPortfolio.cryptos;
    }

    let map = new Map();
    curCryptos.forEach(element => {
        console.log(element)
        if (map.has(element.ticker)) {
            map.set(element.ticker, map.get(element.ticker) + element.quantity);
        } else {
            map.set(element.ticker, element.quantity);
        }
    });

    const cryptoQuantities = [...map.entries()];
    ////

    let historicalArray = [];


    if (historical_loading){
        console.log("now loading historical data");
    }  else {
        historicalArray = historical_data.cryptoHistorical.cryptoInfo;
        console.log(historicalArray + " historical here!");
    }






    const { loading: candle_loading, data: candle_data } = useQuery(GET_CRYPTOCANDLES, {
        variables: { pair: currentticker }
    });

    let titleLabel = currentticker.toUpperCase() + " (price over the past week)";


    
    let info = [];
    if (candle_loading) {
        console.log('loading graph..');
    } else {
        info = candle_data.cryptoCandles.cryptoInfo.last_week;
    }




    let xLabels = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168]



    return (
        <div className="graph-container">
            <div className="graph-card" >
                <Line
                    datasetIdKey='id'
                    data={{
                        labels: xLabels,
                        datasets: [{
                            data: info,
                            fill: false,
                            borderColor: 'rgb(175, 92, 192)',
                            tension: 0.1,
                            pointStyle: false,
                        }],
                    }}
                    options={{
                        radius: 0,
                        responsive: true,
                        aspectRatio: 2,
                        plugins: {
                            title: {
                                display: true,
                                text: titleLabel
                            },
                            legend: {
                                display: false,
                            }
                        },
                        scales: {
                            x: {
                                display: false,
                            },
                            y: {
                                title: {
                                    display: false,
                                    text: 'Value in USD',
                                    font: {
                                        size: 11
                                    }
                                },
                                display: true,
                                ticks: {
                                    font: {
                                        size: 10
                                    }
                                },
                            },
                        },
                        interaction: { // allows for hover bubble
                            intersect: false,
                            backgroundColor: 'rgba(0, 0, 0, 0.57)',
                        },
                    }}
                />
            </div>
        </div>
    );
}



// https://react-chartjs-2.netlify.app/docs/working-with-datasets
// https://www.chartjs.org/docs/latest/charts/line.html
