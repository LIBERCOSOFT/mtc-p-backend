import express from 'express'
import { body } from 'express-validator'

const router = express.Router()

import {
  loginAdmin,
  registerDriver,
  registerMerchant,
} from '../controllers/adminControllers.js'
import { admin } from '../middleware/authMiddleware.js'

/**
 * @method - POST
 * @parameter - /api/admin/login
 * @description - logs sadmin in and gets token
 * @type - Public
 */
router.post(
  '/login',
  [
    body('email', 'Valid Email Not Provided').isEmail().not().isEmpty(),
    body('password', 'Valid Password Not Provided').isString().not().isEmpty(),
  ],
  loginAdmin
)

/**
 * @method - POST
 * @parameter - /api/admin/driver/reg
 * @description - route for driver's registration
 * @type - Private (Admins)
 */
router.post(
  '/driver/reg',
  [
    body('personal.fullName', 'Valid String Input Not Provided')
      .isString()
      .not()
      .isEmpty(),
    body('personal.contact', 'Valid Numeric Input Not Provided')
      .isNumeric()
      .not()
      .isEmpty(),
    body('personal.location', 'Valid String Input Not Provided')
      .isString()
      .not()
      .isEmpty(),
    body('personal.gender', 'Valid String Input Not Provided')
      .isString()
      .not()
      .isEmpty(),
    body('personal.age', 'Valid Numeric Input Not Provided')
      .isNumeric()
      .not()
      .isEmpty(),
    body('personal.licenseNumber', 'Valid String Input Not Provided')
      .isString()
      .not()
      .isEmpty(),
    body('pin', 'Valid Numeric Input Not Provided')
      .isNumeric()
      .not()
      .isEmpty()
      .isLength({
        min: 4,
        max: 4,
      }),
    body('vehicle.carModel', 'Valid String Input Not Provided')
      .isString()
      .not()
      .isEmpty(),
    body('vehicle.modelYear', 'Valid Numeric Input Not Provided')
      .isNumeric()
      .not()
      .isEmpty(),
    body('vehicle.plateNumber', 'Valid String Input Not Provided')
      .isString()
      .not()
      .isEmpty(),
    body('resourcesInterest', 'Valid List/Array of Input Not provided')
      .isArray()
      .not()
      .isEmpty(),
    body('payment.amountPaid', 'Valid Input Not Provided')
      .isString()
      .not()
      .isEmpty(),
    body('payment.weeklyPayment', 'Valid  Input Not Provided')
      .isString()
      .not()
      .isEmpty(),
    body('payment.paymentMode', 'Valid String Input Not Provided')
      .isString()
      .not()
      .isEmpty(),
    body('resourcesAllocation', 'Valid List/Array of Input Not Provided')
      .isArray()
      .not()
      .isEmpty(),
  ],
  admin,
  registerDriver
)

/**
 * @method - POST
 * @parameter - /api/admin/merchant/reg
 * @description - route for merchant's registration
 * @type - Private (Admins)
 */
router.post(
  '/merchant/reg',
  [
    body('personal.businessName', 'Valid String Input Not Provided')
      .isString()
      .not()
      .isEmpty(),
    body('personal.contactName', 'Valid Numeric Input Not Provided')
      .isString()
      .not()
      .isEmpty(),
    body('personal.contactNumber', 'Valid String Input Not Provided')
      .isNumeric()
      .not()
      .isEmpty(),
    body('personal.location', 'Valid String Input Not Provided')
      .isString()
      .not()
      .isEmpty(),
    body('productDetails', 'Valid List/Array of Input Not provided')
      .isArray()
      .not()
      .isEmpty(),
    body('payment.paymentMode', 'Valid Input Not Provided')
      .isString()
      .not()
      .isEmpty(),
    body('payment.momoNumber', 'Valid Numeric Input Not Provided')
      .isNumeric()
      .not()
      .isEmpty(),
    body('payment.accountName', 'Valid String Input Not Provided')
      .isString()
      .not()
      .isEmpty(),
  ],
  admin,
  registerMerchant
)

export default router
