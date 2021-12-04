import React, { useEffect } from 'react';
import '../styles/css/Graph.css';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto'

export default function IndividualGraph(props) {
    let graphDataPoints = (props.graph.data);
    let portfolioName = "YOLO Portfolio"
    let tempLabel = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
    useEffect(() => {
        console.log(props);
        console.log(props.graph.data);

        console.log("^ G");
    });


    return (
        <div className="graph-card" >
            <Line
                datasetIdKey='id'
                data={{
                    labels: tempLabel, // dummy
                    datasets: [{
                        label: portfolioName, // should have name
                        data: (props.graph.data), // dummy
                        fill: false,
                        // xAxisID: 'Time',
                        // yAxisID: 'USD Price',
                        borderColor: 'rgb(175, 92, 192)',
                        tension: 0.1,
                    }],
                }}
                options={{
                    responsive: true,
                    aspectRatio: 2,
                    title: {
                        display: true,
                    },
                    scales: {
                        x: {
                            type: 'linear',
                        },
                        y: {
                            type: 'linear',
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
