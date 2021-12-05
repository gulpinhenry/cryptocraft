import React, { useEffect } from 'react';
import '../styles/GraphContainer.css';
import IndividualGraph from './Graph.js';
import { graphData } from '../utils/graphData';
// const graphData = require('../../../server/utils/graphData');


const GraphContainer = () => {
    // useEffect(() => {
    //     console.log(graphData);
    //     console.log("^ GC");
    //     // need current portfolio selector code here
    // });

    return (
        <div className="graph-container">
            {graphData.map((graph) => (
                <IndividualGraph key={graph.id} graph={graph} />
            ))}
        </div>
    );
}

export default GraphContainer;