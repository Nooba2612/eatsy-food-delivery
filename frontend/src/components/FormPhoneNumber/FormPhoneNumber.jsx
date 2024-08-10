import React, { useState, useEffect, memo } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import classNames from "classnames/bind";
import { ExpandMore } from "@mui/icons-material";
import { Checkbox, Divider } from "@mui/material";
import { useGoogleLogin } from "@react-oauth/google";

import styles from "@pages/Login/Login.module.css";
import countryService from "@services/countryService";
import useLoading from "@hooks/useLoading";
import { regexNumbers, regexVietnamPhoneNumber } from "@constants/constants";
import useDebounce from "@hooks/useDebounce";

const cx = classNames.bind(styles);

function FormPhoneNumber() {
    const { register, handleSubmit } = useForm();
    const [countries, setCountries] = useState([]);
    const [phoneNumberValue, setPhoneNumberValue] = useState();
    const [currentCountry, setCurrentCountry] = useState({
        name: "Việt Nam",
        flags: {
            png: "https://flagcdn.com/w320/vn.png",
        },
        idd: {
            root: "+8",
            suffixes: "4",
        },
        caa3: "VNM",
    });
    const [isOpenDropdown, setIsOpenDropdown] = useState(false);
    const [alertMessage, setAlertMessage] = useState();
    const [isValidForm, setIsValidForm] = useState(false);
    const { setLoading } = useLoading();
    const phoneNumberValueDebounced = useDebounce(phoneNumberValue, 1000);

    const handleCountryChange = (e) => {
        countries.forEach((country) => {
            if (country.cca3 === e.currentTarget.getAttribute("data-option-value")) {
                setCurrentCountry(country);
            }
        });
    };

    const handleOnlyInputNumber = (e) => {
        e.currentTarget.value = e.currentTarget.value.replace(regexNumbers, "");
    };

    const handleValidatePhoneInput = (e) => {
        handleOnlyInputNumber(e);
        setPhoneNumberValue(e.currentTarget.value);

        if (phoneNumberValueDebounced?.length <= 0) {
            setAlertMessage("Số điện thoại không được bỏ trống.");
        } else if (!regexVietnamPhoneNumber.test(phoneNumberValueDebounced)) {
            setAlertMessage("Số điện thoại không hợp lệ.");
        } else {
            setAlertMessage();
            setIsValidForm(true);
        }
    };

    const googleLogin = useGoogleLogin({
        onSuccess: (codeResponse) => console.log(codeResponse),
        flow: "auth-code",
    });

    const onSubmit = async (data) => {
        const formData = {
            country: {
                countryName: data?.countryName || "",
                countryCaa3: data?.countryCaa3 || "",
                countryCode: data?.countryCode || "",
            },
            phone: data?.phone || "",
            memorizedLogin: data?.memorizedLogin || false,
        };

        console.log(formData);

        axios
            .post(`${process.env.REACT_APP_SERVER_BASE_URL}/login`, formData)
            .then((res) => {
                setLoading(true);
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const data = await countryService.getAll();
                const defaultCountry = data[167];
                setCountries(data);
                setCurrentCountry(defaultCountry); // default country
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchCountries();

        return;
    }, [setLoading]);

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={cx("title")}>
                    <h1>Đăng nhập</h1>
                    <h4>Nhập số điện thoại của bạn</h4>
                    <div className={cx("phone-input-wrapper")}>
                        <div
                            className={cx("country-selection")}
                            aria-describedby={"country-selection"}
                            onClick={() => setIsOpenDropdown((prevState) => !prevState)}
                        >
                            <input
                                className={cx("hidden-input")}
                                {...register("countryName")}
                                value={currentCountry?.name || ""}
                            />
                            <input
                                className={cx("hidden-input")}
                                {...register("countryCaa3")}
                                value={currentCountry?.caa3 || ""}
                            />

                            <input
                                className={cx("hidden-input")}
                                {...register("countryCode")}
                                value={currentCountry?.idd.root + currentCountry?.idd.suffixes || ""}
                            />
                            <div className={cx("select-input-content")}>
                                <div
                                    className={cx("flag")}
                                    style={{
                                        backgroundImage: `url(${currentCountry?.flags.png})`,
                                    }}
                                ></div>
                                <ExpandMore className={cx("more-icon", { active: isOpenDropdown })} />

                                <span className={cx("code")}>
                                    {currentCountry?.idd.root + currentCountry?.idd.suffixes || ""}
                                </span>
                            </div>
                            <div
                                id="country-selection"
                                className={cx("dropdown", { open: isOpenDropdown })}
                                name="country-selection"
                            >
                                <div className={cx("dropdown-overlay")}></div>
                                {countries.map((country, index) => (
                                    <div
                                        key={index}
                                        className={cx("option")}
                                        data-option-value={country.cca3}
                                        onClick={handleCountryChange}
                                    >
                                        <div
                                            className={cx("flag")}
                                            style={{
                                                backgroundImage: `url(${country.flags.png})`,
                                            }}
                                        ></div>
                                        <span className={cx("code")} style={{ marginRight: "var(--spacingSmall)" }}>
                                            {country.idd.root + country.idd.suffixes || ""}
                                        </span>
                                        <span className={cx("name")}>{country.name.common}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <input
                            className={cx("phone-input")}
                            type="text"
                            {...register("phone")}
                            onInput={handleValidatePhoneInput}
                            placeholder="0 1 2 3 4 5 6 7 8 9"
                        />
                        <div className={cx("phone-input-alert")}>{alertMessage}</div>
                    </div>
                    <div className={cx("memorized-login-wrapper")}>
                        <Checkbox
                            {...register("memorizedLogin")}
                            size="medium"
                            style={{ color: "var(--primaryColor)" }}
                        />
                        <span className={cx("checkbox-label")}>Ghi nhớ đăng nhập trên thiết bị này.</span>
                    </div>
                    <button
                        type="submit"
                        className={cx("submit-btn", { disabled: !isValidForm })}
                        disabled={!isValidForm}
                    >
                        Tiếp tục
                    </button>
                </div>
            </form>
            <Divider textAlign="center" style={{ opacity: 0.5, fontSize: "var(--fontSizeSmall)", margin: "30px 0" }}>
                hoặc
            </Divider>
            <div className={cx("social-login-buttons-group")}>
                <button type="button" onClick={googleLogin} className={cx("google-login-btn")}>
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
        </>
    );
}

export default memo(FormPhoneNumber);