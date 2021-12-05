import React, { useDebugValue, useEffect } from 'react';
import '../styles/Graph.css';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { hourTimeInterval, sixHourTimeInterval } from '../utils/timeHelpers'

export default function IndividualGraph(props) {
    let graphDataPoints = (props.graph.data);
    let titleLabel = "YOLO Portfolio"
    console.log(hourTimeInterval(graphDataPoints));
    let tempLabels = hourTimeInterval(graphDataPoints);


    return (
        <div className="graph-card" >
            <Line
                datasetIdKey='id'
                data={{
                    labels: tempLabels,
                    datasets: [{
                        data: (props.graph.data),
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
    );
}





// https://react-chartjs-2.netlify.app/docs/working-with-datasets
// https://www.chartjs.org/docs/latest/charts/line.html
