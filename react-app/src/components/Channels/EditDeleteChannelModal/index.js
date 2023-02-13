import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal.js";

export default function EditDeleteChannelModal({ categoryName, prevName, serverId }) {
    return (
        <div className="EditDeleteChannelModal-container">
            <div className="EditDeleteChannelModal-left">
                <div className="EditDeleteChannelModal-nav">
                    <p className="EditDeleteChannelModal-nav-header"># {category}</p>
                </div>
            </div>
            <div className="EditDeleteChannelModal-right">
                right
            </div>
        </div>
    )
}
