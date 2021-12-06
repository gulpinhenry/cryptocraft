import React, { useDebugValue, useEffect } from 'react';
import '../styles/Graph.css';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { graphData } from '../utils/graphData'; // dummy data
import { hourTimeInterval, sixHourTimeInterval } from '../utils/timeHelpers';
import { GET_CRYPTOCANDLES } from '../utils/queries';

export default function Graph(props) {
    let graphDataPoints = graphData[0].price;
    // console.log(graphData[0].price);
    let titleLabel = "YOLO Portfolio"
    // console.log(hourTimeInterval(graphDataPoints));
    let tempLabels = sixHourTimeInterval(graphDataPoints);


    /// construction zoonnnnnnneeeee
    let curTicker = props.currentTicker;
    const { loading, data } = useQuery(GET_CRYPTOCANDLES, {
        variables: { pair: 'btc' }
    });

    let info = graphDataPoints;

    if (loading) {
        console.log('Now loading graph...')
    } else {
        info = data.cryptoDetails.cryptoInfo;
        console.log(info);
    }




    return (
        <div className="graph-container">
            <div className="graph-card" >
                <Line
                    datasetIdKey='id'
                    data={{
                        labels: tempLabels,
                        datasets: [{
                            data: graphDataPoints,
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
