import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { loginUser } from "../../../_actions/user_actions";
import { Formik } from "formik"; // react라이브러리. state와 onChange역할을 formik안에서 해줌.
import * as Yup from "yup";
import { Form, Icon, Input, Button, Checkbox, Typography } from "antd"; // 디자인 라이브러리의 컴포넌트
import { useDispatch } from "react-redux";

const { Title } = Typography;

function LoginPage(props) {
    const dispatch = useDispatch();
    const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false; // 로컬스토리지에 rememberMe 유무에 따라 true/false

    const [formErrorMessage, setFormErrorMessage] = useState(""); // error메세지를 담을 state.
    const [rememberMe, setRememberMe] = useState(rememberMeChecked); // id 저장.

    const handleRememberMe = () => {
        setRememberMe(!rememberMe);
    };

    const initialEmail = localStorage.getItem("rememberMe") ? localStorage.getItem("rememberMe") : "";

    return (
        <Formik
            // * initial state.
            initialValues={{
                email: initialEmail, //  rememberMe가 localStorage에 있다면 가져와서 emali value에 뿌림.
                password: "",
            }}
            validationSchema={Yup.object().shape({
                // Yup - validation library.
                email: Yup.string().email("Email is invalid").required("Email is required"),
                password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
            })}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    let dataToSubmit = {
                        email: values.email,
                        password: values.password,
                    };

                    // => 유저정보를 받아 로그인 처리를 함.
                    dispatch(loginUser(dataToSubmit))
                        .then((response) => {
                            // :: 로그인이 성공하면 로컬스토리지에 유저 아이디 저장.
                            if (response.payload.loginSuccess) {
                                window.localStorage.setItem("userId", response.payload.userId);
                                // :: rememberMe가 체크 돼 있으면 localstorage에 email저장, 없으면 rememberMe삭제.
                                if (rememberMe === true) {
                                    window.localStorage.setItem("rememberMe", values.email);
                                } else {
                                    localStorage.removeItem("rememberMe");
                                }
                                props.history.push("/");
                            } else {
                                // 로그인정보가 일치하지 않을 때 에러메세지 출력.
                                setFormErrorMessage("Check out your Account or Password again");
                            }
                        })
                        .catch((err) => {
                            setFormErrorMessage("Check out your Account or Password again");
                            setTimeout(() => {
                                setFormErrorMessage("");
                            }, 3000);
                        });
                    setSubmitting(false);
                }, 500);
            }}
        >
            {(props) => {
                // formik의 props들
                const { values, touched, errors, dirty, isSubmitting, handleChange, handleBlur, handleSubmit, handleReset } = props;
                return (
                    <div className="app">
                        <Title level={2}>Log In</Title>
                        <form onSubmit={handleSubmit} style={{ width: "350px" }}>
                            <Form.Item required>
                                <Input
                                    id="email"
                                    prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
                                    placeholder="Enter your email"
                                    type="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={errors.email && touched.email ? "text-input error" : "text-input"}
                                />
                                {errors.email && touched.email && <div className="input-feedback">{errors.email}</div>}
                            </Form.Item>

                            <Form.Item required>
                                <Input
                                    id="password"
                                    prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
                                    placeholder="Enter your password"
                                    type="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={errors.password && touched.password ? "text-input error" : "text-input"}
                                />
                                {errors.password && touched.password && <div className="input-feedback">{errors.password}</div>}
                            </Form.Item>

                            {formErrorMessage && ( // formErrorMessage가 있으면(접속실패), 에러문구 띄워 줌.
                                <label>
                                    <p style={{ color: "#ff0000bf", fontSize: "0.7rem", border: "1px solid", padding: "1rem", borderRadius: "10px" }}>
                                        {formErrorMessage}
                                    </p>
                                </label>
                            )}

                            <Form.Item>
                                <Checkbox id="rememberMe" onChange={handleRememberMe} checked={rememberMe}>
                                    Remember me
                                </Checkbox>
                                <a className="login-form-forgot" href="/reset_user" style={{ float: "right" }}>
                                    forgot password
                                </a>
                                <div>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        className="login-form-button"
                                        style={{ minWidth: "100%" }}
                                        disabled={isSubmitting}
                                        onSubmit={handleSubmit}
                                    >
                                        Log in
                                    </Button>
                                </div>
                                Or <a href="/register">register now!</a>
                            </Form.Item>
                        </form>
                    </div>
                );
            }}
        </Formik>
    );
}

export default withRouter(LoginPage);
