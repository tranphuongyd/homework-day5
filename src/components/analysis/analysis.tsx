import React, { useState, useEffect } from 'react';
import { fetchData } from '../../datasource/fetch';

interface AnalysisData {
    name: string;
    subName: string;
    image: string;
}

export function Analysis() {
    const [analysisData, setAnalysisData] = useState<AnalysisData[] | null>(null);

    useEffect(() => {
        (async () => {
        try {
            const data = await fetchData('http://localhost:3000/analysis');
            setAnalysisData(data);
        } catch (e) {
            console.log(e);
        }
        })();
    }, []);

    return (
        <div>
        { analysisData ? analysisData.map((item) => {
            return (
                <div className="component" key={item.name}>
                    <img className="report-img" src={item.image} />
                    <p className="name">{item.name}</p>
                    <p className="sub-name">{item.subName}</p>
                </div>
            )
        }) : null}
        <div className="clear"></div>
        </div>
    )
}