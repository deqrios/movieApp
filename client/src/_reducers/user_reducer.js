import { LOGIN_USER, REGISTER_USER, AUTH_USER, LOGOUT_USER } from "../_actions/types";

// => 액션타입에 따라 필요한 정보를 리턴.
export default function (state = {}, action) {
    switch (action.type) {
        case REGISTER_USER:
            return { ...state, register: action.payload };
        case LOGIN_USER:
            return { ...state, loginSucces: action.payload };
        case AUTH_USER:
            return { ...state, userData: action.payload };
        case LOGOUT_USER:
            return { ...state };
        default:
            return state;
    }
}
