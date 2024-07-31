import { Body, Footer, Header } from "@components/index";
import React from "react";
import { Outlet } from "react-router-dom";

function DefaultLayout() {
    return (
        <>
            <Header />
            <Outlet />                                              
            <Footer />
        </>
    );
}

export default DefaultLayout;
