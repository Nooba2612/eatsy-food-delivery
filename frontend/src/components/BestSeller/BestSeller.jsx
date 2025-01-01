import React, { useState } from "react";
import classNames from "classnames/bind";
import { Container } from "@mui/material";

import styles from "./BestSeller.module.css";
import { topten } from "@assets/assets";
import { Carousel } from "@components/index";

const cx = classNames.bind(styles);

function BestSeller() {
    const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return (
        <div className={cx("wrapper")}>
            <Container maxWidth="lg">
                <div className={cx("title")}>
                    <h1>Best Seller Foods </h1>
                    <h6>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, similique ducimus.</h6>
                </div>

                <Carousel items={items} active={0} />
            </Container>

            {/* Best Offer Today */}

            <Container maxWidth="lg">
                <div className={cx("title")}>
                    <h1>Today Best Offers</h1>
                    <h6>Lorem ipsum dolor sit amet consecteturr, vitae illum?</h6>
                </div>

                <div className={cx("offer-today")}>
                    <div className={cx("table")}>
                        <table>
                            <tbody>
                                <tr>
                                    <td className={cx("column-l")}>
                                        <h3>Rainbow Sushi</h3>
                                        <h6>
                                            Lorem ips jja jjsd kide eidei djedoe diediedn jedne jedne architecto
                                            quibusdam nulla.
                                        </h6>
                                    </td>
                                    <td className={cx("red-text")}>$59.00</td>
                                </tr>

                                <tr>
                                    <td className={cx("column-l")}>
                                        <h3>Rainbow Sushi</h3>
                                        <h6>
                                            Lorem ips jja jjsd kide eidei djedoe diediedn jedne jedne architecto
                                            quibusdam nulla.
                                        </h6>
                                    </td>
                                    <td className={cx("red-text")}>$59.00</td>
                                </tr>

                                <tr>
                                    <td className={cx("column-l")}>
                                        <h3>Rainbow Sushi</h3>
                                        <h6>
                                            Lorem ips jja jjsd kide eidei djedoe diediedn jedne jedne architecto
                                            quibusdam nulla.
                                        </h6>
                                    </td>
                                    <td className={cx("red-text")}>$59.00</td>
                                </tr>

                                <tr>
                                    <td className={cx("column-l")}>
                                        <h3>Rainbow Sushi</h3>
                                        <h6>
                                            Lorem ips jja jjsd kide eidei djedoe diediedn jedne jedne architecto
                                            quibusdam nulla.
                                        </h6>
                                    </td>
                                    <td className={cx("red-text")}>$59.00</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className={cx("today-img")}>
                        <img src={topten[6].image} alt="Food Image" />
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default BestSeller;
