import { API_URL } from "../../../environments/env";

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import LoaderUIComp from "../../../components/LoaderUIComp";

export default function Screenshots(props) {
    const { clientData } = useParams();
    const navigate = useNavigate();
    const client = JSON.parse(clientData);

    const [screenshots, setScreenshots] = useState([]);
    const [isFetchingData, setFetchingData] = useState(false);

    const apiGetUserScreenshots = function () {
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

        fetch(`${API_URL}/user/screenshots/${props.token}/${client.userId}/${startDateTimeStamp}/${endDateTimeStamp}`, requestOptions)
            .then(function (response) {
                setFetchingData(false);

                if (response.status === 401) {
                    props.deleteToken();
                    navigate('/login');
                }

                return response.json();
            })
            .then((results) => {
                console.log(results);

                setScreenshots(results.data);
            }).catch(function (error) {
                props.showToast(`Connection error`);
            });
    }

    const formatDate = function (timestamp) {
        const _date = new Date(timestamp);
        return `${_date.getDate()}, ${_date.getMonth() + 1} ${_date.getFullYear()} ${_date.getHours()}:${('0' + _date.getMinutes()).slice(-2)}`;
    }

    /*
     * Modal
     */
    const [imageModalLink, setImageModalLink] = useState('');

    const setImageModalLinkFun = function (imageLink) {
        setImageModalLink(imageLink);
    }

    /* Time interval */
    /**
     * Function to get today's date
     * @returns date string in the format YYYY-M-d
     */
    const getTodayDateStr = function () {
        const d = new Date();

        return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
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

        apiGetUserScreenshots();
    }



    useEffect(() => {
        apiGetUserScreenshots();
    }, []);

    return (
        <>
            <br />
            <div className="container">

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
                        <div className="row">
                            {screenshots.map((screenshot, index) => (
                                <div key={index} className="col-sm-3 text-center">
                                    <img
                                        onClick={function () { setImageModalLinkFun(`https://s3-137627469964-remonitor-screenshots.s3.amazonaws.com/${encodeURIComponent(screenshot.id)}`) }}
                                        className="img-fluid" src={`https://s3-137627469964-remonitor-screenshots.s3.amazonaws.com/${encodeURIComponent(screenshot.id)}`} alt="Image Alt" loading="lazy" />

                                    <br />

                                    <small>{formatDate(screenshot.createdAt)}</small>
                                </div>
                            ))}
                        </div>
                    </>
                }

                <LoaderUIComp show={isFetchingData} />
            </div>

            {/* Image modal */}
            {imageModalLink === '' ? '' :
                <div className="app-image-modal">
                    <button onClick={function () { setImageModalLinkFun(''); }} className="btn btn-primary rounded-pill m-3">
                        <i className="bi bi-x-circle"></i>
                    </button>

                    <img className="img-fluid" src={imageModalLink} alt="Image Alt" loading="lazy" />
                </div>
            }
        </>
    );
}
