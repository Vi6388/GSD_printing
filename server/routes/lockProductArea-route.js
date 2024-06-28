const express = require('express');
const controller = require('../controllers/lockProductArea-controller.js');

const router = express.Router();

/**
 * @swagger
 * /api/lockProductArea/:
 *  get:
 *    description: Get all the list from DB
 *    produces:
 *      - application/json
 *    responses:
 *      '200':
 *        description: list fetched successfully.
 */
router.get('/', controller.getLockProductAreaList);


/**
 * @swagger
 * /api/lockProductArea/:
 *  post:
 *    description: Use to add lockProductArea in DB
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: Add lockProductArea
 *        description: Add lockProductArea in DB.
 *        schema:
 *          type: object
 *          required:
 *            - productID
 *            - categoryID
 *            - subCategoryID
 *            - paperTypeID
 *          properties:
 *            productID:
 *              type: number
 *            categoryID:
 *              type: number
 *            subCategoryID:
 *              type: number
 *            status:
 *              type: object
 *    responses:
 *      '200':
 *        description: LockProductArea added successfully.
 */
router.post('/', controller.createLockProductArea);


/**
 * @swagger
 * /api/lockProductArea/{id}:
 *  get:
 *    description: Get lockProductArea by id from DB
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: id    
 *    responses:
 *      '200':
 *        description: LockProduct fetched successfully.
 */
router.get('/:id', controller.getLockProductArea);


 /**
 * @swagger
 * /api/lockProductArea/{id}:
 *  put:
 *    description: Used to update lockProductArea in DB
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: id        
 *      - in: body
 *        name: Update lockProductArea
 *        description: Update lockProductArea in DB.
 *        schema:
 *          type: object
 *          required:
 *            - productID
 *            - categoryID
 *            - subCategoryID
 *            - paperTypeID
 *          properties:
 *            productID:
 *              type: number
 *            categoryID:
 *              type: number
 *            subCategoryID:
 *              type: number
 *            status:
 *              type: object
 *    responses:
 *      '200':
 *        description: LockProductArea updated successfully.
 */
router.put('/:id', controller.updateLockProductArea);


/**
 * @swagger
 * /api/lockProductArea/{id}:
 *  delete:
 *    description: Removes lockProductArea item from DB.
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: id
 *        description: Remove lockProductArea Item from DB.
 *        schema:
 *          type: string
 *          required:
 *            - id
 *          properties:
 *            id:
 *              type: Number
 *    responses:
 *      '200':
 *        description: LockProductArea removed successfully.
 */
router.delete('/:id', controller.deleteLockProductArea);


module.exports = router;