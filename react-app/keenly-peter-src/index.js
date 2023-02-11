import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ModalProvider, Modal } from "./context/Modal";
import { MenuModalProvider, MenuModal } from "./context/MenuModal";
import { Provider } from "react-redux";

import "./reset.css";
import MainPage from "./components/MainPage";

function Root() {
    return (
        <ModalProvider>
        <MenuModalProvider>
        {/* <Provider> */}
            <BrowserRouter>
                <App />
                <Modal />
                <MenuModal />
            </BrowserRouter>
        {/* </Provider> */}
        </MenuModalProvider>
        </ModalProvider>
    )
}

ReactDOM.render(
    <React.StrictMode>
        <Root />
    </React.StrictMode>,
    document.getElementById("root")
);
