const mongoose = require('mongoose');
const AdminInfo = require("../models/admin_info.model");
const bcrypt = require("bcrypt");

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

exports.getAdminInfoByID = (req, res) => {
    AdminInfo.find({})
            .then(async (info) => {
                if(info.length > 0) {
                    return res.status(200).send({
                        status: true,
                        adminInfo: info
                    })
                } else {
                    return res.status(200).send({
                        status: false,
                        message: "AdminInfo not found"
                    })
                }
            })
            .catch((err) => catchDBErr(err, res));
}

exports.save = async (req, res) => {
    // Validate Request
    if (Object.keys(req.body).length === 0) {
        return res.status(400).send({
            status: false,
            message: "Request Body cannot be empty"
        });
    }
    const hashedPassword = await bcrypt.hash(req.body.profileDetails.password, 10);
    const newAdminInfo = {
        ...req.body,
        profileDetails: {
            ...req.body.profileDetails,
            password: hashedPassword
        }
    }
    AdminInfo.find().then((oldAdminInfo) => {
        if(oldAdminInfo.length > 0) {
            AdminInfo.findOneAndUpdate({ _id: oldAdminInfo[0]._id }, newAdminInfo, { new: true })
            .then((info) => {
                if (!info) {
                    return res.status(200).send({
                        status: false,
                        message: "AdminInfo not found with id: " + req.body.id
                    });
                }
                return res.json({
                    status: true,
                    adminInfo: info,
                    message: "Update AdminInfo successfully."
                });
            })
            .catch((err) => catchDBErr(err, res))
        } else {
            const adminInfo = new AdminInfo(newAdminInfo);
            adminInfo.save()
                .then((info) => {
                    return res.json({
                        status: true,
                        adminInfo: info,
                        message: "Update AdminInfo successfully."
                    });
                })
                .catch((err) => catchDBErr(err, res))
        }
    })
    
};

exports.resetPassword = async(req, res) => {
    const { currentPassword, newPassword } = req.body;
    const adminInfo = await AdminInfo.findOne();

    const isPasswordValid = await bcrypt.compare(currentPassword, adminInfo.profileDetails.password);
    if (!isPasswordValid) {
        return res.json({ 
            msg: "Incorrect current Password, Please enter correctly.", 
            status: false,
            accessToken: null 
        });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    AdminInfo.findOneAndUpdate({ _id: adminInfo._id }, { profileDetails: { ...adminInfo.profileDetails, password: hashedPassword } }, { new: true })
            .then((info) => {
                if (!info) {
                    return res.status(200).send({
                        status: true,
                        message: "AdminInfo not found with id: " + req.body.id
                    });
                }
                return res.json({
                    status: false,
                    adminInfo: info,
                    message: "Update new password successfully."
                });
            })
            .catch((err) => catchDBErr(err, res))
    
}