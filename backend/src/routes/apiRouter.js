const express = require("express");
const router = express.Router();

const { getAllDish, findDishesByName } = require("@services/dishService");

// * Dishes
router.get("/dishes", async (req, res) => {
    const name = req.query.name;
    const sort = req.query.sort;
    const allDish = await getAllDish();
    const dishes = await findDishesByName(name);

    if (!name) {
        return res.json(allDish);
    }

    if (dishes.length === 0) {
        return res.json({ status: 404, message: "Not found" });
    }

    if (!allDish) {
        return res.json({ status: 404, message: "Not found" });
    }

    res.status(200).json(dishes);
});
// * Users
router.get("/users", (req, res) => {});

module.exports = router;
