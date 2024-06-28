const express = require('express');
const controller = require('../controllers/user-controller.js');

const router = express.Router();

/**
 * @swagger
 * /api/user/:
 *  get:
 *    description: Get all the list from DB
 *    produces:
 *      - application/json
 *    responses:
 *      '200':
 *        description: list fetched successfully.
 */
router.get('/', controller.getUserList);


/**
 * @swagger
 * /api/user/:
 *  post:
 *    description: Use to add User in DB
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: Add User
 *        description: Add User in DB.
 *        schema:
 *          type: object
 *          required:
 *            - email
 *          properties:
 *            profileImage:
 *              type: string
 *            firstName:
 *              type: string
 *            lastName:
 *              type: string
 *            email:
 *              type: string
 *            phoneNumber:
 *              type: string
 *    responses:
 *      '200':
 *        description: User added successfully.
 */
router.post('/', controller.createUser);


/**
 * @swagger
 * /api/user/{id}:
 *  get:
 *    description: Get User by id from DB
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: id    
 *    responses:
 *      '200':
 *        description: User fetched successfully.
 */
router.get('/:id', controller.getUserById);


/**
 * @swagger
 * /api/user/{id}:
 *  put:
 *    description: Used to update User in DB
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: id        
 *      - in: body
 *        name: Update User
 *        description: Update User in DB.
 *        schema:
 *          type: object
 *          required:
 *            - email
 *          properties:
 *            profileImage:
 *              type: string
 *            firstName:
 *              type: string
 *            lastName:
 *              type: string
 *            email:
 *              type: string
 *            phoneNumber:
 *              type: string
 *    responses:
 *      '200':
 *        description: User updated successfully.
 */
router.put('/:id', controller.updateUser);


/**
 * @swagger
 * /api/user/{id}:
 *  delete:
 *    description: Removes User item from DB.
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: id
 *        description: Remove User Item from DB.
 *        schema:
 *          type: string
 *          required:
 *            - id
 *          properties:
 *            id:
 *              type: Number
 *    responses:
 *      '200':
 *        description: User removed successfully.
 */
router.delete('/:id', controller.deleteUser);

module.exports = router;