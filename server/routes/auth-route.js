const express = require('express');
const controller = require("../controllers/auth-controller.js");

const router = express.Router();

/**
 * @swagger
 * /api/auth/register/:
 *  post:
 *    description: Register User in DB
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: Register User
 *        description: Register User in DB.
 *        schema:
 *          type: object
 *          required:
 *            - email
 *            - password
 *            - firstName
 *            - lastName
 *          properties:
 *            email:
 *              type: string
 *            password:
 *              type: string
 *            firstName:
 *              type: string
 *            lastName:
 *              type: string
 *    responses:
 *      '200':
 *        description: User registered successfully.
 */
router.post('/register', controller.register);

/**
 * @swagger
 * /api/auth/login/:
 *  post:
 *    description: Login User
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: Register User
 *        description: Login User
 *        schema:
 *          type: object
 *          required:
 *            - email
 *            - password
 *          properties:
 *            email:
 *              type: string
 *            password:
 *              type: string
 *    responses:
 *      '200':
 *        description: Login user successfully.
 */
router.post("/login", controller.login);

/**
 * @swagger
 * /api/auth/refreshToken/:
 *  post:
 *    description: Refresh Token info
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name:  Refresh Token info
 *        description:  Refresh Token info
 *        schema:
 *          type: object
 *          required:
 *            - refreshToken
 *          properties:
 *            refreshToken:
 *              type: string
 *    responses:
 *      '200':
 *        description: Refresh Token successfully.
 */
router.post("/refreshToken", controller.refreshToken);

/**
 * @swagger
 * /api/user/changePassword:
 *  put:
 *    description: Used to change password User in DB
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
 *        description: User updated successfully.
 */
router.post('/userChangePassword', controller.userChangePassword);

module.exports = router;