import { useState } from "react";

/**
 * AuthToken - function component to handle auth token
 * @returns object with token and saveToken function
 */
export default function AuthToken() {
    /**
     * getToken - function to get auth token from localstorage
     * @returns auth token
     */
    const getToken = function () {
        return localStorage.getItem('remonitor-token');
    };

    const [token, setToken] = useState(getToken());

    /**
     * saveToken - function to save auth token to localstorage
     * @param {*} token auth token
     */
    const saveToken = function (token) {
        localStorage.setItem("remonitor-token", token);
    };

    return {
        token,
        saveToken: saveToken
    }
}
