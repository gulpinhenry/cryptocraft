import React, { useEffect } from 'react';
// import './GraphContainer.css';
import IndividualGraph from './PortfolioGraph.js';
import { graphData } from '../utils/graphData';
// const graphData = require('../../../server/utils/graphData');


const GraphContainer = () => {
    // useEffect(() => {
    //     console.log(graphData);
    //     console.log("^ GC");
    //     // need current portfolio selector code here
    // });

    return (
        <div className="container">
            {graphData.map((graph) => (
                <IndividualGraph key={graph.id} graph={graph} />
            ))}
        </div>
    );
}

export default GraphContainer;