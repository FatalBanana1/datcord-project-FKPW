import { useState } from "react";
import "../../forms.css";
import logo from "../../assets/datcord_logo_full.svg";
import { useDispatch } from "react-redux";
import { signUp } from "../../store/session";
import { useHistory } from "react-router-dom";

export default function SignUp() {
	const dispatch = useDispatch();
	const history = useHistory();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [display_pic, setDisplayPic] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const [imageLoading, setImageLoading] = useState(false);
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState({});

	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrors({});
        const submitErrors = {};

        if (!email.includes("@")) {
            submitErrors.emailAt = "Please enter a valid email";
        }

        if (username.length < 4 || username.length > 50) {
            submitErrors.usernameLength = "Please enter a username between 4 and 50 characters";
        }

        if (password.length < 6 || password.length > 50) {
            submitErrors.passwordLength = "Please enter a password between 6 and 50 characters"
        }

        if (password !== confirmPassword) {
            submitErrors.password = "Confirm Password field must be the same as the Password field"
        }

        if (Object.keys(submitErrors).length > 0) {
            return setErrors(submitErrors);
        }

		if (Object.keys(submitErrors).length === 0) {

            console.log("IMAGE URL >>>>>>", imageUrl);
            console.log("IMAGE URL >>>>>>", display_pic);
            console.log("IMAGE URL >>>>>>", username);

            if (display_pic) {
                const formData = new FormData();
                formData.append("username", username);
                formData.append("email", email);
                formData.append("password", password);
                formData.append("image", display_pic);


                return dispatch(signUp("aws", formData))
                    .then((res) => {
                        if (res.errors) {
                            return setErrors(res.errors);
                        } else {
                            history.push("/channels/9/19");
                        }
                    })
                    .catch(async (res) => {
                        const data = await res.json();
                        if (data && data.errors) setErrors(data.errors);
                    });

                // const res = await fetch(`/api/auth/signup`, {
                //     method: "POST",
                //     body: formData,
                // });
                //     if (res.ok) {
                //         await res.json();
                //         // setDisplayPic(null);
                //         setImageLoading(false);
                //         history.push("/channels/9/19");
                //         // return dispatch(signUp({username, email, password}))
                //         //     .then((res) => {
                //         //         if (res.errors) {
                //         //             return setErrors(res.errors);
                //         //         } else {
                //         //             history.push("/channels/9/19");
                //         //         }
                //         //     })
                //         //     .catch(async (res) => {
                //         //         const data = await res.json();
                //         //         if (data && data.errors) setErrors(data.errors);
                //         //     });
                //     } else {
                //         setImageLoading(false);
                //         return setErrors(res.errors);
                //     }
            }
			return dispatch(signUp("none", {username, email, password, display_pic}))
				.then((res) => {
					if (res.errors) {
						return setErrors(res.errors);
					} else {
						history.push("/channels/9/19");
					}
				})
				.catch(async (res) => {
					const data = await res;
                    console.log("DATA ERRORS", data)
					if (data && data.errors) setErrors(data.errors);
				});
		}
	};

	const goLogin = () => {
		history.push("/login");
	};

    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            setDisplayPic(file);
            const url = URL.createObjectURL(file);
            setImageUrl(url);
        }
    }

  return (
    <div className="Form-wrapper">
      <div className="Form-container-signup">
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
            <h2 className="Form-title">Create an account</h2>
            </div>
            <div className="Form-form-container">
            <form className="Form-form" onSubmit={handleSubmit}>
                <div className="Form-group-profile-pic">
                    <div className="Form-default-profile-image-container">
                        <img
                            src={ imageUrl ? imageUrl : "https://cdn.discordapp.com/attachments/1030261089168015532/1073712325409902632/datcord_logo_png.png"}
                            alt="default-profile-image"
                            className="Form-default-profile-image"
                        />
                    </div>
                    <label htmlFor="profile-pic-upload" className="SignUpForm-profile-pic-upload clickable">
                        Add a photo of yourself!
                    </label>
                    <input id="profile-pic-upload" type="file" onChange={updateFile} />
                </div>
                <div className="Form-form-group">
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <div className="Form-error-container">
                    {errors && errors.email && <p className="Form-error">{errors.email}</p>}
                    {errors && errors.emailAt && <p className="Form-error">{errors.emailAt}</p>}
                </div>
                </div>
                <div className="Form-form-group">
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <div className="Form-error-container">
                    {errors && errors.username && (
                    <p className="Form-error">{errors.username}</p>
                    )}
                    {errors && errors.usernameLength && (
                    <p className="Form-error">{errors.usernameLength}</p>
                    )}
                </div>
                </div>
                <div className="Form-form-group">
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <div className="Form-error-container">
                    {/* <p className="Form-error">Any error text will go here</p> */}
                </div>
                </div>
                <div className="Form-form-group">
                <label htmlFor="confirm-password">Confirm Password</label>
                <input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <div className="Form-error-container">
                    {errors && errors.password && (
                    <p className="Form-error">{errors.password}</p>
                    )}
                    {errors && errors.passwordLength && (
                        <p className="Form-error">{errors.passwordLength}</p>
                    )}
                </div>
                </div>
                <div className="Form-button-container">
                <button className="Form-submit-button">Continue</button>
                </div>
                <div className="Form-small-text">
                <span className="Form-link" onClick={goLogin}>
                    Already have an account?
                </span>
                </div>
            </form>
            </div>
        </div>
      </div>
    </div>
  );
}
