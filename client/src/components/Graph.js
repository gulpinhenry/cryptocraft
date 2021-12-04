import React, { useEffect } from 'react';
// import './graph.css';
import { Line } from 'react-chartjs-2';


export default function IndividualGraph(props) {
    return (
        <div className="col-lg-4">
            <div className="shadow card-style card">
                <div className="card-body project-card" >
                    <Line
                        datasetIdKey='id'
                        data={{
                            // labels: Utils.months({ count: 7 }), // dummy
                            datasets: [{
                                label: "coinName", // should have coinname
                                data: props.data, // dummy
                                fill: false,
                                // xAxisID='Time',
                                // yAxisID='Price',
                                borderColor: 'rgb(175, 92, 192)',
                                tension: 0.1
                            }],
                        }}
                    />
                    <div className="card-text">description</div>
                </div>
            </div>
        </div>
    );
}


// https://react-chartjs-2.netlify.app/docs/working-with-datasets
// https://www.chartjs.org/docs/latest/charts/line.html
