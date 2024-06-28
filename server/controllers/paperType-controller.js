const mongoose = require('mongoose');
const PaperType = require('../models/paper_type.model')

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

exports.getPaperTypeList = (req, res, next) => {
    return PaperType.find()
            .then((paperTypeList) => {
                if(paperTypeList) {
                    return res.status(200).json({
                        status: true,
                        message: "PaperType List fetched Successfully.",
                        list: paperTypeList
                    })
                }
            })
            .catch((err) => catchDBErr(err, res))
};

exports.createPaperType = (req, res) => {
    const paperType = new PaperType(req.body);
    paperType.save()
            .then((newPaperType) => {
                return res.status(200).send({
                    paperType: newPaperType,
                    status: true,
                    message: "PaperType Created Successfully."
                })
            })
            .catch((err) => catchDBErr(err, res))
};

exports.getPaperType = (req, res) => {
    PaperType.find({ _id: req.params.id })
            .then((paperType) => {
                if(paperType.length > 0) {
                    return res.status(200).send({ status: true, paperType});
                }
                return res.status(404).send({
                    status: false,
                    message: "PaperType not found with id: " + req.params.id
                });
            })
            .catch((err) => catchDBErr(err, res))
};

exports.updatePaperType = async (req, res) => {
    // Validate Request
    if (Object.keys(req.body).length === 0) {
        return res.status(200).send({
            status: false,
            message: "Request Body cannot be empty"
        });
    }
    console.log(req.body)
    // Find and update PaperType with the request body
    PaperType.findOneAndUpdate({ _id: req.body.id }, req.body, { new: true })
        .then((paperType) => {
            if (!paperType) {
                return res.status(200).send({
                    status: false,
                    message: "PaperType not found with id: " + req.body.id
                });
            }
            return res.send({
                status: true,
                paperType: paperType,
                message: "Paper Type updated successfully."
            });
        })
        .catch((err) => catchDBErr(err, res))
};

exports.deletePaperType = async (req, res) => {
    PaperType.deleteOne({ _id: req.params.id })
        .then((paperType) => {
            if (!paperType) {
                return res.status(404).send({
                    status: false,
                    message: "PaperType not found with id: " + req.params.id
                });
            }
            return res.status(200).send({
                id: paperType._id,
                status: true,
                message: "PaperType deleted successfully"
            });
        })
        .catch((err) => catchDBErr(err, res))
};