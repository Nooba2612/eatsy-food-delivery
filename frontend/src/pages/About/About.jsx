import React from "react";
import styles from "./About.module.css";
import classNames from "classnames/bind";
import { Container } from "@mui/material";
import { Height } from "@mui/icons-material";

const cx = classNames.bind(styles);

function About() {
  return(
  <Container maxWidth="lg"   className={cx("container")}>
    <div>
      <h1 className={"titlePrimary"}>About Us</h1>
      <div >
      <div className={cx("imgRotation")}>
        <img src={require("@images/product/product1.png")} alt="" />
      </div>
      <div className={cx("textContent")}>
      <br/>
        <h1>Variety Of Flavours From Vietnamese Cuisine</h1>
        <p>It is a long established fact that a reader will be distracted the readable content of a page when looking at layout the point established fact that</p>
      </div>
      <div className={cx("textContent")}>
      <br/>
      <h1>Variety Of Flavours From Vietnamese Cuisine</h1>
      <p>It is a long established fact that a reader will be distracted the readable content of a page when looking at layout the point established fact that</p>
      </div>
      <div className={cx("imgRotation2")}>
      <img src={require("@images/product/product2.png")} alt="" />
        
      </div>
      </div>
            <div >
      </div>
      <div>
        <h1>Our Story</h1>
      </div>
    </div>
  </Container>

  );
}

export default About;
