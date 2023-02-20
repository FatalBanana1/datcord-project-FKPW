import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { useModal } from "../../context/Modal.js";
import mootroGOLD from "../../assets/mootro.png";
import lightMode from "../../assets/light-theme-mootro.png";
import purple from "../../assets/purplicious-theme-mootro.png";
import { thunkSetMootro, authenticate } from "../../store/session.js";

import "./Mootro.css";

export default function MootroModal({ user }) {
	const dispatch = useDispatch();
	const { closeModal } = useModal();

	const theme = null;
	const userId = user.id;

	// ADD MOOTRO FUNCTION

	const addMootro = () => {
		dispatch(thunkSetMootro(userId, "mootro"))
			.then(() => dispatch(authenticate()))
			.then(closeModal());
	};

	const cancelMootro = () => {
		/// REMOVE FUNCTION
		dispatch(thunkSetMootro(userId, "regular"))
			.then(() => dispatch(authenticate()))
			.then(closeModal());
	};

	return (
		<div className="mootro-card">
			<div className="mootro-member-card" id={theme}>
				<div id="mootro-card-header"></div>
				<div className="mootro-card-content">
					<div className="mootro-member-header">
						<img
							className="card-img"
							id={theme}
							src={mootroGOLD}
						></img>
						{user.mootro === "mootro" ? (
							<button
								type="submit"
								id={theme}
								className="cancel mootro-button"
								onClick={cancelMootro}
							>
								Leave Mootro
							</button>
						) : (
							<button
								type="submit"
								id={theme}
								className="get mootro-button"
								onClick={addMootro}
							>
								Get Mootro
							</button>
						)}
					</div>
					<div className="mootro-info" id={theme}>
						<div className="card-member-inner-div">
							<div className="member-nickName-div" id={theme}>
								<div className="member-nickname-container">
									<h4 className="mootro-features" id={theme}>
										Mootro features
									</h4>
								</div>
							</div>
							<div className="member-since-section">
								<div className="mootro-h4" id={theme}>
									Access all of our amazing themes!
								</div>
							</div>
							<div className="role-section">
								<div className="mootro-h4 include" id={theme}>
									<i class="fa-solid fa-yin-yang"></i>
									{`  `}
									Themes Include :
								</div>
								<h6 className="mootro-h5 light" id={theme}>
									1. Light Mode
								</h6>
								<img
									className="theme-img"
									src={lightMode}
								></img>
								<h6 className="mootro-h5 purple" id={theme}>
									2. Purplicious
								</h6>
								<img className="theme-img" src={purple}></img>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
