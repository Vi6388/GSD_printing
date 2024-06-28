const express = require('express');
const controller = require('../controllers/transaction-controller.js');

const router = express.Router();

/**
 * @swagger
 * /api/transaction/:
 *  get:
 *    description: Get all the list from DB
 *    produces:
 *      - application/json
 *    responses:
 *      '200':
 *        description: list fetched successfully.
 */
router.get('/', controller.fetchTransactionList);


/**
 * @swagger
 * /api/transaction/{id}:
 *  get:
 *    description: Get Transaction by productID from DB
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: id    
 *    responses:
 *      '200':
 *        description: Transaction list by productID fetched successfully.
 */
router.get('/:id', controller.getTransactionByProductID);


/**
 * @swagger
 * /api/transaction/{id}:
 *  delete:
 *    description: Removes Transaction item from DB.
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: id
 *        description: Remove Transaction Item from DB.
 *        schema:
 *          type: string
 *          required:
 *            - id
 *          properties:
 *            id:
 *              type: Number
 *    responses:
 *      '200':
 *        description: Transaction removed successfully.
 */
router.delete('/:id', controller.deleteTransaction);


module.exports = router;