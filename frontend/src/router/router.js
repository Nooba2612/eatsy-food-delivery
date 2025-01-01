import React from "react";
import { createBrowserRouter } from "react-router-dom";

import {
    Home,
    Error,
    About,
    Cart,
    Chat,
    Checkout,
    Dashboard,
    Login,
    Menu,
    Order,
    Profile,
    RestaurantList,
    Search,
    Merchant,
    MerchantManage,
    Contact,
    Offers,
} from "@pages/index";
import { Authentication, LoginStatus } from "@components/index";
import DefaultLayout from "@layouts/DefaultLayout";

const publicRoutes = [
    {
        path: "/",
        element: <DefaultLayout />,
        errorElement: <Error />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/about",
                element: <About />,
            },

            {
                path: "/search",
                element: <Search />,
            },
            {
                path: "/restaurants",
                element: <RestaurantList />,
            },
            {
                path: "/menu",
                element: <Menu />,
            },
            {
                path: "/contact",
                element: <Contact />,
            },
            {
                path: "/offers",
                element: <Offers />,
            },
        ],
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/login/status",
        element: <LoginStatus />,
    },
];

const privateRoutes = [
    {
        path: "/",
        element: (
            <Authentication>
                <DefaultLayout />
            </Authentication>
        ),
        children: [
            {
                path: "/dashboard",
                element: <Dashboard />,
            },
            // {
            //     path: "/cart",
            //     element: <Cart />,
            // },
            {
                path: "/checkout",
                element: <Checkout />,
            },
            {
                path: "/merchant",
                element: <Merchant />,
            },
            {
                path: "/merchant/manage",
                element: <MerchantManage />,
            },
            {
                path: "/profile",
                element: <Profile />,
            },
            {
                path: "/chat",
                element: <Chat />,
            },
            {
                path: "/order",
                element: <Order />,
            },
        ],
    },
    {
        path: "/cart",
        element: <DefaultLayout />,
        children: [
            {
                path: "",
                element: <Cart />,
            },
        ],
    },
];

const router = createBrowserRouter([...publicRoutes, ...privateRoutes]);

export default router;
