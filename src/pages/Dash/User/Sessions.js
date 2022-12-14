import { API_URL } from "../../../environments/env";

import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

import Chart from 'chart.js/auto';
import LoaderUIComp from "../../../components/LoaderUIComp";

export default function Sessions(props) {
    const { clientData } = useParams();
    const client = JSON.parse(clientData);

    /**
     * Function to draw line chart.
     * @param {*} keyPresses Array of data {createdAt: number, count: number}
     */
    const createKeyPressChart = function (keyPresses) {
        const data = keyPresses.map(function (keyPress) {
            return {
                time: formatDate(keyPress.createdAt),
                count: keyPress.count
            };
        });

        // Find chart and destroy to prevent error.
        let chartStatus = Chart.getChart("acquisitions"); // <canvas> id
        if (chartStatus !== undefined) {
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

    const [sessions, setKeyPresses] = useState([]);
    const [isFetchingData, setFetchingData] = useState(false);

    /**
     * Function to fetch keypresses data.
     * @returns void
     */
    const apiGetUserSessions = function () {
        setFetchingData(true);

        const todayDateStr = getTodayDateStr();
        let startDateTimeStamp = new Date(todayDateStr).getTime();
        let endDateTimeStamp = new Date(`${todayDateStr} 23:59`).getTime();

        if (startDate !== '' && endDate !== '') {
            // Convert to timestamp
            startDateTimeStamp = new Date(startDate).getTime();

            // Convert to end of day timestamp
            endDateTimeStamp = new Date(`${endDate} 23:59`).getTime();
        }

        // Check for a valid interval
        if (startDateTimeStamp > endDateTimeStamp) {
            return;
        }

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow'
        };

        const url = `${API_URL}/user/sessions/${props.token}/${client.groupId}%23${client.id}/${startDateTimeStamp}/${endDateTimeStamp}`;

        fetch(url, requestOptions)
            .then(function (response) {
                setFetchingData(false);
                return response.json();
            })
            .then((results) => {
                console.log(results);
                
                setKeyPresses(results.data);
            }).catch(function (error) {
                props.showToast(`Connection error`);
            });
    }

    /**
     * Function to get today's date
     * @returns date string in the format YYYY-M-d
     */
    const getTodayDateStr = function () {
        const d = new Date();

        return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
    }

    /**
     * Function to format date 
     * @param {*} timestamp 
     * @returns date string in the format d-m-YYYY H:m
     */
    const formatDate = function (timestamp) {
        const _date = new Date(timestamp);
        return `${_date.getDate()}, ${_date.getMonth() + 1} ${_date.getFullYear()} ${_date.getHours()}:${('0' + _date.getMinutes()).slice(-2)}`;
    }

    const [todayDate, setTodayDate] = useState(getTodayDateStr());

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

        apiGetUserSessions();
    }

    useEffect(() => {
        // createKeyPressChart(keyPresses);
    }, [sessions]);

    useEffect(() => {
        apiGetUserSessions();
    }, []);

    return (
        <>
            <br />
            <div className="container">
                <h1>Sessions</h1>
                <form
                    onSubmit={applyInterval}
                    className="input-group">

                    <span className="input-group-text">Interval</span>

                    <input
                        id="startDate"
                        value={startDate}
                        onChange={startDateChange}
                        max={todayDate}
                        type="date" aria-label="First name" className="form-control" placeholder="start date" />

                    <input
                        id="endDate"
                        value={endDate}
                        onChange={endDateChange}
                        max={todayDate}
                        type="date" aria-label="First name" className="form-control" placeholder="start date" />

                    <button className="btn btn-primary" type="submit">Apply</button>
                </form>
                
                <br></br>

                {isFetchingData ? '' :
                    <>
                        <canvas id="acquisitions"></canvas>

                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">No.</th>
                                    <th scope="col">time</th>
                                    <th scope="col">type</th>
                                </tr>
                            </thead>

                            {sessions.map((session, index) => (
                                <tbody key={index}>
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{formatDate(session.createdAt)}</td>
                                        <td>{session.type}</td>
                                    </tr>
                                </tbody>
                            ))}
                        </table>
                    </>
                }

                <LoaderUIComp show={isFetchingData} />

            </div>
        </>
    );
}
