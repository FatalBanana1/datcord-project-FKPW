import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { useModal } from "../../context/Modal.js";


import "./Mootro.css"


export default function MootroModal(user) {

	const dispatch = useDispatch();
	const { closeModal } = useModal();


    // ADD MOOTRO FUNCTION

    const addMootro = () => {
        //// ADD FUNCTION
    }

    const cancelMootro = () => {
        /// REMOVE FUNCTION
    }



    return (
		<>
			<div className="mootro-member-card" id={theme}>
				<div id="mootro-card-header" style={style}></div>
				<div className="mootro-card-content">
					<div className="mootro-member-header">
						<img
							className="card-img"
							id={theme}
							src="../assets/mootro.png"
						></img>
                        {user.mootro === "mootro" ? (
							<button
                            type="submit"
                            id={theme}
                            className="cancel-mootro-button"
                            onClick={cancelMootro}
                        >
                            Cancel Mootro
                        </button>
						) : (
							<button
                            type="submit"
                            id={theme}
                            className="get-mootro-button"
                            onClick={addMootro}
                        >
                            Get Mootro
                        </button>
						)}
					</div>
					<div className="card-member-info" id={theme}>
						<div className="card-member-inner-div">
							<div className="member-nickName-div" id={theme}>
                                <div className="member-nickname-container">
                                    <h4
                                        className="member-nickname"
                                        id={theme}>
                                        Get Datcord Mootro
                                    </h4>
                                </div>
							</div>
							<div className="member-since-section">
								<h4 className="member-h4" id={theme}>
									Acess all of our amazing themes!
								</h4>
							</div>
							<div className="role-section">
								<h4 className="member-h4" id={theme}>
									Themes Include:
								</h4>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);

}
