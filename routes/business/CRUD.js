const express = require('express')
const router = express.Router();
const businessControllers = require('../../controllers/business.controller')
const {isUserAuth}= require('../../middleware/authuser')

router.route('/createBusiness').post( isUserAuth,businessControllers.createBusiness );
router.route('/updatebusiness').put(isUserAuth,businessControllers.updateBusiness );
router.route('/deletebusiness').delete(isUserAuth,businessControllers.deleteBusiness );
router.route('/getbusiness').get(isUserAuth,businessControllers.getBusiness );


module.exports = router;