import React, { Fragment, useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { Input as BaseInput } from "@mui/base/Input";
import { Box, styled } from "@mui/system";
import { Container } from "@mui/material";
import axios from "axios";
import classNames from "classnames/bind";

import useLoading from "@hooks/useLoading";
import { regexNumbers } from "@constants/constants";
import styles from "@pages/Login/Login.module.css";

const cx = classNames.bind(styles);

function OTP({ separator, length, value, onChange }) {
    const inputRefs = useRef(new Array(length).fill(null));

    const handleOnlyInputNumber = (e) => {
        e.currentTarget.value = e.currentTarget.value.replace(regexNumbers, "");
    };

    const focusInput = (targetIndex) => {
        const targetInput = inputRefs.current[targetIndex];
        targetInput.focus();
    };

    const selectInput = (targetIndex) => {
        const targetInput = inputRefs.current[targetIndex];
        targetInput.select();
    };

    const handleKeyDown = (event, currentIndex) => {
        switch (event.key) {
            case "ArrowUp":
            case "ArrowDown":
            case " ":
                event.preventDefault();
                break;
            case "ArrowLeft":
                event.preventDefault();
                if (currentIndex > 0) {
                    focusInput(currentIndex - 1);
                    selectInput(currentIndex - 1);
                }
                break;
            case "ArrowRight":
                event.preventDefault();
                if (currentIndex < length - 1) {
                    focusInput(currentIndex + 1);
                    selectInput(currentIndex + 1);
                }
                break;
            case "Delete":
                event.preventDefault();
                onChange((prevOtp) => {
                    const otp = prevOtp.slice(0, currentIndex) + prevOtp.slice(currentIndex + 1);
                    return otp;
                });

                break;
            case "Backspace":
                event.preventDefault();
                if (currentIndex > 0) {
                    focusInput(currentIndex - 1);
                    selectInput(currentIndex - 1);
                }

                onChange((prevOtp) => {
                    const otp = prevOtp.slice(0, currentIndex) + prevOtp.slice(currentIndex + 1);
                    return otp;
                });
                break;

            default:
                break;
        }
    };

    const handleChange = (event, currentIndex) => {
        const currentValue = event.target.value;
        let indexToEnter = 0;

        while (indexToEnter <= currentIndex) {
            if (inputRefs.current[indexToEnter].value && indexToEnter < currentIndex) {
                indexToEnter += 1;
            } else {
                break;
            }
        }
        onChange((prev) => {
            const otpArray = prev.split("");
            const lastValue = currentValue[currentValue.length - 1];
            otpArray[indexToEnter] = lastValue;
            return otpArray.join("");
        });
        if (currentValue !== "") {
            if (currentIndex < length - 1) {
                focusInput(currentIndex + 1);
            }
        }
    };

    const handleClick = (event, currentIndex) => {
        selectInput(currentIndex);
    };

    const handlePaste = (event, currentIndex) => {
        event.preventDefault();
        const clipboardData = event.clipboardData;

        // Check if there is text data in the clipboard
        if (clipboardData.types.includes("text/plain")) {
            let pastedText = clipboardData.getData("text/plain");
            pastedText = pastedText.substring(0, length).trim();
            let indexToEnter = 0;

            while (indexToEnter <= currentIndex) {
                if (inputRefs.current[indexToEnter].value && indexToEnter < currentIndex) {
                    indexToEnter += 1;
                } else {
                    break;
                }
            }

            const otpArray = value.split("");

            for (let i = indexToEnter; i < length; i += 1) {
                const lastValue = pastedText[i - indexToEnter] ?? " ";
                otpArray[i] = lastValue;
            }

            onChange(otpArray.join(""));
        }
    };

    return (
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            {new Array(length).fill(null).map((_, index) => (
                <Fragment key={index}>
                    <BaseInput
                        slots={{
                            input: InputElement,
                        }}
                        aria-label={`Digit ${index + 1} of OTP`}
                        slotProps={{
                            input: {
                                ref: (ele) => {
                                    inputRefs.current[index] = ele;
                                },
                                onKeyDown: (event) => handleKeyDown(event, index),
                                onChange: (event) => handleChange(event, index),
                                onClick: (event) => handleClick(event, index),
                                onPaste: (event) => handlePaste(event, index),
                                onInput: (event) => handleOnlyInputNumber(event),
                                value: value[index] ?? "",
                            },
                        }}
                    />
                    {index === length - 1 ? null : separator}
                </Fragment>
            ))}
        </Box>
    );
}

OTP.propTypes = {
    length: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    separator: PropTypes.node,
    value: PropTypes.string.isRequired,
};

function FormOTP() {
    const [otp, setOtp] = useState("");
    const { setLoading } = useLoading();

    useEffect(() => {
        try {
            axios
                .post(`${process.env.REACT_APP_SERVER_BASE_URL}/login`, otp)
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
        } catch (error) {
            console.log(error);
        }

        return () => {};
    }, [otp, setLoading]);

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: 2,
                marginTop: "100px",
            }}
        >
            <div className={cx("title")}>
                <h1>Xác minh OTP</h1>
                <h6>Nhập mã gồm 6 chữ số mà chúng tôi đã gửi đến +84 0328906284. Hết hạn sau 90 giây.</h6>
            </div>
            <OTP separator={<span></span>} value={otp} onChange={setOtp} length={6} />
            <button type="button"></button>
        </Box>
    );
}

const blue = {
    100: "#DAECFF",
    200: "#80BFFF",
    400: "#3399FF",
    500: "#007FFF",
    600: "#0072E5",
    700: "#0059B2",
};

const grey = {
    50: "#F3F6F9",
    100: "#E5EAF2",
    200: "#DAE2ED",
    300: "#C7D0DD",
    400: "#B0B8C4",
    500: "#9DA8B7",
    600: "#6B7A90",
    700: "#434D5B",
    800: "#303740",
    900: "#1C2025",
};

const InputElement = styled("input")(
    ({ theme }) => `
  width: 40px;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: var(--fontSizeBase);
  font-weight: var(--fontWeightBold);
  line-height: 1.5;
  padding: 15px 0px;
  border-radius: var(--borderRadiusMedium);
  text-align: center;
  color: ${theme.palette.mode === "dark" ? grey[300] : "var(--blackColor)"};
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : "var(--borderColor)"};
  box-shadow: 0px 2px 4px ${theme.palette.mode === "dark" ? "rgba(0,0,0, 0.5)" : "rgba(0,0,0, 0.05)"};

  &:hover {
    border-color: var(--primaryColor);
  }

  &:focus {
    border-color: var(--primaryColor);
    box-shadow: 0 0 0 3px ${theme.palette.mode === "dark" ? blue[600] : "var(--primaryColor)"};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`,
);

export default FormOTP;
