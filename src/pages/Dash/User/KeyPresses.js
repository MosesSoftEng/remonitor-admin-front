import { API_URL } from "../../../environments/env";

import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

import Chart from 'chart.js/auto';

export default function KeyPresses(props) {
    const { clientData } = useParams();
    const client = JSON.parse(clientData);

    const createKeyPressChart = function (keyPresses) {
        const data = keyPresses.map(function (keyPress) {
            return {
                time: formatDate(keyPress.createdAt),
                count: keyPress.count
            };
        });

        // Find chart and destroy to prevent error.
        let chartStatus = Chart.getChart("acquisitions"); // <canvas> id
        if (chartStatus != undefined) {
            chartStatus.destroy();
        }

        new Chart(
            document.getElementById('acquisitions'),
            {
                type: 'line',
                data: {
                    labels: data.map(row => row.time),
                    datasets: [
                        {
                            label: 'Keypresses over time',
                            data: data.map(row => row.count)
                        }
                    ]
                }
            }
        );
    }

    const [keyPresses, setKeyPresses] = useState([]);
    const [fetchingData, setFetchingData] = useState(false);

    const apiGetUserKeyPresses = function () {
        setFetchingData(true);

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow'
        };

        fetch(`${API_URL}/user/key-presses/${props.token}/${client.groupId}%23${client.userId}`, requestOptions)
            .then(function (response) {
                setFetchingData(false);
                return response.json();
            })
            .then((results) => {
                setKeyPresses(results.data);
            }).catch(function (error) {
                props.showToast(`Connection error`);
            });
    }

    const formatDate = function (timestamp) {
        const _date = new Date(timestamp);
        return `${_date.getDate()}, ${_date.getMonth() + 1} ${_date.getFullYear()} ${_date.getHours()}:${_date.getMinutes()}`;
    }

    useEffect(() => {
        createKeyPressChart(keyPresses);
    }, [keyPresses]);

    useEffect(() => {
        apiGetUserKeyPresses();
    }, []);

    return (
        <>
            <br />
            <div className="container">
                <canvas id="acquisitions"></canvas>

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">No.</th>
                            <th scope="col">time</th>
                            <th scope="col">keypresses</th>
                        </tr>
                    </thead>

                    {keyPresses.map((keyPress, index) => (
                        <tbody key={index}>
                            <tr>
                                <td>{index + 1}</td>
                                <td>{formatDate(keyPress.createdAt)}</td>
                                <td>{keyPress.count}</td>
                            </tr>
                        </tbody>
                    ))}
                </table>

                {(fetchingData) ?
                    <div className="text-center">
                        loading...
                    </div> : ''
                }


            </div>
        </>
    );
}
