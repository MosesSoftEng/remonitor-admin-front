import { API_URL } from "../../../environments/env";

import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import LoaderUIComp from "../../../components/LoaderUIComp";

export default function Screenshots(props) {
    const { clientData } = useParams();
    const client = JSON.parse(clientData);

    const [screenshots, setScreenshots] = useState([]);
    const [isFetchingData, setFetchingData] = useState(false);

    const apiGetUserScreenshots = function () {
        setFetchingData(true);

        console.log('apiGetUserScreenshots');

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow'
        };

        fetch(`${API_URL}/user/screenshots/${props.token}/${client.userId}`, requestOptions)
            .then(function (response) {
                setFetchingData(false);

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


    useEffect(() => {
        apiGetUserScreenshots();
    }, []);

    return (
        <>
            <br />
            <div className="container">

                <div className="row">
                    {screenshots.map((screenshot, index) => (
                        <div key={index} className="col-sm-4 text-center">
                            <img
                                onClick={function () { setImageModalLinkFun(`https://s3-137627469964-remonitor-screenshots.s3.amazonaws.com/${encodeURIComponent(screenshot.id)}`) }}
                                className="img-fluid" src={`https://s3-137627469964-remonitor-screenshots.s3.amazonaws.com/${encodeURIComponent(screenshot.id)}`} alt="Image Alt" loading="lazy" />

                            <br />

                            <small>{formatDate(screenshot.createdAt)}</small>
                        </div>
                    ))}
                </div>

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
