import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { Container } from "@mui/material";

import styles from "./Home.module.css";
import { BestSeller } from "@components/index";


const cx = classNames.bind(styles);

function Home() {
    const [isAppear, setIsAppear] = useState(false);

    const lazyLoading = (e) => {
        if (e.currentTarget.scrollY >= 300) {
            setIsAppear(true);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", lazyLoading);
        return () => {};
    }, []);

    return (
        <div className={cx("home")}>
            <div
                className={cx("banner")}
                style={{
                    backgroundImage: `url(${require("@images/banner/banner.png")})`,
                    backgroundSize: "cover",
                }}
            >
                <Container maxWidth="lg">
                    <h1>
                        Be The Fastest In <br />
                        Delivery Your <span>Food</span>
                    </h1>
                    <h6>
                        Lorem ipsum, dolor sit amet consur adiing elit. Rendis quos repeat minus quia quaerat tenetur.
                    </h6>
                    <button>Get Order</button>
                </Container>
            </div>
            <Container maxWidth="lg">
                <div className={cx("serve")}>
                    <div className={cx("title")}>
                        <h3>How it works</h3>
                    </div>
                    <div className={cx("info")}>
                        <div className={cx("box")}>
                            <div className={cx("icon", { flyin_y_1: isAppear })}>
                                <img src={require("@images/home_icon/order.png")} />
                            </div>
                            <h1 className={cx({ flyin_x_1: isAppear })}>Easy to order</h1>
                            <h5 className={cx({ flyin_x_1: isAppear })}>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, quaerat
                                necessitatibus?
                            </h5>
                        </div>

                        <div className={cx("box")}>
                            <div className={cx("icon", { flyin_y_2: isAppear })}>
                                <img src={require("@images/home_icon/delivery.png")} />
                            </div>
                            <h1 className={cx({ flyin_x_2: isAppear })}>Fastest Delivery</h1>
                            <h5 className={cx({ flyin_x_2: isAppear })}>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, quaerat
                                necessitatibus?
                            </h5>
                        </div>

                        <div className={cx("box")}>
                            <div className={cx("icon", { flyin_y_3: isAppear })}>
                                <img src={require("@images/home_icon/order.png")} />
                            </div>
                            <h1 className={cx({ flyin_x_3: isAppear })}>Best Quality</h1>
                            <h5 className={cx({ flyin_x_3: isAppear })}>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, quaerat
                                necessitatibus?
                            </h5>
                        </div>
                    </div>
                </div>
            </Container>
            <BestSeller />
            <div className={cx("menu")}></div>
            <div className={cx("discount")}></div>
        </div>
    );
}

export default Home;
