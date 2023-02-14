import React from 'react';
import { useModal } from '../../context/Modal';
import "./OpenModalButton.css";

function OpenModalButton({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (onButtonClick) onButtonClick();
  };

  if (buttonText === "Create-Channel") {
    // console.log("button text");
    return (
      <button
        onClick={onClick}
        className={`OpenModalButton-button ${buttonText}`}
      >
        <i className="fa-solid fa-plus align-right"></i>
      </button>
    );
  }

  if (buttonText === "Create-Server") {
    return (
      <div
        role="button"
        onClick={onClick}
        className={`OpenModaldiv-button ${buttonText}`}
      >
        <div className="ServerNav-icons">
          <i className="fa-solid fa-plus"></i>
        </div>
      </div>
    );
  }

  if (buttonText === "Edit-Channel") {
    return (
      <button onClick={onClick}
        className={`OpenModalButton-button ${buttonText}`}
      >
        <i className="fa-solid fa-gear"></i>
      </button>
    )
  }

  return (
    <button onClick={onClick}>{buttonText}</button>
  );
}

export default OpenModalButton;
