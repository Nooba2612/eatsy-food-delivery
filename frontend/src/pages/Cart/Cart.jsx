import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import { Container } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import styles from "./Cart.module.css";
import axiosInstance from "@config/axiosInstance";
import { getCartItems } from "@services/cartService";

const cx = classNames.bind(styles);

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [checkBoxes, setCheckBoxes] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const selectAllRef = useRef();

    const selectAll = (e) => {
        checkBoxes.forEach((checkbox) => {
            if (e.target.checked) {
                checkbox.checked = true;
            } else {
                checkbox.checked = false;
            }
        });
    };

    const checkSelectAll = () => {
        const isAllChecked = Array.from(checkBoxes).every((checkbox) => checkbox.checked);
        selectAllRef.current.checked = isAllChecked;
    };

    const selectProduct = () => {
        checkSelectAll();

        // * More handle here
    };

    useEffect(() => {
        // get all the checkboxes
        const checkBoxList = document.querySelectorAll(".product-select input[type='checkbox']");
        setCheckBoxes(checkBoxList);

        // load cart items
        // const loadCartItems = async () => {
        //     setCartItems(await getCartItems());
        // };
        // loadCartItems();
    }, []);

    return (
        <div className={cx("wrapper")}>
            <div className={cx("title")}>
                <h1>Giỏ hàng</h1>
            </div>
            <Container maxWidth="lg">
                <div className={cx("cart")}>
                    <div className={cx("operation")}>
                        <div
                            className={cx("left")}
                            style={{ display: editMode ? "block" : "none", justifySelf: "flex-start" }}
                        >
                            <input
                                ref={selectAllRef}
                                type="checkbox"
                                onChange={selectAll}
                                name="select-all-product"
                                id="select-all-product"
                            />
                            <label htmlFor="select-all-product" style={{ marginLeft: "5px" }}>
                                Chọn tất cả
                            </label>
                        </div>
                        <div className={cx("right")} style={{ justifySelf: "flex-end" }}>
                            <button hidden={!editMode} className={cx("delete-cart-btn", "cart-btn")}>
                                Xóa
                            </button>
                            <button
                                hidden={!editMode}
                                onClick={() => setEditMode(!editMode)}
                                className={cx("cancel-cart-btn", "cart-btn")}
                            >
                                Hủy
                            </button>
                            <button
                                hidden={editMode}
                                onClick={() => setEditMode(!editMode)}
                                className={cx("edit-cart-btn", "cart-btn")}
                            >
                                Sửa
                            </button>
                        </div>
                    </div>
                    <TableContainer component={Paper}>
                        <div style={{ padding: "20px 30px" }}>
                            <Table sx={{ minWidth: 650 }} aria-label="cart table">
                                <TableHead>
                                    <TableRow className={cx("cart-header")}>
                                        <TableCell width={editMode ? 80 : 0}></TableCell>
                                        <TableCell>Sản phẩm</TableCell>
                                        <TableCell align="right">Đơn giá</TableCell>
                                        <TableCell align="right">Số lượng</TableCell>
                                        <TableCell align="right">Tạm tính</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {cartItems.map((item, index) => (
                                        <TableRow
                                            key={index}
                                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row" className={cx("product")}>
                                                <div
                                                    className={cx("product-image")}
                                                    style={{ backgroundImage: `url(${item.thumbnail_path})` }}
                                                ></div>
                                                <div className={cx("product-name")}>{item.name}</div>
                                            </TableCell>
                                            <TableCell align="right" className={cx("quantity")}>
                                                {item.quantity}
                                            </TableCell>
                                            <TableCell align="right" className={cx("price")}>
                                                {item.price} <span>₫</span>
                                            </TableCell>
                                            <TableCell align="right" className={cx("subtotal")}>
                                                {item.carbs}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </TableContainer>
                </div>
            </Container>
        </div>
    );
}

export default Cart;
