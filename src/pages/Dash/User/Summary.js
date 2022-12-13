import { API_URL } from "../../../environments/env";

import { useParams } from "react-router-dom";
import LoaderUIComp from "../../../components/LoaderUIComp";
import CopyToClipBoard from "../../../components/CopyToClipBoard";

export default function Summary(props) {
    const { clientData } = useParams();
    const client = JSON.parse(clientData);

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
                                                <div className="col-12 col-xl-9">{client.groupId} <CopyToClipBoard textToCopy={client.groupId}/></div>
                                            </div>

                                            <div className="row">
                                                <div className="col-12 col-xl-3"><b><i className="bi bi-at"></i> email</b></div>
                                                <div className="col-12 col-xl-9">{client.email} <CopyToClipBoard textToCopy={client.email}/></div>
                                            </div>

                                            <div className="row">
                                                <div className="col-12 col-xl-3"><b><i className="bi bi-key"></i> passkey</b></div>
                                                <div className="col-12 col-xl-9">{client.paswordResetCode} <CopyToClipBoard textToCopy={client.paswordResetCode}/></div>
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
                    </div>
                </div>
            </div>
        </>
    );
}
