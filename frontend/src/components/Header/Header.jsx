import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { DarkMode, Search, Login, ShoppingCart, LightMode } from "@mui/icons-material";
import { Avatar, Box, Container } from "@mui/material";

import styles from "./Header.module.css";
import useAuth from "@hooks/useAuth";
import { getFirstLetterOfEachWord } from "@helpers/stringHelper";
import { getUserInfo } from "@helpers/cookieHelper";

const cx = classNames.bind(styles);

function Header() {
    const [backgroundColor, setBackgroundColor] = useState("var(--backgroundColor)");
    const [activeKey, setActiveKey] = useState("1");
    const [darkMode, setDarkmode] = useState(false);
    const { isAuthenticated } = useAuth();
    const user = getUserInfo();

    const handleChangeModeBtnClick = () => {
        setDarkmode((prevMode) => !prevMode);
        if (darkMode) {
            document.body.classList.remove("dark-mode");
            document.body.classList.add("light-mode");
        } else {
            document.body.classList.add("dark-mode");
            document.body.classList.remove("light-mode");
        }
    };

    useEffect(() => {
        // Function to change background color on scroll
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setBackgroundColor("var(--whiteColor)"); // Initial color
            } else {
                setBackgroundColor("var(--backgroundColor)"); // Change to your desired color when scrolled
            }
        };

        // Add the scroll event listener
        window.addEventListener("scroll", handleScroll);

        // Dark mode
        if (darkMode) {
            document.body.classList.add("dark-mode");
            document.body.classList.remove("light-mode");
        } else {
            document.body.classList.remove("dark-mode");
            document.body.classList.add("light-mode");
        }

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className={cx("background")} style={{ backgroundColor: backgroundColor }}>
            <Container maxWidth="lg">
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "30px 0" }}>
                    <div className={cx("logo")}>
                        <Link to={"/"}>Eatsy</Link>
                    </div>
                    <nav className={cx("nav-bar")}>
                        <ul>
                            <li
                                data-nav-index={"1"}
                                onClick={(e) => setActiveKey(e.currentTarget.getAttribute("data-nav-index"))}
                                className={cx({ active: activeKey === "1" ? true : false })}
                            >
                                <Link to={"/"}>Home</Link>
                            </li>
                            <li
                                data-nav-index={"2"}
                                onClick={(e) => setActiveKey(e.currentTarget.getAttribute("data-nav-index"))}
                                className={cx({ active: activeKey === "2" ? true : false })}
                            >
                                <Link to={"/menu"}>Menu</Link>
                            </li>
                            <li
                                data-nav-index={"3"}
                                onClick={(e) => setActiveKey(e.currentTarget.getAttribute("data-nav-index"))}
                                className={cx({ active: activeKey === "3" ? true : false })}
                            >
                                <Link to={"/offers"}>Offers</Link>
                            </li>
                            <li
                                data-nav-index={"4"}
                                onClick={(e) => setActiveKey(e.currentTarget.getAttribute("data-nav-index"))}
                                className={cx({ active: activeKey === "4" ? true : false })}
                            >
                                <Link to={"/about"}>About</Link>
                            </li>
                            <li
                                data-nav-index={"5"}
                                onClick={(e) => setActiveKey(e.currentTarget.getAttribute("data-nav-index"))}
                                className={cx({ active: activeKey === "5" ? true : false })}
                            >
                                <Link to={"/contact"}>Contact</Link>
                            </li>
                        </ul>
                    </nav>
                    <div className={cx("buttons-group")}>
                        <button className={cx("search-btn")}>
                            <Link to={"/search"}>
                                <Search />
                            </Link>
                        </button>
                        <button className={cx("cart-btn")}>
                            <Link to={"/cart"}>
                                <ShoppingCart />
                                <span className={cx("cart-badge")}>0</span>
                            </Link>
                        </button>
                        {isAuthenticated ? (
                            <button className={cx("profile-btn")}>
                                <Avatar
                                    sx={{
                                        fontSize: "var(--fontSizeTiny)",
                                        backgroundColor:
                                            backgroundColor === "var(--whiteColor)"
                                                ? "var(--backgroundColor)"
                                                : "var(--whiteColor)",
                                        color: "var(--blackColor)",
                                        border: "1px solid var(--borderColor)",
                                        fontWeight: "var(--fontWeightBold)",
                                        marginBottom: "10px",
                                        transition: "all 0.2s linear",
                                    }}
                                    {...getFirstLetterOfEachWord(user?.name || "")}
                                    src={user?.avatar || ""}
                                />
                            </button>
                        ) : (
                            <button className={cx("login-btn")}>
                                <Link to={"/login"}>
                                    <Login /> <span>Login</span>
                                </Link>
                            </button>
                        )}
                        <button className={cx("change-mode-btn")} onClick={handleChangeModeBtnClick}>
                            {darkMode ? <LightMode /> : <DarkMode />}
                        </button>
                    </div>
                </Box>
            </Container>
        </div>
    );
}

export default Header;
