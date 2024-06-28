const express = require('express');
const imageRouter = express.Router();
const mongoose = require('mongoose');
const crypto = require('crypto');
const Image = require('../models/image.model');
const ProductTemplate = require('../models/product_template.model')
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');
require("dotenv").config();
module.exports = (upload) => {
    const url = process.env.MONGO_DB_URL;
    const connect = mongoose.createConnection(url, { useNewUrlParser: true, useUnifiedTopology: true });

    let gfs;

    connect.once('open', () => {
        // initialize stream
        gfs = new mongoose.mongo.GridFSBucket(connect.db, {
            bucketName: "uploads"
        });
    });


    /**
     * @swagger
     * /api/image/delete/{imageId}:
     *  delete:
     *    description: Delete an image from the collection
     *    produces:
     *      - application/json
     *    parameters:
     *      - in: path
     *        name: imageId
     *        description: Remove Category Item from DB.
     *    responses:
     *      '200':
     *        description: Delete an image from the collection
    */
    imageRouter.route('/delete/:imageId')
        .get((req, res, next) => {
            Image.findOne({ _id: req.params.id })
                .then((image) => {
                    if (image) {
                        Image.deleteOne({ _id: req.params.id })
                            .then(() => {
                                return res.status(200).json({
                                    status: true,
                                    message: `File with ID: ${req.params.id} deleted`,
                                });
                            })
                            .catch(err => { return res.status(500).json(err) });
                    } else {
                        return res.status(200).json({
                            status: false,
                            message: `File with ID: ${req.params.id} not found`,
                        });
                    }
                })
                .catch(err => res.status(500).json(err));
        });


    /**
     * @swagger
     * /api/image/upload:
     *  post:
     *    description: Image Upload
     *    consumes:
     *      - multipart/form-data
     *    parameters:
     *      - in: formData
     *        name: file
     *        description: The uploaded file data
     *        type: file
     *    responses:
     *      '200':
     *        description: Image uploaded successfully.
     */
    imageRouter.route('/upload')
        .post(upload.single('file'), (req, res, next) => {
            if(req.file) {
                let newImage = new Image({
                    filename: req.file.originalname,
                    fileId: crypto.randomUUID(),
                });
                newImage.save()
                    .then((image) => {
                        return res.status(200).json({
                            status: true,
                            image,
                        });
                    })
                    .catch(err => res.status(500).json(err));
            }
        })
        .get((req, res, next) => {
            Image.find({})
                .then(images => {
                    return res.status(200).json({
                        status: true,
                        images,
                    });
                })
                .catch(err => res.status(500).json(err));
        });

    /**
     * @swagger
     * /api/image/delete/{imageId}:
     *  delete:
     *    description: Delete an image from the collection
     *    produces:
     *      - application/json
     *    parameters:
     *      - in: path
     *        name: imageId
     *        description: Remove Category Item from DB.
     *    responses:
     *      '200':
     *        description: Delete an image from the collection
    */
    imageRouter.route('/delete/:imageId')
        .get((req, res, next) => {
            Image.findOne({ _id: req.params.id })
                .then((image) => {
                    if (image) {
                        Image.deleteOne({ _id: req.params.id })
                            .then(() => {
                                return res.status(200).json({
                                    status: true,
                                    message: `File with ID: ${req.params.id} deleted`,
                                });
                            })
                            .catch(err => { return res.status(500).json(err) });
                    } else {
                        return res.status(200).json({
                            status: false,
                            message: `File with ID: ${req.params.id} not found`,
                        });
                    }
                })
                .catch(err => res.status(500).json(err));
        });

    /**
     * @swagger
     * /api/image/recent/:
     *  get:
     *    description: Fetch most recently added record
     *    produces:
     *      - application/json
     *    responses:
     *      '200':
     *        description: Fetch most recently added record
    */
    imageRouter.route('/recent')
        .get((req, res, next) => {
            Image.findOne({}, {}, { sort: { '_id': -1 } })
                .then((image) => {
                    return res.status(200).json({
                        status: true,
                        image,
                    });
                })
                .catch(err => res.status(500).json(err));
        });

   /**
     * @swagger
     * /api/image/getImagesByProductID/:productID:
     *  get:
     *    description: Fetch most added imaged about productID
     *    produces:
     *      - application/json
     *    responses:
     *      '200':
     *        description: Fetch most added imaged about productID
    */
   imageRouter.route('/getImagesByProductID/:productID')
   .get((req, res, next) => {
       Image.find({ productID: req.params.productID})
           .then((image) => {
               return res.status(200).json({
                   status: true,
                   image,
               });
           })
           .catch(err => res.status(500).json(err));
   });


    /**
     * @swagger
     * /api/image/{imageId}:
     *  get:
     *    description: Get an image from the collection
     *    produces:
     *      - application/json
     *    parameters:
     *      - in: path
     *        name: imageId
     *        description: Get an image from DB.
     *    responses:
     *      '200':
     *        description: Get an image from the collection
    */
    imageRouter.route('/:imageId').get((req, res, next) => {
        const dir = __basedir + '/public/';
        console.log(dir);
        Image.findOne({ _id: req.params.imageId })
            .then((image) => {
                if (image) {

                    let fileInfo = {};
                    fs.readdir(dir, function (err, files) {
                        if (err) {
                          res.status(500).send({
                            message: "Unable to scan files!",
                          });
                        }
                    
                        files.forEach((file) => {
                            if(file === "bg-1.jpg") {
                                fileInfo = {
                                    name: file,
                                    url: dir + file
                                }
                            }
                        });
                        
                        res.set('Content-Type', 'image/jpeg');
                        return res.send(fileInfo.name);
                        // return res.status(200).json({
                        //     image: image,
                        //     fileInfo: fileInfo,
                        //     status: true,
                        //     message: `Get Image with ID: ${req.params.id}`,
                        // });
                    });
                } else {
                    res.status(200).json({
                        status: false,
                        message: `File with ID: ${req.params.id} not found`,
                    });
                }
            })
            .catch(err => res.status(500).json(err));
    });

    /*
        POST: Upload multiple files upto 3
    */
    imageRouter.route('/multiple')
        .post(upload.array('file', 3), (req, res, next) => {
            return res.status(200).json({
                status: true,
                message: `${req.files.length} files uploaded successfully`,
            });
        });

    function generateRandomString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let randomString = '';
        
        for (let i = 0; i < length; i++) {
            const randomIndex = crypto.randomInt(characters.length);
            randomString += characters[randomIndex];
        }
        
        return randomString;
        }

    /**
     * @swagger
     * /api/image/uploadImage:
     *  get:
     *    description: Get an image from the collection
     *    produces:
     *      - application/json
     *    parameters:
     *      - in: path
     *        name: imageId
     *        description: Get an image from DB.
     *    responses:
     *      '200':
     *        description: Get an image from the collection
    */
    imageRouter.route('/uploadImage')
    .post((req, res) => {
        const imageData = req.body[0]["imageData"];
        const productID = req.body[1]["productID"];
        const objects = req.body[2]["objects"];
        // Remove header
        const base64Data = imageData.replace(/^data:image\/png;base64,/, '');
        const randomStringPath = generateRandomString(15) + '.png';
        // Create file path
        const filePath = path.join("public", randomStringPath);
        // Write base64 data to file
        fs.writeFile(filePath, base64Data, 'base64', (err) => {
            if (err) {
            console.error(err);
            return res.status(500).json({
                status: false,
                message: 'Failed to save image',
            });
            } else {
            console.log('Image saved successfully');
                const newImage = {
                    filename: randomStringPath,
                    fileId: crypto.randomUUID(),
                };
                newImage['productID'] = productID;
                newImage['objects'] = objects;
                const image = new Image(newImage);
                image.save()
                    .then((image) => {
                        return res.status(200).json({
                            status: true,
                            image,
                        });
                    })
                    .catch(err => res.status(500).json(err));
            }
        });

   
    });

    /**
     * @swagger
     * /api/image/uploadTemplate/{templateID}
     *  get:
     *    description: Upload edited template
     *    produces:
     *      - application/json
     *    parameters:
     *      - in: path
     *        name: templateID
     *        description: update template to DB.
     *    responses:
     *      '200':
     *        description: Get an image from the collection
    */
    imageRouter.route('/uploadTemplate/:templateID')
    .post((req, res) => {
        const imageData = req.body[0]["imageData"];
        const templateID = req.body[1]["templateID"];
        const objects = req.body[2]["objects"];
        // Remove header
        const base64Data = imageData.replace(/^data:image\/png;base64,/, '');
        const randomStringPath = generateRandomString(8) + '.png';
        // Create file path
        const filePath = path.join("public", randomStringPath);
        // Write base64 data to file
        fs.writeFile(filePath, base64Data, 'base64', (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    status: false,
                    message: 'Failed to save image',
                });
            } else {
                console.log('Image saved successfully');

                ProductTemplate.findOneAndUpdate({ _id: templateID}, {objects: objects, templateImage: randomStringPath})
                .then((productTemplate) => {
                    if (!productTemplate) {
                        return res.status(200).send({
                            status: false,
                            message: "ProductTemplate not found with id: " + templateID
                        });
                    }

                    const newImage = {
                        filename: randomStringPath,
                        fileId: crypto.randomUUID(),
                    };
                    newImage['templateID'] = templateID;
                    newImage['objects'] = objects;
                    const image = new Image(newImage);
                    image.save()
                        .then((image) => {
                            return res.status(200).send({
                                status: true,
                                message: "ProductTemplate updated successfully.",
                                image,
                            })
                        })
                        .catch(err => res.status(500).json(err));
                })
                .catch(err => res.status(500).json(err));
            }

            // return res.status(200).send({
            //     status: false,
            //     message: "ProductTemplate not found with id: " + templateID
            // });
        });
    });

    return imageRouter;
};