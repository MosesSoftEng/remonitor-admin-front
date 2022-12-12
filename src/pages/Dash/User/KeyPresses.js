import { API_URL } from "../../../environments/env";

import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

export default function KeyPresses(props) {
    const { clientData } = useParams();
    const client = JSON.parse(clientData);

    const [keyPresses, setKeyPresses] = useState([]);

    const apiGetUserKeyPresses = function () {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow'
        };

        fetch(`${API_URL}/user/key-presses/${props.token}/${client.userId}`, requestOptions)
            .then(function (response) {
                return response.json();
            })
            .then((data) => {
                console.log(data);

                if (data.success) {
                    setKeyPresses(data.data);
                }
            }).catch(function (error) {
                props.showToast(`Connection error`);
            });
    }

    const formatDate = function (timestamp) {
        const _date = new Date(timestamp);

        return `${_date.getDate()}, ${_date.getMonth() + 1} ${_date.getFullYear()} ${_date.getHours()}:${_date.getMinutes()}`;
    }

    useEffect(() => {
        apiGetUserKeyPresses();
    }, []);

    return (
        <>
            <br />
            <div className="container">
                
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">No.</th>
                            <th scope="col">time</th>
                            <th scope="col">keypresses</th>
                        </tr>
                    </thead>

                    {keyPresses.map((keyPress, index) => (
                        <tbody key={keyPress.id}>
                            <tr>
                                <td>{index + 1}</td>
                                <td>{formatDate(keyPress.createdAt)}</td>
                                <td>{keyPress.keyPresses}</td>
                            </tr>
                        </tbody>
                    ))}
                </table>

            </div>
        </>
    );
}
