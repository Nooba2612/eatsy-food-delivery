import { useSelector, useDispatch } from "react-redux";

import { login, logout } from "@features/auth/authSlice";
const useAuth = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const dispatch = useDispatch();

    const handleLogin = () => {
        dispatch(login());
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    return {
        isAuthenticated,
        login: handleLogin,
        logout: handleLogout,
    };
};

export default useAuth;
