require("dotenv").config();
const express = require("express");
const router = express.Router();

//User model
const User = require("./model/User");

//Api functions -- post | get
router.post("/addUser", (req, res) => {
    let user = new User(req.body);
    console.log("User", req);
    user.save((err, result) => {
        if (err) {
            res.status(401).send(err);
        } 
        res.json({
            message: 'User added successfully.',
            data: result
        });
    });
});

//Retrieving details from the DB -- get
router.get("/getUsers", (req, res) => {
    User.find({}, (err, users) => {
        if (err) {
            res.status(401).send(err);
        } 
        res.json({
            message: 'Users loading.',
            data: users
        });
    });
});

module.exports = router;
