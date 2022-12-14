import { API_URL } from "../../../environments/env";

import { useParams } from "react-router-dom";
import { useEffect } from 'react';

import Chart from 'chart.js/auto';

import LoaderUIComp from "../../../components/LoaderUIComp";
import CopyToClipBoard from "../../../components/CopyToClipBoard";

/**
 * Module for user activity summary
 * @param {*} props 
 * @returns 
 */
export default function Summary(props) {
    const { clientData } = useParams();
    const client = JSON.parse(clientData);

    const overallActivityChart = function () {
        const data = [
            { time: '7.00', count: 90 },
            { time: '8.00', count: 200 },
            { time: '9.00', count: 15 },
            { time: '10.00', count: 0 },
            { time: '11.00', count: 282 },
            { time: '12.00', count: 56 },
            { time: '13.00', count: 0 },
        ];

        const mouseClicks = [
            { time: '7.00', count: 7 },
            { time: '8.00', count: 78 },
            { time: '9.00', count: 1 },
            { time: '10.00', count: 3 },
            { time: '11.00', count: 56 },
            { time: '12.00', count: 70 },
            { time: '13.00', count: 1 },
        ];

        const combined = [
            { time: '7.00', count: 97 },
            { time: '8.00', count: 278 },
            { time: '9.00', count: 16 },
            { time: '10.00', count: 3 },
            { time: '11.00', count: 338 },
            { time: '12.00', count: 126 },
            { time: '13.00', count: 1 },
        ];

        new Chart(
            document.getElementById('acquisitions'),
            {
                type: 'line',
                data: {
                    labels: data.map(row => row.time),
                    datasets: [
                        {
                            label: 'Key presses',
                            data: data.map(row => row.count)
                        },
                        {
                            label: 'Mouse clicks',
                            data: mouseClicks.map(row => row.count)
                        },
                        {
                            label: 'Total',
                            data: combined.map(row => row.count)
                        }
                    ]
                }
            }
        );
    };


    useEffect(() => {
        overallActivityChart();
    }, []);

    return (
        <>
            <br />
            <div className="container">

                <div className="row">
                    <div className="col-sm-6">
                        <div className="card">
                            <div className="card-body">
                                <h2 className="card-title">
                                    User information
                                </h2>

                                <div className="card-text">

                                    <div className="row">
                                        <div className="col-lg-3 text-center">
                                            <i className="bi bi-person-circle" style={{ fontSize: '96px' }}></i>
                                            <br />
                                            {client.name}
                                        </div>

                                        <div className="col-lg-9">
                                            <div className="row">
                                                <div className="col-12 col-xl-3"><b><i className="bi bi-people"></i> Group</b></div>
                                                <div className="col-12 col-xl-9">{client.groupId} <CopyToClipBoard textToCopy={client.groupId} /></div>
                                            </div>

                                            <div className="row">
                                                <div className="col-12 col-xl-3"><b><i className="bi bi-at"></i> email</b></div>
                                                <div className="col-12 col-xl-9">{client.email} <CopyToClipBoard textToCopy={client.email} /></div>
                                            </div>

                                            <div className="row">
                                                <div className="col-12 col-xl-3"><b><i className="bi bi-key"></i> passkey</b></div>
                                                <div className="col-12 col-xl-9">{client.paswordResetCode} <CopyToClipBoard textToCopy={client.paswordResetCode} /></div>
                                            </div>

                                            <hr />
                                            {client.description}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6">
                        <div className="card">
                            <div className="card-body">
                                <h2 className="card-title">
                                    Overall Activity
                                </h2>

                                <canvas id="acquisitions"></canvas>

                                <button type="button" className="btn btn-warning">
                                    Key Presses <span className="badge text-bg-secondary">956</span>
                                </button>
                                 .
                                <button type="button" className="btn btn-danger">
                                    Mouse Clicks <span className="badge text-bg-secondary">360</span>
                                </button>
                                 . 
                                <button type="button" className="btn btn-info">
                                    Total activity <span className="badge text-bg-secondary">1316</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
