/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Menu } from "antd";
import axios from "axios";
import { USER_SERVER } from "../../../Config";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";

// => user login과 out을 컨트롤하는 메뉴바.
function RightMenu(props) {
    // * 연결된 action이 dispatch될 때마다 store의 state에 접근해 데이터를 할당해 옴.
    const user = useSelector((state) => state.user);

    // * 로그아웃이 정상처리 됐으면, login페이지로 이동.
    const logoutHandler = () => {
        axios.get(`${USER_SERVER}/logout`).then((response) => {
            if (response.status === 200) {
                props.history.push("/login");
            } else {
                alert("Log Out Failed");
            }
        });
    };

    // => store에 userData가 있고, 쿠키에 토큰이 없으면, 로그인 아이템과 회원가입 아이템을 보여줌. login상태면 logout아이템 보여줌.
    if (user.userData && !user.userData.isAuth) {
        return (
            <Menu mode={props.mode}>
                <Menu.Item key="mail">
                    <a href="/login">Signin</a>
                </Menu.Item>
                <Menu.Item key="app">
                    <a href="/register">Signup</a>
                </Menu.Item>
            </Menu>
        );
    } else {
        return (
            <Menu mode={props.mode}>
                <Menu.Item key="logout">
                    <a onClick={logoutHandler}>Logout</a>
                </Menu.Item>
            </Menu>
        );
    }
}

export default withRouter(RightMenu);
