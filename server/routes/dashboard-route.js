const express = require('express');
const controller = require('../controllers/dashboard-controller');

const router = express.Router();

/**
 * @swagger
 * /api/dashboard/getDashboardInfo:
 *  get:
 *    description: Get Total product count from DB
 *    produces:
 *      - application/json
 *    responses:
 *      '200':
 *        description: Total product count fetched successfully.
 */
router.get('/getDashboardInfo', controller.getDashboardInfo);

module.exports = router;