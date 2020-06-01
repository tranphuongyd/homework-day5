import React, { useState, useEffect } from 'react';
import { fetchData } from '../../datasource/fetch';
import { RequestModel } from '../../models/request-item';

export function RequestList() {
    const [requestData, setRequestData] = useState<RequestModel[] | null>(null);

    useEffect(() => {
        (async () => {
        try {
            const data = await fetchData('http://localhost:3000/requests');
            setRequestData(data);
        } catch (e) {
            console.log(e);
        }
        })();
    }, []);

    return (
        <div>
        { requestData ? requestData.map((item) => {
            return (
                <div className="row" key={item.id}>
                    <span>{item.id}</span>
                    <span>{item.subject}</span>
                    <span>{item.requestedDate}</span>
                    <span>{item.latestDate}</span>
                    <span>{item.status}</span>
                    <a href={'/requests/'+ item.id}>Open</a>
                </div>
            )
        }) : null}
        </div>
    )
}