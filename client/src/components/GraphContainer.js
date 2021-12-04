import React from 'react';
// import './GraphContainer.css';
import IndividualGraph from './Graph.js';
import { graphData } from '../../GraphData.js';

export default function Projects() {
    return (
        // add a vh-100 here when fixing mobile view
        <div className="page-bg">
            <div className="container">
                <div className="row mb-3">
                    <section className="portfolio">
                        <div className="row project-row">
                            {IndividualGraph.map((graph) => (
                                <ProjectList key={graph.id} graph={graph} />
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div >
    );
}
