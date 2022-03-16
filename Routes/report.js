const express = require("express");
const router = express.Router();
const {addReport, getReport} = require('../controller/report');


// router.route('/add')
//         .post(addReport)
        
router.post('/add',addReport);
router.get('/',getReport);       



module.exports = router;