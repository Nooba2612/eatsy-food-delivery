import React from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

import useAuth from "@hooks/useAuth";

function Authentication({ children }) {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return children;
}

export default Authentication;

Authentication.propTypes = {
    children: PropTypes.element,
};
