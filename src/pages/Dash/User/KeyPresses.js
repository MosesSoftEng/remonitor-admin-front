import { API_URL } from "../../../environments/env";

import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

import Chart from 'chart.js/auto';
import LoaderUIComp from "../../../components/LoaderUIComp";

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
    const [isFetchingData, setFetchingData] = useState(false);

    /**
     * function to fetch keypresses data.
     * @returns void
     */
    const apiGetUserKeyPresses = function () {
        setFetchingData(true);

        const todayDateStr = getTodayDateStr();
        let startDateTimeStamp = new Date(todayDateStr).getTime();
        let endDateTimeStamp = new Date(`${todayDateStr} 23:59`).getTime();

        if(startDate !== '' &&  endDate !== '') {
            // Convert to timestamp
            startDateTimeStamp = new Date(startDate).getTime();

            // Convert to end of day timestamp
            endDateTimeStamp = new Date(`${endDate} 23:59`).getTime();
        }

        // Check for a valid interval
        if(startDateTimeStamp > endDateTimeStamp) {
            return;
        }

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow'
        };

        fetch(`${API_URL}/user/key-presses/${props.token}/${client.groupId}%23${client.userId}/${startDateTimeStamp}/${endDateTimeStamp}`, requestOptions)
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
        return `${_date.getDate()}, ${_date.getMonth() + 1} ${_date.getFullYear()} ${_date.getHours()}:${('0' + _date.getMinutes()).slice(-2)}`;
    }

    const [todayDate, setTodayDate] = useState([]);
    const getTodayDate = function() {
        const d = new Date();
        setTodayDate(`${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`);
    /* Form */
    /*
     * Start date
     */
    const [startDate, setStartDate] = useState(getTodayDateStr());
    const startDateChange = function (event) {
        setStartDate(event.target.value);
    };

    /*
     * End date
     */
    const [endDate, setEndDate] = useState(getTodayDateStr());
    const endDateChange = function (event) {
        setEndDate(event.target.value);
    };

    /*
     * Apply interval Form submission
     */
    const applyInterval = function (event) {
        event.preventDefault();

        apiGetUserKeyPresses();
    }

    useEffect(() => {
        createKeyPressChart(keyPresses);
    }, [keyPresses]);

    useEffect(() => {
        apiGetUserKeyPresses();
        getTodayDate();
    }, []);

    return (
        <>
            <br />
            <div className="container">
                <div className="input-group">
                    <span className="input-group-text">Interval</span>
                    <input type="date" aria-label="First name" className="form-control" placeholder="start date" />
                    <input type="date" aria-label="Last name" className="form-control" placeholder="end date" max={todayDate}/>
                </div>

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

                <LoaderUIComp show={isFetchingData} />

            </div>
        </>
    );
}
