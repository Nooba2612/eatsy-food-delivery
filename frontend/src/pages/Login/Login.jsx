import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { Box, Checkbox, Container, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import { CopyrightRounded, ExpandMore, Margin } from "@mui/icons-material";

import styles from "./Login.module.css";
import { Footer, Header } from "@components/index";
import countryService from "@services/countryService";

const cx = classNames.bind(styles);

function Login() {
    const [countries, setCountries] = useState([]);
    const [currentCountry, setCurrentCountry] = useState();
    const [loading, setLoading] = useState(true);
    const [isOpenCheckboxDropdown, setIsOpenCheckboxDropdown] = useState(false);
    const [alertMessage, setAlertMessage] = useState();

    const handleCountryChange = (e) => {
        setCurrentCountry(e.target.value);
    };

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const data = await countryService.getAll();
                console.log(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        // fetchCountries();
    }, []);

    return (
        <>
            <header className={cx("header")}>
                <Container maxWidth="lg">
                    <div className={cx("logo")}>
                        <Link to={"/"}>Eatsy</Link>
                    </div>
                </Container>
            </header>
            <div className={cx("content")}>
                <Container maxWidth="xs">
                    <div className="login-form">
                        <form action="/login" method="post">
                            <div className={cx("title")}>
                                <h1>Đăng nhập</h1>
                                <h4>Nhập số điện thoại của bạn</h4>
                                <div className={cx("phone-input-wrapper")}>
                                    <div className={cx("country-selection")}>
                                        <select className={cx("hidden-input")} name="country" id="country"></select>
                                        <div className={cx("select-input-content")}>
                                            <div
                                                className={cx("flag")}
                                                style={{
                                                    backgroundImage: `url(${require("@images/country-flags.png")})`,
                                                }}
                                            ></div>
                                            <ExpandMore />
                                            {/* <ExpandLess /> */}
                                            <span className={cx("code")}>+84</span>
                                        </div>
                                        <div className={cx("dropdown")} name="country" id="country">
                                            <div className={cx("option")} data-option-value="VN">
                                                <span
                                                    className={cx("flag")}
                                                    style={{
                                                        backgroundImage: `url(${require("@images/country-flags.png")})`,
                                                    }}
                                                ></span>
                                                <span className={cx("code")}>+84</span>
                                                <span className={cx("name")}>Việt Nam</span>
                                            </div>
                                        </div>
                                    </div>
                                    <input type="tel" id="phone-input" placeholder="0 1 2 3 4 5 6 7 8 9" />
                                    <div className={cx("phone-input-alert")}>{alertMessage}</div>
                                </div>
                                <div className={cx("memorized-login-wrapper")}>
                                    <Checkbox
                                        value={"memorized-login"}
                                        size="medium"
                                        style={{ color: "var(--primaryColor)" }}
                                    />
                                    <span className={cx("checkbox-label")}>Ghi nhớ đăng nhập trên thiết bị này.</span>
                                </div>
                                <button type="submit" className={cx("submit-btn")}>
                                    Tiếp tục
                                </button>
                            </div>
                        </form>
                        <Divider
                            textAlign="center"
                            style={{ opacity: 0.5, fontSize: "var(--fontSizeSmall)", margin: "30px 0" }}
                        >
                            hoặc
                        </Divider>
                        <div className={cx("social-login-buttons-group")}>
                            <button type="button" className={cx("google-login-btn")}>
                                <div
                                    className={cx("logo")}
                                    style={{ backgroundImage: `url(${require("@images/logos/google-logo.webp")})` }}
                                ></div>
                                <span>Tiếp tục với Google</span>
                            </button>
                            <button type="button" className={cx("facebook-login-btn")}>
                                <div
                                    className={cx("logo")}
                                    style={{ backgroundImage: `url(${require("@images/logos/facebook-logo.webp")})` }}
                                ></div>
                                <span>Tiếp tục với Facebook</span>
                            </button>
                            <button type="button" className={cx("apple-login-btn")}>
                                <div
                                    className={cx("logo")}
                                    style={{ backgroundImage: `url(${require("@images/logos/apple-logo.png")})` }}
                                ></div>
                                <span>Tiếp tục với Apple</span>
                            </button>
                        </div>
                    </div>
                </Container>
            </div>
            <footer>
                <CopyrightRounded /> <span>Bản quyền thuộc về Eatsy {new Date().getFullYear()}.</span>
            </footer>
        </>
    );
}

export default Login;
