const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const config = require("../config/auth.config");
const RefreshToken = require("../models/refresh_token.model");

const jwt = require("jsonwebtoken");

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

exports.register = async (req, res, next) => {  
    try {
        const { firstName, lastName, email, password } = req.body;
        const emailCheck = await User.findOne({ email });
        if (emailCheck) {
            return res.json({ msg: "Email already used", status: false });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });
        delete user.password;
        return res.json({ status: true, user });
    } catch (ex) {
        next(ex);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ 
                msg: "User Not found, Please register first.", 
                status: false,
                accessToken: null 
            });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.json({ 
                msg: "Incorrect Password, Please enter correctly.", 
                status: false,
                accessToken: null 
            });
        }

        let token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: config.jwtExpiration,
        });    
        let refreshToken = await RefreshToken.createToken(user);

        return res.status(200).json({ 
            status: true, 
            userData: user,
            // accessToken: token,
            refreshToken: refreshToken
        });
    } catch (ex) {
        next(ex);
    }
}

exports.refreshToken = async (req, res) => {
    const { refreshToken: requestToken } = req.body;
  
    if (requestToken == null) {
      return res.status(403).json({ status: false, message: "Refresh Token is required!" });
    }
  
    try {
      let refreshToken = await RefreshToken.findOne({ token: requestToken });
  
      if (!refreshToken) {
        res.status(403).json({ status: false, message: "Refresh token is not in database!" });
        return;
      }
  
      if (RefreshToken.verifyExpiration(refreshToken)) {
        RefreshToken.findByIdAndRemove(refreshToken._id, { useFindAndModify: false }).exec();
        
        res.status(403).json({
            status: false,
            message: "Refresh token was expired. Please make a new signin request",
        });
        return;
      }
  
      let newAccessToken = jwt.sign({ id: refreshToken.user._id }, config.secret, {
        expiresIn: config.jwtExpiration,
      });
  
      return res.status(200).json({
        status: true,
        accessToken: newAccessToken,
        refreshToken: refreshToken.token,
      });
    } catch (err) {
      return res.status(500).send({ message: err });
    }
  };


exports.userChangePassword = async (req, res, next) => {
    const user = User.findOne({ email: req.body.email })
                .then(async (user) => {
                    if(!user) {
                        return res.status(404).json({
                            status: false,
                            message: "User Not Found."
                        })
                    }
                    const hashedPassword = await bcrypt.hash(req.body.password, 10);
                    user.password = hashedPassword;
                    user.save().then(() => {
                        return res.status(201).json({
                            status: true,
                            message: "Password changed Successfylly."
                        })
                    })

                })
                .catch((err) => catchDBErr(err, res))
}