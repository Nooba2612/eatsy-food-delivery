import React from "react";
import classNames from "classnames/bind";

import { colors } from "@mui/material";

import { Container } from "@mui/material";
import styles from "./BestSeller.module.css";
import { topten } from "src/assets/assets";
// import todaysale from "@assets/images/food_10.png";

const cx = classNames.bind(styles);

function BestSeller() {
  // const carousel = document.querySelector('.carousel');

  // let isDown = false;
  // let startX;
  // let scrollLeft;

  // carousel.addEventListener('mousedown', (e) => {
  //     isDown = true;
  //     startX = e.pageX - carousel.offsetLeft;
  //     scrollLeft = carousel.scrollLeft;
  // });

  // carousel.addEventListener('mouseleave', () => {
  //     isDown = false;
  // });

  // carousel.addEventListener('mouseup', () => {
  //     isDown = false;
  // });

  // carousel.addEventListener('mousemove', (e) => {
  //     if (!isDown) return;  // Nếu không nhấn chuột, dừng thao tác kéo
  //     e.preventDefault();
  //     const x = e.pageX - carousel.offsetLeft;
  //     const walk = (x - startX) * 3; // Điều chỉnh tốc độ kéo bằng cách thay đổi giá trị nhân
  //     carousel.scrollLeft = scrollLeft - walk;
  // });

  return (
    <div className={cx("wrapper")}>
      <Container maxWidth="lg">
        <div className={cx("title")}>
          <h1>Best Seller Foods </h1>

          <h6>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel,
            similique ducimus.
          </h6>
        </div>
        <div className={cx("carousel")}>
          {topten.map((item, index) => {
            return (
              <li key={index} className={cx("card")}>
                <div className={cx("content-item")}>
                  <div className={cx("image")}>
                    <img src={item.image} alt="food" />
                  </div>
                  <h2>{item.Name}</h2>
                  <h6>{item.decription}</h6>
                  <h3 className={cx("red-text")}>$ {item.price}</h3>
                  <a href="#" className={cx("order-button")}>
                    Add To Cart
                  </a>
                </div>
              </li>
            );
          })}
        </div>
      </Container>

      {/* Best Offer Today */}

      <Container maxWidth="lg">
        <div className={cx("title")}>
          <h1>TODAY BEST OFFER</h1>
          <h6>Lorem ipsum dolor sit amet consecteturr, vitae illum?</h6>
        </div>

        <div className={cx("offer-today")}>
          <div className={cx("table")}>
            <table>
              <tr>
                <td className={cx("column-l")}>
                  <h3>Rainbow Sushi</h3>
                  <h6>
                    Lorem ips jja jjsd kide eidei djedoe diediedn jedne jedne
                    architecto quibusdam nulla.
                  </h6>
                </td>
                <td className={cx("red-text")}>$59.00</td>
              </tr>

              <tr>
                <td className={cx("column-l")}>
                  <h3>Rainbow Sushi</h3>
                  <h6>
                    Lorem ips jja jjsd kide eidei djedoe diediedn jedne jedne
                    architecto quibusdam nulla.
                  </h6>
                </td>
                <td className={cx("red-text")}>$59.00</td>
              </tr>

              <tr>
                <td className={cx("column-l")}>
                  <h3>Rainbow Sushi</h3>
                  <h6>
                    Lorem ips jja jjsd kide eidei djedoe diediedn jedne jedne
                    architecto quibusdam nulla.
                  </h6>
                </td>
                <td className={cx("red-text")}>$59.00</td>
              </tr>

              <tr>
                <td className={cx("column-l")}>
                  <h3>Rainbow Sushi</h3>
                  <h6>
                    Lorem ips jja jjsd kide eidei djedoe diediedn jedne jedne
                    architecto quibusdam nulla.
                  </h6>
                </td>
                <td className={cx("red-text")}>$59.00</td>
              </tr>
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
