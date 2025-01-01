import React, { useState, useLayoutEffect, useCallback, useRef, forwardRef } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import classNames from "classnames/bind";

import styles from "./Carousel.module.css";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

const cx = classNames.bind(styles);

const Carousel = ({ items, active: initialActive, autoCycle = true, cycleInterval = 3000000 }) => {
    const [active, setActive] = useState(initialActive);
    const [direction, setDirection] = useState("");

    // Create an array of refs, one for each item
    const itemRefs = useRef(items.map(() => React.createRef()));

    // Handle automatic cycling (optional)
    useLayoutEffect(() => {
        let cycle;
        if (autoCycle) {
            cycle = setInterval(() => {
                moveRight();
            }, cycleInterval);
        }
        return () => clearInterval(cycle); // Clean up interval on unmount
    }, [autoCycle, cycleInterval]);

    const generateItems = useCallback(() => {
        const elements = [];
        let level;

        for (let i = active - 2; i < active + 3; i++) {
            let index = i;

            if (i < 0) {
                index = (items.length + i) % items.length; // Correct modulo for negative values
            } else if (i >= items.length) {
                index = i % items.length;
            }

            level = active - i;

            elements.push(
                <CSSTransition
                    key={index}
                    classNames={{
                        enter: cx(`${direction}-enter`),
                        enterActive: cx(`${direction}-enter-active`),
                        exit: cx(`${direction}-exit`),
                        exitActive: cx(`${direction}-exit-active`),
                    }}
                    timeout={1000}
                    nodeRef={itemRefs.current[index]} // Access the correct ref by index
                >
                    <Item ref={itemRefs.current[index]} id={items[index]} level={level} />
                </CSSTransition>,
            );
        }

        return elements;
    }, [active, direction, items]);

    const moveLeft = () => {
        setDirection("left");
        setActive((prevActive) => (prevActive - 1 + items.length) % items.length); // Ensure circular carousel
    };

    const moveRight = () => {
        setDirection("right");
        setActive((prevActive) => (prevActive + 1) % items.length);
    };

    return (
        <div id={cx("carousel")} className={cx("noselect")}>
            <div className={cx("arrow", "arrow-left")} onClick={moveLeft}>
                <ChevronLeft />
            </div>
            <div className={cx("carousel-items")}>
                <TransitionGroup>{generateItems()}</TransitionGroup>
            </div>
            <div className={cx("arrow", "arrow-right")} onClick={moveRight}>
                <ChevronRight />
            </div>
        </div>
    );
};

const Item = forwardRef(({ id, level }, ref) => {
    return (
        <div ref={ref} className={cx("item", `level${level}`)}>
            {id}
        </div>
    );
});

export default Carousel;
