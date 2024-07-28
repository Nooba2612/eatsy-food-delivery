import React from "react";
import Authentication from "@components/Authentication";

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
} from "@pages/index";

const { createBrowserRouter } = require("react-router-dom");

const publicRoutes = [
    {
        path: "/",
        element: <Home />,
        errorElement: <Error />,
    },
    {
        path: "/about",
        element: <About />,
    },
    {
        path: "/login",
        element: <Login />,
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
];

const privateRoutes = [
    {
        path: "/",
        element: <Authentication />,
        children: [
            {
                path: "/dashboard",
                element: <Dashboard />,
            },
            {
                path: "/cart",
                element: <Cart />,
            },
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
        ],
    },
];

const router = createBrowserRouter([...publicRoutes, ...privateRoutes]);

export default router;
