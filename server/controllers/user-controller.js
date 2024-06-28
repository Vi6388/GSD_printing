const mongoose = require('mongoose');
const User = require('../models/user.model')

function catchDBErr(err, res) {
    // 400: Invalid Request Error, Duplicate Key...
    // Backup validation since validation already performed by JOI
    if (err.name === "MongoError" || err.name === "ValidationError")
        return res.status(400).send({
            status: false,
            message: err.message
        });
    else {
        // 500: DB connection issues... 
        return res.status(500).send({
            status: false,
            message: "Oops! Internal server error."
        });
    }
}

exports.getUserList = (req, res, next) => {
    return User.find()
                   .then((list) => {
                        if(list) {
                            return res.status(200).json({
                                status: true,
                                message: "User List fetched Successfully.",
                                list: list
                            })
                        }
                   })
                   .catch((err) => catchDBErr(err, res))
};

exports.createUser = (req, res) => {
    const user = new User(req.body);
    user.save()
            .then((newUser) => {
                return res.status(200).send({
                    id: newUser._id,
                    status: true,
                    message: "User Created Successfully."
                })
            })
            .catch((err) => catchDBErr(err, res))
};

exports.getUserById = (req, res) => {
    User.find({ _id: req.params.id })
            .then((user) => {
                if(user.length > 0) {
                    return res.status(200).send({ status: true, user});
                } else {
                    return res.status(404).send({
                        status: false,
                        message: "User not found with id: " + req.params.id
                    });
                }
            })
            .catch((err) => catchDBErr(err, res))
};

exports.updateUser = async (req, res) => {
    // Validate Request
    if (Object.keys(req.body).length === 0) {
        return res.status(400).send({
            status: false,
            message: "Request Body cannot be empty"
        });
    }
    // Find and update User with the request body
    User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        .then((user) => {
            if (!user) {
                return res.status(404).send({
                    status: false,
                    message: "User not found with id: " + req.params.id
                });
            }
            return res.status(200).send({
                status: true,
                message: "User udpated successfully."
            })
        })
        .catch((err) => catchDBErr(err, res))
};

exports.deleteUser = async (req, res) => {
    User.deleteOne({ _id: req.params.id })
        .then((user) => {
            if (!user) {
                return res.status(404).send({
                    status: false,
                    message: "User not found with id: " + req.params.id
                });
            }
            return res.status(200).send({
                id: user._id,
                status: true,
                message: "User deleted successfully"
            });
        })
        .catch((err) => catchDBErr(err, res))
};

