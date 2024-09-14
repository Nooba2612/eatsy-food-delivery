import React, { useState } from "react";
import classNames from "classnames/bind";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

import { Container } from "@mui/material";
import styles from "./BestSeller.module.css";
import { topten } from "@assets/assets";
import { set } from "lodash";

const cx = classNames.bind(styles);

function BestSeller() {
  const [cardsArray, setCardsArray] = useState(topten);
  const [translateX, setTranslateX] = useState(0);

  const carouselRef = useRef(null);

  const handleNextBtnClick = () => {
    setTranslateX(translateX - 110);
    topten.push(topten[0]);
    topten.push(topten[1]);
    setCardsArray([...topten]);
    setTimeout(() => {
      topten.shift();
      topten.shift();
    }, 300);
  };

  const handlePreviousBtnClick = () => {};

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

        <div className={cx("box")}>
          <button
            className={cx("button-left")}
            onClick={handlePreviousBtnClick}
          >
            <ChevronLeft />
          </button>
          <div className={cx("carousel")} ref={carouselRef}>
            {cardsArray.map((card, index) => {
              return (
                <li
                  key={index}
                  style={{ transform: `translateX(${translateX}%)` }}
                  className={cx("card")}
                >
                  <div className={cx("content-item")}>
                    <div className={cx("image")}>
                      <img src={card.image} alt="food" />
                    </div>
                    <h2>{card.Name}</h2>
                    <h6>{card.decription}</h6>
                    <h3 className={cx("red-text")}>$ {card.price}</h3>
                    <a href="#" className={cx("order-button")}>
                      Add To Cart
                    </a>
                  </div>
                </li>
              );
            })}
          </div>
          <button className={cx("button-right")} onClick={handleNextBtnClick}>
            <ChevronRight />
          </button>
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
