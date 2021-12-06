import * as React from 'react';
import { useEffect } from 'react';

import '../styles/Graph.css';

import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

import { useQuery } from '@apollo/client';
import { GET_CRYPTOCANDLES } from '../utils/queries';
import { useCryptoContext } from '../utils/CryptoContext';
import { hourTimeInterval, sixHourTimeInterval, dayTimeInterval, weekTimeInterval } from '../utils/timeHelpers';

function preventDefault(event) {
    event.preventDefault();
}

export default function Graph() {
    const { currentTicker, handleTickerChange } = useCryptoContext();
    const { loading, data } = useQuery(GET_CRYPTOCANDLES, {
        variables: { pair: currentTicker }
    });
    let titleLabel = currentTicker.toUpperCase() + " (price over the past week)";

    // TODO: ADD TOGGLE FOR TIMESCALES
    let info = [];
    if (loading) {
        console.log('loading graph..');
    } else {
        // info = data.cryptoCandles.cryptoInfo.last_day;
        info = data.cryptoCandles.cryptoInfo.last_week;
        // info = data.cryptoCandles.cryptoInfo.last_year;
    }

    // let xLabels = hourTimeInterval(graphDataPoints));
    let xLabels = sixHourTimeInterval(info);
    // let xLabels = weekTimeInterval(graphDataPoints);

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
