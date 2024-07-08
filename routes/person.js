let express = require('express');
let router = express.Router();
const Person = require('../models/person');
const path=require('path');

// router.set("view engine", "ejs");
router.use(express.static(path.join(__dirname, 'public')));
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get("/create", (req, res) => {
    res.render('createPerson');
});

router.get("/personCreated", (req, res) => {
    res.render('personCreated');
});
router.post('/add', async (req, res) => {
    try {
        let { name, age, work, mobile, email, address, salary } = req.body;

        if (!name || !age || !work || !mobile || !email || !salary || !address) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        let newPerson = new Person({ name, age, work, mobile, email, address, salary });
        await newPerson.save();
        console.log(newPerson);
        res.redirect('/person/personCreated');

    } catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
            // Duplicate email error
            return res.status(400).json({ error: 'Email already exists' });
        }
        console.error('Error adding new person:', error);
        res.status(500).send('Error adding new person');
    }
});

router.get('/', async (req, res) => {
    // try {
    //     const data = await Person.find();
    //     console.log("data is here");
    //     res.send(data);
    // } catch (error) {
    //     res.status(500).send("you got an error");
    // }
    try {
        const data = await Person.find();
        res.render('person', { data });
        console.log("data is here");
    } catch (error) {
        res.status(500).send("You got an error");
    }
});
router.get("/:workType", async (req, res) => {
    try {
        const workType = req.params.workType;
        if (workType == "chef" || workType == "manager" || workType == "waiter") {
            const data = await Person.find({ work: workType });
            res.status(200).send(data);
            console.log("jai shree ram");
        }
        else {
            res.status(404).send("invalid work type");
        }
    } catch (error) {
        // console.log(error.message);
        res.status(500).send("error occured");
    }
});

router.get("/edit/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const person = await Person.findById(id);
        // if id is invalid
        if (!person) {
            return res.status(404).send("invalid id");
        }
        console.log(person);
        res.render('updatePerson', { person });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("error occured");
    }
});

router.post("/update/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const person = await Person.findByIdAndUpdate(id, data, {
            new: true,//to get the updated data
            runValidators: true//to run the validators written in the schema
        });

        // if id is invalid
        if (!person) {
            return res.status(404).send("invalid id");
        }
        console.log(person);
        // res.status(200).send(person);
        res.redirect('/person/personCreated');
    } catch (error) {
        console.log(error.message);
        res.status(500).send("error occured");
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const person = await Person.findByIdAndDelete(id);
        // if id is invalid
        if (!person) {
            return res.status(404).send("invalid id");
        }
        console.log(person);
        res.status(200).send(person);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("error occured");
    }
});

router.post("/delete/:id", async (req, res) => {
    try{
        const id = req.params.id;
        const person = await Person.findByIdAndDelete(id);
        // if id is invalid
        if (!person) {
            return res.status(404).send("invalid id");
        }
        console.log(person);
        res.redirect('/person');
    } catch(error) {
        console.log(error.message);
        res.status(500).send("error occured");
    }
});

module.exports = router;