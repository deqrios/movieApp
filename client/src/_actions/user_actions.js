import axios from "axios";
import { LOGIN_USER, REGISTER_USER, AUTH_USER, LOGOUT_USER } from "./types";
import { USER_SERVER } from "../components/Config.js";

// => 기입된 정보를 request보내고, 받아온 response를 return.
export function registerUser(dataToSubmit) {
    const request = axios.post(`${USER_SERVER}/register`, dataToSubmit).then((response) => response.data);

    return {
        type: REGISTER_USER,
        payload: request,
    };
}

// => 유저 정보를 받아서 서버에 request를 날리고 처리된 결과를 리턴한다.
export function loginUser(dataToSubmit) {
    const request = axios.post(`${USER_SERVER}/login`, dataToSubmit).then((response) => response.data);

    return {
        type: LOGIN_USER,
        payload: request,
    };
}

// => 서버에 유저정보를 요청하고 받아온 유저정보를 리턴.
export function auth() {
    const request = axios.get(`${USER_SERVER}/auth`).then((response) => response.data);

    return {
        type: AUTH_USER,
        payload: request,
    };
}

// =>
export function logoutUser() {
    const request = axios.get(`${USER_SERVER}/logout`).then((response) => response.data);

    return {
        type: LOGOUT_USER,
        payload: request,
    };
}
