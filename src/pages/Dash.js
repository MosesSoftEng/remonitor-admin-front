import { useEffect } from 'react';
import { useNavigate } from "react-router-dom"

import Chart from 'chart.js/auto';

import AuthToken from '../services/AuthToken'

/**
 * Dashboard page.
 * @returns JSX template view
 */
export default function Dash(props) {
    const navigate = useNavigate();
    const { token } = AuthToken();

    if (token === null) {
        navigate('/login');
    }

    const overallActivityChart = function () {
        const keyPresses = [
            { time: '7.00', count: 900 },
            { time: '8.00', count: 8000 },
            { time: '9.00', count: 150 },
            { time: '10.00', count: 0 },
            { time: '11.00', count: 2820 },
            { time: '12.00', count: 56 },
            { time: '13.00', count: 0 },
        ];

        const mouseClicks = [
            { time: '7.00', count: 700},
            { time: '8.00', count: 1780 },
            { time: '9.00', count: 100 },
            { time: '10.00', count: 300 },
            { time: '11.00', count: 560 },
            { time: '12.00', count: 70 },
            { time: '13.00', count: 100 },
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
                    labels: keyPresses.map(row => row.time),
                    datasets: [
                        {
                            label: 'Key presses',
                            data: keyPresses.map(row => row.count)
                        },
                        {
                            label: 'Mouse clicks',
                            data: mouseClicks.map(row => row.count)
                        },
                        {
                            label: 'Sessions',
                            data: combined.map(row => row.count)
                        }
                    ]
                }
            }
        );
    };

    const overallGroupActivitiesChart = function () {
        const keyPresses = [
            { time: '7.00', count: 1280 },
            { time: '8.00', count: 549 },
            { time: '9.00', count: 6700 },
            { time: '10.00', count: 500 },
            { time: '11.00', count: 3400 },
            { time: '12.00', count: 600 },
            { time: '13.00', count: 10 },
        ];

        const mouseClicks = [
            { time: '7.00', count: 1700 },
            { time: '8.00', count: 569 },
            { time: '9.00', count: 3469 },
            { time: '10.00', count: 456 },
            { time: '11.00', count: 56 },
            { time: '12.00', count: 712 },
            { time: '13.00', count: 500 },
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
            document.getElementById('overallGroupActivitiesCanvas'),
            {
                type: 'line',
                data: {
                    labels: keyPresses.map(row => row.time),
                    datasets: [
                        {
                            label: 'Key presses',
                            data: keyPresses.map(row => row.count)
                        },
                        {
                            label: 'Mouse clicks',
                            data: mouseClicks.map(row => row.count)
                        },
                        {
                            label: 'Sessions',
                            data: combined.map(row => row.count)
                        }
                    ]
                }
            }
        );
    };

    useEffect(() => {
        overallActivityChart();
        overallGroupActivitiesChart();
    }, []);

    return (
        <>
            <div className="container-fluid">
                <br />
                <h1><i className="bi bi-speedometer2"></i> Dashboard
                    <div className="btn-group float-end" role="group">
                        <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            Period <i className="bi bi-calendar"></i>
                        </button>

                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#">Today</a></li>
                            <li><a className="dropdown-item" href="#">Week</a></li>
                            <li><a className="dropdown-item" href="#">Month</a></li>
                            <li><a className="dropdown-item" href="#"><hr /></a></li>
                            <li>
                                <form className="dropdown-item">

                                    <label htmlFor="exampleInputEmail1" className="form-label">Start Date</label>
                                    <input type="date" className="form-control" id="exampleInputEmail1" placeholder="start date" />

                                    <br />

                                    <label htmlFor="exampleInputEmail1" className="form-label">End Date</label>
                                    <input
                                        id="endDate"
                                        type="date" aria-label="First name" className="form-control" placeholder="start date" />

                                    <br />

                                    <div className="float-end">
                                        <button className="btn btn-primary" type="submit">Apply</button>
                                    </div>
                                </form>

                            </li>
                        </ul>
                    </div>
                </h1>

                <div className="row">
                    <div className="col-6 col-sm-4 col-md-3">
                        <div className="card text-bg-primary">
                            <div className="card-body">
                                <h5 className="card-title"><i className="bi bi-keyboard"></i> Key Presses</h5>
                                <p className="card-text">
                                    Today <br />
                                    <span className="display-6">155</span>k <br />
                                    <span className="">+13k</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-6 col-sm-4 col-md-3">
                        <div className="card text-bg-secondary">
                            <div className="card-body">
                                <h5 className="card-title"><i className="bi bi-mouse"></i> Mouse Clicks</h5>
                                <p className="card-text">
                                    Today <br />
                                    <span className="display-6">78</span>k <br />
                                    <span>-788</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-6 col-sm-4 col-md-3">
                        <div className="card text-bg-success  ">
                            <div className="card-body">
                                <h5 className="card-title"><i className="bi bi-fullscreen"></i> Screenshots</h5>
                                <p className="card-text">
                                    Today <br />
                                    <span className="display-6">2.5</span>k <br />
                                    <span>+108</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-6 col-sm-4 col-md-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title"><i className="bi bi-window-fullscreen"></i> Sessions</h5>
                                <p className="card-text">
                                    Today <br />
                                    <span className="display-6">5000</span>k (hrs)<br />
                                    <span>+51</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <br />

                <div className="row">
                    <div className="col-sm-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">
                                    <i className="bi bi-graph-up"></i> Overall Users Activities
                                </h5>

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
                                    Sessions <span className="badge text-bg-secondary">1316</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6">
                    <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">
                                    <i className="bi bi-graph-up"></i> Overall Group Activities
                                </h5>

                                <canvas id="overallGroupActivitiesCanvas"></canvas>

                                <button type="button" className="btn btn-warning">
                                    Key Presses <span className="badge text-bg-secondary">956</span>
                                </button>
                                .
                                <button type="button" className="btn btn-danger">
                                    Mouse Clicks <span className="badge text-bg-secondary">360</span>
                                </button>
                                .
                                <button type="button" className="btn btn-info">
                                    Sessions <span className="badge text-bg-secondary">1316</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <br />

                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title"><i className="bi bi-people"></i> Users <span className="badge bg-primary">2.1k</span></h5>
                                <div className="card-text">Top Users.
                                    <table className="table table-borderless table-hover">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Activity</th>
                                                <th scope="col">Group</th>
                                                <th scope="col"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th scope="row">1</th>
                                                <td>Jane</td>
                                                <td>13.9k</td>
                                                <td><a href="#">FE Devs</a></td>
                                                <td><a href="#" className="btn btn-sm btn-outline-primary">full stats</a></td>
                                            </tr>

                                            <tr>
                                                <th scope="row">2</th>
                                                <td>John</td>
                                                <td>13.7k</td>
                                                <td><a href="#">FE Devs</a></td>
                                                <td><a href="#" className="btn btn-sm btn-outline-primary">full stats</a></td>
                                            </tr>

                                            <tr>
                                                <th scope="row">3</th>
                                                <td>Don</td>
                                                <td>13.1k</td>
                                                <td><a href="#">BE Devs</a></td>
                                                <td><a href="#" className="btn btn-sm btn-outline-primary">full stats</a></td>
                                            </tr>

                                            <tr>
                                                <th scope="row">4</th>
                                                <td>Gin</td>
                                                <td>12.9k</td>
                                                <td><a href="#">SREs</a></td>
                                                <td><a href="#" className="btn btn-sm btn-outline-primary">full stats</a></td>
                                            </tr>

                                            <tr>
                                                <th scope="row">5</th>
                                                <td>Doe</td>
                                                <td>12.8k</td>
                                                <td><a href="#">Content Man</a></td>
                                                <td><a href="#" className="btn btn-sm btn-outline-primary">full stats</a></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div className="btn-group float-end" role="group" aria-label="Basic outlined example">
                                    <button type="button" className="btn btn-outline-primary">All Users <i className="bi bi-people"></i></button>
                                    <button type="button" className="btn btn-outline-primary">Add User <i className="bi bi-person-plus"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="card text-bg-secondary">
                            <div className="card-body">
                                <h5 className="card-title"><i className="bi bi-collection"></i> Groups <span className="badge bg-primary">2.1k</span></h5>
                                <div className="card-text">Top Groups.
                                    <table className="table table-borderless table-hover">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Activity</th>
                                                <th scope="col">Top User</th>
                                                <th scope="col"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th scope="row">1</th>
                                                <td>FE Devs</td>
                                                <td>983.0k</td>
                                                <td><a href="#">Jane</a></td>
                                                <td><a href="#" className="btn btn-sm btn-outline-primary">full stats</a></td>
                                            </tr>

                                            <tr>
                                                <th scope="row">2</th>
                                                <td>Content Man</td>
                                                <td>967.5k</td>
                                                <td><a href="#">Doe</a></td>
                                                <td><a href="#" className="btn btn-sm btn-outline-primary">full stats</a></td>
                                            </tr>

                                            <tr>
                                                <th scope="row">3</th>
                                                <td>BE Devs</td>
                                                <td>514k.0</td>
                                                <td><a href="#">Don</a></td>
                                                <td><a href="#" className="btn btn-sm btn-outline-primary">full stats</a></td>
                                            </tr>

                                            <tr>
                                                <th scope="row">4</th>
                                                <td>Graphics Depart</td>
                                                <td>458.1k</td>
                                                <td><a href="#">Adesanya</a></td>
                                                <td><a href="#" className="btn btn-sm btn-outline-primary">full stats</a></td>
                                            </tr>

                                            <tr>
                                                <th scope="row">5</th>
                                                <td>SREs</td>
                                                <td>400.8k</td>
                                                <td><a href="#">Gin</a></td>
                                                <td><a href="#" className="btn btn-sm btn-outline-primary">full stats</a></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div className="btn-group float-end" role="group" aria-label="Basic outlined example">
                                    <button type="button" className="btn btn-outline-primary">All Groups <i className="bi bi-collection"></i></button>
                                    <button type="button" className="btn btn-outline-primary">Add Group <i className="bi bi-plus-circle"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
            </div>
        </>
    );
};
