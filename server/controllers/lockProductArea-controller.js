const mongoose = require('mongoose');
const LockProductArea = require('../models/lock_product_area.model')

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

exports.getLockProductAreaList = (req, res, next) => {
    return LockProductArea.find()
                   .then((list) => {
                        if(list) {
                            return res.status(200).json({
                                status: true,
                                message: "LockProductArea fetched Successfully.",
                                list: list
                            })
                        }
                   })
                   .catch((err) => catchDBErr(err, res))
};

exports.createLockProductArea = (req, res) => {
    const lockProductArea = new LockProductArea(req.body);
    lockProductArea.save()
            .then((newLockProductArea) => {
                return res.status(200).send({
                    id: newLockProductArea._id,
                    status: true,
                    message: "LockProductArea Created Successfully."
                })
            })
            .catch((err) => catchDBErr(err, res))
};

exports.getLockProductArea = (req, res) => {
    LockProductArea.find({ _id: req.params.id })
            .then((lockProductArea) => {
                if(lockProductArea.length > 0) {
                    return res.status(200).send({ status: true, lockProductArea});
                }
                return res.status(404).send({
                    status: false,
                    message: "LockProductArea not found with id: " + req.params.id
                });
            })
            .catch((err) => catchDBErr(err, res))
};

exports.updateLockProductArea = async (req, res) => {
    // Validate Request
    if (Object.keys(req.body).length === 0) {
        return res.status(200).send({
            status: false,
            message: "Request Body cannot be empty"
        });
    }
    // Find and update LockProductArea with the request body
    LockProductArea.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        .then((lockProductArea) => {
            if (!lockProductArea) {
                return res.status(200).send({
                    status: true,
                    message: "LockProductArea not found with id: " + req.params.id
                });
            }
            return res.status(200).send({
                status: true,
                message: "LockProductArea updated successfully."
            })
        })
        .catch((err) => catchDBErr(err, res))
};

exports.deleteLockProductArea = async (req, res) => {
    LockProductArea.deleteOne({ _id: req.params.id })
        .then((lockProductArea) => {
            if (!lockProductArea) {
                return res.status(404).send({
                    status: false,
                    message: "LockProductArea not found with id: " + req.params.id
                });
            }
            return res.status(200).send({
                id: lockProductArea._id,
                status: true,
                message: "LockProductArea deleted successfully"
            });
        })
        .catch((err) => catchDBErr(err, res))
};