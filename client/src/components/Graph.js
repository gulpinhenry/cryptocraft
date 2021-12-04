import React from 'react';
// import './graph.css';
import graphData from '../../../server/utils/cryptowatch';
import { Line } from 'react-chartjs-2';


export default function IndividualGraph(props) {
    let coinName = { props.crypto.name };
    return (
        <div className="col-lg-4">
            <div className="shadow card-style card">
                <div className="card-body project-card" >
                    <Line
                        datasetIdKey='id'
                        data={{
                            labels: Utils.months({ count: 7 }), // dummy
                            datasets: [{
                                label: coinName, // should have coinname
                                data: [65, 59, 80, 81, 56, 55, 40], // dummy
                                fill: false,
                                xAxisID='Time',
                                yAxisID='Price',
                                borderColor: 'rgb(175, 92, 192)',
                                tension: 0.1
                            }],
                        }}
                    />
                    <div className="card-text">{props.coin.ticker}</div>
                </div>
            </div>
        </div>
    );
}


// https://react-chartjs-2.netlify.app/docs/working-with-datasets
// https://www.chartjs.org/docs/latest/charts/line.html
