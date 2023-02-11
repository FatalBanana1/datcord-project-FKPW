import { useState } from "react";
import "../../forms.css";
import logo from "../../assets/datcord_logo_full.svg"

export default function Login() {
    const [ credential, setCredential ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ errors, setErrors ] = useState({});

    return (
        <div className="Form-wrapper">
            <div className="Form-container">
                <div className="Form-logo">
                    <img src={logo} className="Form-logo" alt="Datcord Logo" />
                </div>
                <div className="Form-header">
                    <h2 className="Form-title">Welcome back!</h2>
                    <p className="LoginForm-subtext">We're so excited to see you again!</p>
                </div>
                <div className="Form-form-container">
                    <form className="Form-form">
                        <div className="Form-form-group">
                            <label htmlFor="credential">
                                Email
                                <span className="Form-required">*</span>
                            </label>
                            <input
                                id="credential"
                                type="text"
                                value={credential}
                                onChange={(e) => setCredential(e.target.value)}
                                required
                            />
                            <div className="Form-error-container">
                                <p className="Form-error">Any error text will go here</p>
                            </div>
                        </div>
                        <div className="Form-form-group">
                            <label htmlFor="password">
                                Password
                                <span className="Form-required">*</span>
                            </label>
                            <input
                                id="password"
                                type="text"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <div className="Form-error-container">
                                <p className="Form-error">Any error text will go here</p>
                            </div>
                        </div>
                        <div className="Form-button-container">
                            <button className="Form-submit-button">Log In</button>
                        </div>
                        <div className="Form-small-text">
                            Need an account?
                            <span className="Form-link">
                                Register
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
