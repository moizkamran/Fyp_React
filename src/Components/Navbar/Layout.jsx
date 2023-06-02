import CustomNavbar from "./CustomNavbar";
import React from "react";

const Layout = ({ children }) => {
    return (
        <>
            <CustomNavbar />
            {children}
        </>
    );
};

export default Layout;
