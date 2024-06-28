const mongoose = require('mongoose');
const AdminInfo = require('../models/admin_info.model')

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

exports.getBasicInfo = (req, res, next) => {
    return AdminInfo.find()
                   .then((adminInfo) => {
                        if(adminInfo) {
                            return res.status(200).json({
                                status: true,
                                message: "AdminInfo fetched Successfully.",
                                adminInfo: adminInfo
                            })
                        }
                   })
                   .catch((err) => catchDBErr(err, res))
};

exports.changePassword = (req, res, next) => {
    const admin = AdminInfo.findOne()
                           .then((admin) => {
                                if(!admin) {
                                    return res.status(404).json({
                                        status: false,
                                        message: "AdminInfo Not Found."
                                    })
                                }
                                admin.password = req.body.password;
                                admin.save().then(() => {
                                    return res.status(201).json({
                                        success: true,
                                        message: "Password changed Successfylly."
                                    })
                                })

                           })
                           .catch((err) => catchDBErr(err, res))
}