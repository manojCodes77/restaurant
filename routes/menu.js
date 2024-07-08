let express = require('express');
let router = express.Router();
const MenuItem = require('../models/menuItem');
let path = require('path');

router.use(express.static(path.join(__dirname, 'public')));
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

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
    // try {
    //     const data = await MenuItem.find();
    //     res.status(200).send(data);
    //     console.log("jai shree ram");
    // } catch (error) {
    //     res.status(500).send("error occured");
    // }
    try {
        const data = await MenuItem.find();
        res.render('menu', { data });
        console.log("data is here");
    } catch (error) {
        res.status(500).send("You got an error");
    }
});

router.get("/create", (req, res) => {
    res.render('createMenu');
});

router.get("/added", (req, res) => {
    res.render('menuItemCreated');
});

router.post("/add", async (req, res) => {
    try {
        const data = req.body;
        let newMenuItem = new MenuItem(data);
        await newMenuItem.save();
        console.log(data);
        // res.status(201).send("menu item created");
        res.redirect('/menu/added');
    } catch (error) {
        console.log(error);
        res.status(501).send(error);
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

router.get("/edit/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const menuItem = await MenuItem.findById(id);
        if (!menuItem) {
            return res.status(404).send("invalid id");
        }
        console.log(menuItem);
        res.render('updateMenuItem', { menuItem });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("error occured");
    }
});
// router.post("/update/:id", async (req, res) => {
//     try {
//         const id = req.params.id;
//         const menuItem = await MenuItem.findByIdAndUpdate(id, req.body
//             , {
//                 new: true,
//                 runValidators: true
//             });
//         if (!menuItem) {
//             return res.status(404).send("invalid id");
//         }
//         console.log(menuItem);
//         // res.status(200).send("menu item updated");
//         res.redirect('/menu/added');
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).send("error occured");
//     }
// });


router.post("/update/:id", async (req, res) => {
    try {
        const id = req.params.id;
        let menuItem = await MenuItem.findById(id);
        if (!menuItem) {
            return res.status(404).send("Invalid ID");
        }

        // Update the menuItem object with new values from req.body
        menuItem.name = req.body.name;
        menuItem.price = req.body.price;
        menuItem.taste = req.body.taste;
        menuItem.is_drink = req.body.is_drink === 'on'; // Convert to boolean
        menuItem.ingredients = req.body.ingredients.split(',').map(item => item.trim()); // Split ingredients string into array
        menuItem.num_sales = req.body.num_sales;

        // Save the updated menuItem
        menuItem = await menuItem.save();

        console.log(menuItem);
        res.redirect('/menu/added');
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error occurred");
    }
});

router.post("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const menuItem = await MenuItem.findByIdAndDelete(id);
        if (!menuItem) {
            return res.status(404).send("invalid id");
        }
        console.log(menuItem);
        // res.status(200).send("menu item deleted");
        res.redirect('/menu');
    } catch (error) {
        console.log(error.message);
        res.status(500).send("error occured");
    }
});

module.exports = router;