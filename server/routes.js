require("dotenv").config();
const express = require("express");
const router = express.Router();

//User model
const User = require("./model/User");

//Api functions, adding data to the DB -- post 
router.post("/addUser", (req, res) => {
    let user = new User(req.body);
    User.findOne({ email: user.email }, (error, response) => {
        if (error) {
            res.json({
                message: 'Error occurred while trying to find a user.',
                error: error
            });
        } else {
            if (response) {
                res.json({
                    message: 'User with this email already exist.',
                    email: response.email
                });
            } else {
                user.save((err, result) => {
                    if (err) {
                        res.status(401).send(err);
                    }
                    res.json({
                        message: 'User added successfully.',
                        data: result
                    });
                });
            }
        }
    });

});

//Retrieving details from the DB -- get
router.get("/getUsers", (req, res) => {
    User.find({}, (err, users) => {
        if (err) {
            res.json({
                message: 'Error getting users.',
                error: err
            });
        }
        res.json({
            message: 'Users loading.',
            data: users
        });
    });
});

module.exports = router;
