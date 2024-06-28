const express = require('express');
const controller = require("../controllers/adminInfo-controller");

const router = express.Router();

/**
 * @swagger
 * /api/adminInfo/:
 *  get:
 *    description: Get AdminInfo in DB
 *    produces:
 *      - application/json
 *    responses:
 *      '200':
 *        description: AdminInfo fetched successfully.
 */
router.get('/', controller.getAdminInfoByID);

/**
 * @swagger
 * /api/adminInfo/save:
 *  post:
 *    description: Save AdminInfo
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: Save AdminInfo
 *        description: Save AdminInfo
 *        schema:
 *          type: object
 *          properties:
 *            profileDetails:
 *              type: object
 *              properties:
 *                profileImage:
 *                  type: string
 *                firstname:
 *                  type: string
 *                lastname:
 *                  type: string
 *                phoneNumber:
 *                  type: string
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 *                address:
 *                  type: string
 *                state:
 *                  type: string
 *                zipCode:
 *                  type: string
 *                country:
 *                  type: string
 *                language:
 *                  type: string
 *                timezone:
 *                  type: string
 *                currency:
 *                  type: number
 *            companyDetails:
 *              type: object
 *              properties:
 *                logo:
 *                  type: string
 *                headerLogo:
 *                  type: string
 *                companyName:
 *                  type: string
 *                corporateName:
 *                  type: string
 *                taxID:
 *                  type: string
 *                phoneNumber:
 *                  type: string
 *                alternativeNumber:
 *                  type: string
 *                address:
 *                  type: string
 *                state:
 *                  type: string
 *                zipCode:
 *                  type: string
 *                country:
 *                  type: string
 *                currency:
 *                  type: number
 *    responses:
 *      '200':
 *        description: Save AdminInfo successfully.
 */
router.post("/save", controller.save);

/**
 * @swagger
 * /api/adminInfo/changePassword:
 *  post:
 *    description: Change Password
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: Change Password
 *        description: Change Password
 *        schema:
 *          type: object
 *          required:
 *            - currentPassword
 *            - newPassword
 *          properties:
 *            currentPassword:
 *              type: string
 *            newPassword:
 *              type: string
 *    responses:
 *      '200':
 *        description: Change Password successfully.
 */
router.post("/changePassword", controller.resetPassword);

module.exports = router;