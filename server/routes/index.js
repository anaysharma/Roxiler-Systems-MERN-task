const express = require('express');
const barchart = require('../controllers/barchart');
const combined = require('../controllers/combined');
const initialize = require('../controllers/initialize');
const piechart = require('../controllers/piechart');
const statistics = require('../controllers/statistics');
const transactions = require('../controllers/transactions');

const router = express.Router();

router.get('/initialize', initialize);
router.get('/transactions', transactions);
router.get('/statistics', statistics);
router.get('/barchart', barchart);
router.get('/piechart', piechart);
router.get('/combined', combined);

module.exports = router;
