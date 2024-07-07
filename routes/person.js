let express = require('express');
let router = express.Router();
const Person = require('../models/person');

router.post('/', async (req, res) => {
    try {
        const data = req.body;
        let newPerson = new Person(data);
        await newPerson.save();
        console.log(data);
        res.send("jai shree ram");
    } catch (error) {
        res.status(500).send(error);
    }
});
router.get('/', async (req, res) => {
    try {
        const data = await Person.find();
        console.log("data is here");
        res.send(data);
    } catch (error) {
        res.status(500).send("you got an error");
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

router.put("/:id", async (req, res) => {
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
        res.status(200).send(person);
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

module.exports = router;