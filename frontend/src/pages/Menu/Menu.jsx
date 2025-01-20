import React from 'react'
import classNames from "classnames/bind";
import styles from "./Menu.module.css";
import { Container } from "@mui/material";


const cx = classNames.bind(styles);

function Menu() {
  return (
    <div >
    <div className={cx("m100")} >
      <Container>
      <h1>Menu</h1>
      </Container>
    </div>
  
    </div>
  )
}

export default Menu