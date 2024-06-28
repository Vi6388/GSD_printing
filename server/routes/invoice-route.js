const express = require('express');
const controller = require('../controllers/invoice-controller.js');

const router = express.Router();

/**
 * @swagger
 * /api/invoice/:
 *  get:
 *    description: Get all the invoice list from DB
 *    produces:
 *      - application/json
 *    responses:
 *      '200':
 *        description: invoice list fetched successfully.
 */
router.get('/', controller.getInvoiceList);


/**
 * @swagger
 * /api/invoice/:
 *  post:
 *    description: Use to add invoice in DB
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: Add invoice
 *        description: Add invoice in DB.
 *        schema:
 *          type: object
 *          required:
 *            - invoiceNumber
 *          properties:
 *            invoiceNumber:
 *              type: string
 *            issuedDate:
 *              type: date
 *            dueDate:
 *              type: date
 *            orderInfo:
 *              type: object
 *            invoiceInfo:
 *              type: object
 *            paymentDetails:
 *              type: object
 *            mileStones:
 *              type: array
 *            finalPrice:
 *              type: number
 *            taxRate:
 *              type: number
 *            discount:
 *              type: number
 *    responses:
 *      '200':
 *        description: Invoice added successfully.
 */
router.post('/', controller.create);


/**
 * @swagger
 * /api/invoice/{id}:
 *  get:
 *    description: Get invoice by id from DB
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: id    
 *    responses:
 *      '200':
 *        description: invoice fetched successfully.
 */
router.get('/:id', controller.getById);


 /**
 * @swagger
 * /api/invoice/{id}:
 *  put:
 *    description: Used to update invoice in DB
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: id        
 *      - in: body
 *        name: Update invoice
 *        description: Update invoice in DB.
 *        schema:
 *          type: object
 *          required:
 *            - invoiceNumber
 *          properties:
 *            invoiceNumber:
 *              type: string
 *            issuedDate:
 *              type: date
 *            dueDate:
 *              type: date
 *            orderInfo:
 *              type: object
 *            invoiceInfo:
 *              type: object
 *            paymentDetails:
 *              type: object
 *            mileStones:
 *              type: array
 *            finalPrice:
 *              type: number
 *            taxRate:
 *              type: number
 *            discount:
 *              type: number
 *    responses:
 *      '200':
 *        description: Invoice updated successfully.
 */
router.put('/:id', controller.update);


/**
 * @swagger
 * /api/invoice/{id}:
 *  delete:
 *    description: Removes invoice item from DB.
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: id
 *        description: Remove invoice Item from DB.
 *        schema:
 *          type: string
 *          required:
 *            - id
 *          properties:
 *            id:
 *              type: Number
 *    responses:
 *      '200':
 *        description: invoice removed successfully.
 */
router.delete('/:id', controller.delete);

module.exports = router;