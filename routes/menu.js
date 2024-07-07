let express = require('express');
let router = express.Router();
const MenuItem = require('../models/menuItem');

router.post('/', async (req, res) => {
    try {
        const data = req.body;
        let newMenuItem = new MenuItem(data);
        await newMenuItem.save();
        console.log(data);
        res.status(201).send("menu item created");
    } catch (error) {
        console.log(error);
        res.status(501).send(error);
    }
});

router.get('/', async (req, res) => {
    try {
        const data = await MenuItem.find();
        res.status(200).send(data);
        console.log("jai shree ram");
    } catch (error) {
        res.status(500).send("error occured");
    }
});

router.get("/:taste", async (req, res) => {
    try {
        const taste = req.params.taste;
        if (taste == "sweet" || taste == "sour" || taste == "spicy") {
            const data = await MenuItem.find({ taste: taste });
            res.status(200).send(data);
            console.log("jai shree ram");
        }
        else {
            res.status(404).send("invalid taste");
        }
    } catch (error) {
        res.status(500).send("error occured");
    }
});
module.exports = router;