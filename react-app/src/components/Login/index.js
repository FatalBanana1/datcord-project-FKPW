import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import "../../forms.css";
import logo from "../../assets/datcord_logo_full.svg";

// to-do => change login button to open datcord if user logged in

export default function Login() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const history = useHistory();

    // if (sessionUser) return <Redirect to="/channels/@me" />;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        return dispatch(login(email, password))
            .then((res) => {
                    if (res.email || res.password) {
                        // console.log("res.errors", res);
                        return setErrors(res);
                    } else {
                        history.push("/channels/@me")
                    }
                })
    };

    const goRegister = () => {
      history.push("/register");
    }

    return (
        <div className="Form-wrapper">
            <div className="Form-container">
                <div className="Form-logo">
                    <img src={logo} className="Form-logo" alt="Datcord Logo" />
                </div>
                <div
                    className="Form-close clickable"
                    onClick={() => history.push("/")}
                >
                    <i className="fa-solid fa-xmark"></i>
                </div>
                <div className="Form-header">
                    <h2 className="Form-title">Welcome back!</h2>
                    <p className="LoginForm-subtext">We're so excited to see you again!</p>
                </div>
                <div className="Form-form-container">
                    <form className="Form-form" onSubmit={handleSubmit}>
                        <div className="Form-form-group">
                            <label htmlFor="email">
                                Email
                                <span className="Form-required">*</span>
                            </label>
                            <input
                                id="email"
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <div className="Form-error-container">
                            </div>
                        </div>
                        <div className="Form-form-group">
                            <label htmlFor="password">
                                Password
                                <span className="Form-required">*</span>
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <div className="Form-error-container">
                              { errors && Object.keys(errors).length ? (
                                  <p className="Form-error">Email or password is incorrect</p>
                              ) : ""}
                            </div>
                        </div>
                        <div className="Form-button-container">
                            <button className="Form-submit-button">Log In</button>
                        </div>
                        <div className="Form-small-text">
                            Need an account?
                            <span className="Form-link" onClick={() => goRegister()}>Register</span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
