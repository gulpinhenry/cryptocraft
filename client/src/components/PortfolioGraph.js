import React, { useDebugValue, useEffect } from 'react';
import '../styles/Graph.css';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { hourTimeInterval, sixHourTimeInterval } from '../utils/timeHelpers'

export default function IndividualGraph(props) {
    let graphDataPoints = (props.graph.data);
    let portfolioName = "YOLO Portfolio"
    console.log(hourTimeInterval(graphDataPoints));
    let tempLabels = hourTimeInterval(graphDataPoints);


    return (
        <div className="graph-card" >
            <Line
                datasetIdKey='id'
                data={{
                    labels: tempLabels,
                    datasets: [{
                        labels: portfolioName,
                        data: (props.graph.data),
                        fill: false,
                        // xAxisID: 'Time',
                        // yAxisID: 'USD Price',
                        borderColor: 'rgb(175, 92, 192)',
                        tension: 0.1,
                        pointStyle: false,
                    }],
                }}
                options={{
                    radius: 0,
                    responsive: true,
                    aspectRatio: 2,
                    title: {
                        display: true,
                    },
                    plugins: {
                        legend: {
                            labels: {
                                // This more specific font property overrides the global property
                                font: {
                                    size: 10
                                }
                            }
                        }
                    },
                    interaction: {
                        intersect: false,
                        // mode: 'index',
                    },
                }}
            />
            <div className="card-text">description</div>
        </div>
    );
}





// https://react-chartjs-2.netlify.app/docs/working-with-datasets
// https://www.chartjs.org/docs/latest/charts/line.html
