import React from "react";
import classNames from "classnames/bind";

import styles from "./Home.module.css";

const cx = classNames.bind(styles);

function Home() {
    return <div className={cx("background")}></div>;
}

export default Home;
