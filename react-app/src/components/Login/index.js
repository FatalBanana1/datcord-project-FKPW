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
    return dispatch(login(email, password)).then((res) => {
        // console.log("res", res)
      if (res.email === "Email provided not found." || res.password === "No such user exists.") {
        // console.log("res.errors", res);
        return setErrors(res);
      } else {
        history.push("/channels/@me");
      }
    });
  };

  const goRegister = () => {
    history.push("/register");
  };

  const loginDemo = (num) => {
        switch (num) {
            case "one": {
                const data = dispatch(login(
                    "fahd@gmail.com", "password"
                )).then(() => history.push("/channels/@me"))
                return data;
            }
            case "two": {
                const data = dispatch(login(
                    "supa@gmail.com", "password4"
                )).then(() => history.push("/channels/@me"))
                return data;
            }
            case "three": {
                const data = dispatch(login(
                    "choco@gmail.com", "password3"
                )).then(() => history.push("/channels/@me"))
                return data;
            }
            default:
                return
        }
    }

  return (
    <div className="Form-wrapper">
      <div className="Form-container">
        <div className="Form-login">
            <div className="Form-close-container" onClick={() => history.push("/")}>
            <div className="close-icon">
                <i className="fa-solid fa-angle-left"></i> <p className="go-back">&nbsp; Go back</p>
            </div>
            <div></div>
            </div>
            <div className="Form-logo">
            <img src={logo} className="Form-logo" alt="Datcord Logo" />
            </div>
            <div className="Form-header">
            <h2 className="Form-title">Welcome back!</h2>
            <p className="LoginForm-subtext">
                We're so excited to see you again!
            </p>
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
                <div className="Form-error-container"></div>
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
                    {errors && Object.keys(errors).length ? (
                    <p className="Form-error">Email or password is incorrect</p>
                    ) : (
                    ""
                    )}
                </div>
                </div>
                <div className="Form-button-container">
                <button className="Form-submit-button">Log In</button>
                </div>
                <div className="Form-small-text">
                Need an account?
                <span className="Form-link" onClick={() => goRegister()}>
                    Register
                </span>
                </div>
            </form>
            </div>
        </div>
        <div className="Form-demos">
            <h2 className="Form-demos-header">Login to a demo user!</h2>
            <div className="Forms-demos-card">
                <div className="Form-demos-image">
                    <img src="https://wallpapers.com/images/hd/sebastian-vettel-red-textured-background-bnjujnpd4jy06cij.jpg" alt="User profile image" />
                </div>
                <div className="Form-demos-username">
                    Fahd
                </div>
                <button className="Form-demos-button" onClick={() => loginDemo("one")}>
                    Log in
                </button>
            </div>
            <div className="Forms-demos-card">
                <div className="Form-demos-image">
                    <img src="https://e00-marca.uecdn.es/assets/multimedia/imagenes/2022/10/20/16662224157675.jpg" />
                </div>
                <div className="Form-demos-username">
                    supadupa
                </div>
                <button className="Form-demos-button" onClick={() => loginDemo("two")}>
                    Log in
                </button>
            </div>
            <div className="Forms-demos-card">
                <div className="Form-demos-image">
                    <img src="https://milkandpop.com/wp-content/uploads/2020/11/mocha-latte-13-720x720.jpg" />
                </div>
                <div className="Form-demos-username">
                    choco
                </div>
                <button className="Form-demos-button" onClick={() => loginDemo("three")}>
                    Log in
                </button>
            </div>

        </div>
      </div>
    </div>
  );
}
