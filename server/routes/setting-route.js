const express = require('express');
const settingController = require('../controllers/settings-controller.js');

const router = express.Router();


/**
 * @swagger
 * /api/settings/getBasicInfo:
 *  get:
 *    description: Get all the basic info from DB
 *    produces:
 *      - application/json
 *    responses:
 *      '200':
 *        description: Basic Info fetched successfully.
 */
router.get('/getBasicInfo', settingController.getBasicInfo);


/**
 * @swagger
 * /api/settings/changePassword:
 *  put:
 *    description: Used to change password AdminInfo in DB
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: Change Password
 *        description: Change password in DB.
 *        schema:
 *          type: object
 *          required:
 *            - password
 *          properties:
 *            password:
 *              type: string
 *            reEnterPassword:
 *              type: string
 *    responses:
 *      '200':
 *        description: AdminInfo updated successfully.
 */
router.put('/changePassword', settingController.changePassword);

module.exports = router;