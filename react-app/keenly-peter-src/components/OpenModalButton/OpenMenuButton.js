import React from "react";
import { useMenuModal } from "../../context/MenuModal";
import "./OpenModalButton.css";

export default function OpenMenuButton({ modalComponent, buttonText, onButtonClick, onModalClose, icon }) {
    const { setMenuContent, setOnMenuClose } = useMenuModal();

    const onClick = () => {
        if (typeof onButtonClick === "function") onButtonClick();
        if (typeof onModalClose === "function") setOnMenuClose(onModalClose);

        setMenuContent(modalComponent);
    }

    const buttonClass = buttonText.replace(/\s/g,"");

    return (
        <div className="OpenModalButton-container">
            <button
                onClick={onClick}
                className={`OpenModalButton-button ${buttonClass}`}
            >
                <i className="fa-sharp fa-solid fa-bars hamburger Navigation-hamburger"></i>
            </button>
        </div>
    )
}
