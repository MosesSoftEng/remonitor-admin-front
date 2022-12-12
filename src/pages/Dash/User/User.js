                                    return (isActive) ? "nav-link active" : "nav-link"
                                }}>
                                    Keypresses
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href="#">Screenshots</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href="#">Sessions</a>
                            </li>
                        </ul>

                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
}
