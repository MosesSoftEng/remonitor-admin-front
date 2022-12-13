import { API_URL } from "../../../environments/env";

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import LoaderUIComp from "../../../components/LoaderUIComp";

export default function Summary(props) {
    const { clientData } = useParams();
    const navigate = useNavigate();
    const client = JSON.parse(clientData);

    return (
        <>
            <br />
            <div className="container">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">

                        </h5>

                        <p className="card-text">
                            Group:<br />
                            {client.groupId}<br />
                            <br />

                            email:<br />
                            {client.email} <br />
                            <br />

                            passkey:<br />
                            {client.paswordResetCode}<br />
                            <br />

                            <small>{client.description}</small>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
