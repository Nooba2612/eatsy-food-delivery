import React from "react";
import { Outlet } from "react-router-dom";

import { Body, Footer, Header } from "@components/index";
import useLoading from "@hooks/useLoading";

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
