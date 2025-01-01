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

const cx = classNames.bind(styles);

function Cart() {
    const [products, setProducts] = useState([]);
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
                                    {/* {products.map((product) => (
                                        <TableRow
                                            key={product.name}
                                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row" className={cx("product")}>
                                                <div
                                                    className={cx("product-image")}
                                                    style={{ backgroundImage: `url(${""})` }}
                                                ></div>
                                                <div className={cx("product-name")}>Gà rán giòn rụm</div>
                                            </TableCell>
                                            <TableCell align="right" className={cx("quantity")}>
                                                10
                                            </TableCell>
                                            <TableCell align="right" className={cx("price")}>
                                                100.000 <span>₫</span>
                                            </TableCell>
                                            <TableCell align="right" className={cx("subtotal")}>
                                                {product.carbs}
                                            </TableCell>
                                        </TableRow>
                                    ))} */}

                                    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                        <TableCell>
                                            <div hidden={!editMode} className={cx("product-select")}>
                                                <input
                                                    onChange={selectProduct}
                                                    type="checkbox"
                                                    name="product-1"
                                                    id="product-1"
                                                />
                                            </div>
                                        </TableCell>
                                        <TableCell className={cx("product")}>
                                            <div
                                                className={cx("product-image")}
                                                style={{
                                                    backgroundImage: `url(${require("@assets/images/bestseller/food_6.png")})`,
                                                }}
                                            ></div>
                                            <div className={cx("product-name")}>Gà rán giòn rụm</div>
                                        </TableCell>
                                        <TableCell align="right" className={cx("price")}>
                                            100.000 <span style={{ fontSize: "var(--fontSizeLarge)" }}>₫</span>
                                        </TableCell>
                                        <TableCell align="right" className={cx("quantity")}>
                                            10
                                        </TableCell>
                                        <TableCell align="right" className={cx("subtotal")}>
                                            100.000 <span style={{ fontSize: "var(--fontSizeLarge)" }}>₫</span>
                                        </TableCell>
                                    </TableRow>
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
