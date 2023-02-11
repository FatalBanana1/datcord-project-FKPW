import { useState } from "react";
import "../../forms.css";
import logo from "../../assets/datcord_logo_full.svg"

export default function SignUp() {
    const [ email, setEmail ] = useState("");
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ errors, setErrors ] = useState({});

    return (
        <div className="Form-wrapper">
            <div className="Form-container">
                <div className="Form-logo">
                    <img src={logo} className="Form-logo" alt="Datcord Logo" />
                </div>
                <div className="Form-header">
                    <h2 className="Form-title">Create an account</h2>
                </div>
                <div className="Form-form-container">
                    <form className="Form-form">
                        <div className="Form-form-group">
                            <label htmlFor="email">
                                Email
                            </label>
                            <input
                                id="email"
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <div className="Form-error-container">
                                <p className="Form-error">Any error text will go here</p>
                            </div>
                        </div>
                        <div className="Form-form-group">
                            <label htmlFor="username">
                                Username
                            </label>
                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                            <div className="Form-error-container">
                                <p className="Form-error">Any error text will go here</p>
                            </div>
                        </div>
                        <div className="Form-form-group">
                            <label htmlFor="password">
                                Password
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
                            <span className="Form-link">
                                Already have an account?
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
