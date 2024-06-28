const express = require('express');
const paperTypeController = require('../controllers/paperType-controller.js');

const router = express.Router();

/**
 * @swagger
 * /api/paperType/:
 *  get:
 *    description: Get all the paper Type list from DB
 *    produces:
 *      - application/json
 *    responses:
 *      '200':
 *        description: paper Type list fetched successfully.
 */
router.get('/', paperTypeController.getPaperTypeList);


/**
 * @swagger
 * /api/paperType/:
 *  post:
 *    description: Use to add paper type in DB
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: Add paper type
 *        description: Add paper type in DB.
 *        schema:
 *          type: object
 *          required:
 *            - paperName
 *          properties:
 *            paperImage:
 *              type: string
 *            paperName:
 *              type: string
 *            paperType:
 *              type: string
 *    responses:
 *      '200':
 *        description: PaperType added successfully.
 */
router.post('/', paperTypeController.createPaperType);


/**
 * @swagger
 * /api/paperType/{id}:
 *  get:
 *    description: Get paperType by id from DB
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: _id    
 *    responses:
 *      '200':
 *        description: paperType fetched successfully.
 */
router.get('/:id', paperTypeController.getPaperType);


 /**
 * @swagger
 * /api/paperType/{id}:
 *  put:
 *    description: Used to update paperType in DB
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: id        
 *      - in: body
 *        name: Update paperType
 *        description: Update paperType in DB.
 *        schema:
 *          type: object
 *          required:
 *            - _id
 *          properties:
 *            paperImage:
 *              type: string
 *            paperName:
 *              type: string
 *            paperType:
 *              type: string
 *    responses:
 *      '200':
 *        description: PaperType updated successfully.
 */
router.put('/:id', paperTypeController.updatePaperType);


/**
 * @swagger
 * /api/paperType/{id}:
 *  delete:
 *    description: Removes paper type item from DB.
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: id
 *        description: Remove PaperType Item from DB.
 *        schema:
 *          type: string
 *          required:
 *            - _id
 *          properties:
 *            _id:
 *              type: Number
 *    responses:
 *      '200':
 *        description: PaperType removed successfully.
 */
router.delete('/:id', paperTypeController.deletePaperType);

module.exports = router;