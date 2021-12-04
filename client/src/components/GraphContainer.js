import React, { useEffect } from 'react';
// import './GraphContainer.css';
import IndividualGraph from './Graph.js';
import { graphData } from '../assets/graphData.js';

const GraphContainer = () => {
    useEffect(() => {
        console.log(graphData);
    });


    return (
        <div className="container">
            <div className="row mb-3">
                <section className="portfolio">
                    <div className="row project-row">
                        {graphData.map((graph) => (
                            <IndividualGraph key={graph.id} graph={graph} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}

export default GraphContainer;