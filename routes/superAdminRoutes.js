import express from 'express'
import { body } from 'express-validator'

const router = express.Router()

import {
  registerSuperAdmin,
  registerAdmin,
  registerDriver,
  registerMerchant,
  loginSuperAdmin,
  getAllMerchants,
  getAllDrivers,
  getActiveDrivers,
  getInactiveDrivers,
  getDriversAmount,
} from '../controllers/superAdminControllers.js'

import { superProtect } from '../middleware/authMiddleware.js'

/**
 * @method - POST
 * @parameter - /api/superadmin/reg
 * @description - registers a super admin
 * @type - Private (Super Admin)
 */
router.post(
  '/reg',
  [
    body('email', 'Valid Email Not Provided').isEmail().not().isEmpty(),
    body('name', 'Valid Name(s) Not Provided').isString().not().isEmpty(),
    body('password', 'Valid Password Not Provided').isString().not().isEmpty(),
  ],
  superProtect,
  registerSuperAdmin
)

/**
 * @method - POST
 * @parameter - /api/superadmin/admin/reg
 * @description - registers an admin
 * @type - Private (Super Admin)
 */
router.post(
  '/admin/reg',
  [
    body('email', 'Valid Email Not Provided').isEmail().not().isEmpty(),
    body('name', 'Valid Name(s) Not Provided').isString().not().isEmpty(),
    body('password', 'Valid Password Not Provided').isString().not().isEmpty(),
  ],
  superProtect,
  registerAdmin
)

/**
 * @method - POST
 * @parameter - /api/superadmin/driver/reg
 * @description - route for driver's registration
 * @type - Private (Super Admins)
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
  superProtect,
  registerDriver
)

/**
 * @method - POST
 * @parameter - /api/superadmin/merchant/reg
 * @description - route for merchant's registration
 * @type - Private (Super Admins)
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
  superProtect,
  registerMerchant
)

/**
 * @method - POST
 * @parameter - /api/superadmin/login
 * @description - logs super admin in and gets token
 * @type - Public
 */
router.post(
  '/login',
  [
    body('email', 'Valid Email Not Provided').isEmail().not().isEmpty(),
    body('password', 'Valid Password Not Provided').isString().not().isEmpty(),
  ],
  loginSuperAdmin
)

/**
 * @method - GET
 * @parameter - /api/superadmin/merchants
 * @description - gets all registered merchants
 * @type - Private
 */
router.get('/merchants', superProtect, getAllMerchants)

/**
 * @method - GET
 * @parameter - /api/superadmin/drivers
 * @description - gets all registered drivers
 * @type - Private
 */
router.get('/drivers', superProtect, getAllDrivers)

/**
 * @method - GET
 * @parameter - /api/superadmin/activedrivers
 * @description - gets all active registered drivers
 * @type - Private
 */
router.get('/activedrivers', superProtect, getActiveDrivers)

/**
 * @method - GET
 * @parameter - /api/superadmin/inactivedrivers
 * @description - gets all inactive registered drivers
 * @type - Private
 */
router.get('/inactivedrivers', superProtect, getInactiveDrivers)

/**
 * @method - GET
 * @parameter - /api/superadmin/driversamount
 * @description - gets all active registered drivers
 * @type - Private
 */
router.get('/driversamount', superProtect, getDriversAmount)

export default router
