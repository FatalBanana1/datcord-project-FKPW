import React, { useContext, useRef, useState } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

const MenuContext = React.createContext();

export function MenuModalProvider({ children }) {
    const menuRef = useRef();
    const [menuContent, setMenuContent] = useState(null);
    const [onMenuClose, setOnMenuClose] = useState(null);

    const closeMenu = () => {
        setMenuContent(null);

        if (typeof onMenuClose === "function") {
            setOnMenuClose(null);
            onMenuClose();
        }
    }

    const contextValue = {
        menuRef,
        menuContent,
        setMenuContent,
        setOnMenuClose,
        closeMenu
    };

    return (
        <div className="ModalProvider">
            <MenuContext.Provider value={contextValue}>
                { children }
            </MenuContext.Provider>
            <div ref={menuRef} />
        </div>
    )
}

export function MenuModal() {
    const { menuRef, menuContent, closeMenu } = useContext(MenuContext);

    if (!menuRef || !menuRef.current || !menuContent) return null;

    return ReactDOM.createPortal(
        <div id="menu-modal">
            <div id="menu-modal-background" onClick={closeMenu} />
            <div id="menu-modal-content">
                {menuContent}
            </div>
        </div>,
        menuRef.current
    )
}

export const useMenuModal = () => useContext(MenuContext);
