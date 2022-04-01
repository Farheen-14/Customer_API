const express = require('express')
const router = express.Router()
const customerControl = require('../controller/customerController')

//define the routes for end points 
router.get('/', customerControl.getSupportQuery)
router.get('/list', customerControl.getFilterData)

module.exports = router;