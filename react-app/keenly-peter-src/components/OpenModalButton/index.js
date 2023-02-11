import React from "react";
import { useModal } from "../../context/Modal";
import { useMenuModal } from "../../context/MenuModal";
import "./OpenModalButton.css";

export default function OpenModalButton({ modalComponent, buttonText, onButtonClick, onModalClose, icon }) {
    const { setModalContent, setOnModalClose } = useModal();
    const { setMenuContent, setOnMenuClose } = useMenuModal();

    const onClick = () => {
        if (typeof onButtonClick === "function") onButtonClick();
        if (typeof onModalClose === "function") setOnModalClose(onModalClose);

        setModalContent(modalComponent);
    }

    const buttonClass = buttonText.replace(/\s/g,"");

    if (icon === "delete") {
        return (
            <button
                onClick={onClick}
                className={`OpenModalButton-button ${buttonClass}`}
            >
                <i className="fa-solid fa-trash icon"></i>
                {buttonText}
            </button>
        )
    } else if (icon === "edit") {
        return (
            <button
                onClick={onClick}
                className={`OpenModalButton-button ${buttonClass}`}
            >
                <i className="fa-regular fa-pen-to-square"></i>
                {buttonText}
            </button>
        )
    } else if (icon === "hamburger") {
        return (
            <button
                onClick={onClick}
                className={`OpenModalButton-button ${buttonClass}`}
            >
                <i className="fa-sharp fa-solid fa-bars hamburger Navigation-hamburger"></i>
            </button>
        )
    }

    return (
        <div className="OpenModalButton-container">
            <button
                onClick={onClick}
                className={`OpenModalButton-button ${buttonClass}`}
            >
                {buttonText}
            </button>
        </div>
    )
}
