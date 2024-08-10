const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {});

router.post("/", (req, res) => {
    res.send("Login");
    console.log("Data: " + JSON.stringify(req.body));
});

module.exports = router;
