import React, {  } from "react";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { CopyrightRounded } from "@mui/icons-material";
import { Container } from "@mui/material";

import styles from "./Login.module.css";
import { FormPhoneNumber, FormOTP } from "@components/index";

const cx = classNames.bind(styles);

function Login() {
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
                    <div className="login-form">{<FormOTP />}</div>
                </Container>
            </div>
            <footer>
                <CopyrightRounded /> <span>Bản quyền thuộc về Eatsy {new Date().getFullYear()}.</span>
            </footer>
        </>
    );
}

export default Login;
