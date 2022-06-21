import asyncHandler from 'express-async-handler'
import { validationResult } from 'express-validator'

import SuperAdminModel from '../models/superAdminModel.js'
import AdminModel from '../models/adminModel.js'
import MerchantModel from '../models/merchantModel.js'
import DriverModel from '../models/driverModel.js'
import generateToken from '../utils/generateToken.js'
import generateID from '../utils/generateID.js'

/**
 * @method - POST
 * @description - register a super admin
 * @route - /api/superadmin/reg
 * @access - private
 */
const registerSuperAdmin = asyncHandler(async (req, res) => {
  const superAdmin = await SuperAdminModel.findById(req.user._id)
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { email, name, password } = req.body

  if (superAdmin) {
    let SuperAdminExists = await SuperAdminModel.findOne({ email })

    if (SuperAdminExists) {
      res.status(400)
      throw new Error('Super Admin already exists')
    }

    const newSuperAdmin = new SuperAdminModel({
      email,
      name,
      password,
    })

    const saveSuperAdmin = await newSuperAdmin.save()

    if (saveSuperAdmin) {
      res.status(201).json({
        ...saveSuperAdmin._doc,
      })
    } else {
      res.status(400)
      throw new Error('Invalid Super Admin details')
    }
  } else {
    res.status(404)
    throw new Error('User Not Found')
  }
})

/**
 * @method - POST
 * @description - register a super admin
 * @route - /api/superadmin/reg
 * @access - private
 */
const registerAdmin = asyncHandler(async (req, res) => {
  const superAdmin = await SuperAdminModel.findById(req.user._id)
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { email, name, password } = req.body

  if (superAdmin) {
    let AdminExists = await AdminModel.findOne({ email })

    if (AdminExists) {
      res.status(400)
      throw new Error('Admin already exists')
    }

    const newAdmin = new AdminModel({
      email,
      name,
      password,
    })

    const saveAdmin = await newAdmin.save()

    if (saveAdmin) {
      res.status(201).json({
        ...saveAdmin._doc,
      })
    } else {
      res.status(400)
      throw new Error('Invalid Admin details')
    }
  } else {
    res.status(404)
    throw new Error('User Not Found')
  }
})

/**
 * @method - POST
 * @description - log super admin in and get token
 * @route - /api/superadmin/login
 * @access - public
 */
const loginSuperAdmin = asyncHandler(async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { email, password } = req.body

  try {
    let superAdminUser = await SuperAdminModel.findOne({ email })

    if (superAdminUser && (await superAdminUser.matchPassword(password))) {
      res.json({
        _id: superAdminUser._id,
        name: superAdminUser.name,
        email: superAdminUser.email,
        token: generateToken(superAdminUser._id),
      })
    } else {
      res.status(401)
      throw new Error('Invalid Super Admin Email or Password')
    }
  } catch (err) {
    res.status(400)
    throw new Error(err.message)
  }
})

/**
 * @method - POST
 * @description - super admin registers a driver
 * @route - /api/superadmin/driver/reg
 * @access - private (Super Admin)
 */
const registerDriver = asyncHandler(async (req, res) => {
  const superAdmin = await SuperAdminModel.findById(req.user._id)
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { fullName, contact, location, gender, age, licenseNumber } =
    req.body.personal
  const { pin } = req.body
  const { carModel, modelYear, plateNumber } = req.body.vehicle
  const { resourcesInterest } = req.body
  const { amountPaid, weeklyPayment, paymentMode, momoNumber } =
    req.body.payment
  const { resourcesAllocation } = req.body
  const uniqueID = `MTC-${generateID()}`

  if (superAdmin) {
    let driverExists = await DriverModel.findOne({
      'personal.licenseNumber': licenseNumber,
    })

    if (driverExists) {
      res.status(400)
      throw new Error('Driver already exists')
    }

    const newDriver = new DriverModel({
      personal: { fullName, contact, location, gender, age, licenseNumber },
      pin,
      vehicle: { carModel, modelYear, plateNumber },
      resourcesInterest,
      payment: { amountPaid, weeklyPayment, paymentMode, momoNumber },
      resourcesAllocation,
      uniqueID: uniqueID,
      registeredBy: req.user._id,
    })

    const saveDriver = await newDriver.save()

    if (saveDriver) {
      res.status(201).json({
        ...saveDriver._doc,
        uniqueID,
      })
    } else {
      res.status(400)
      throw new Error("Invalid Driver's details")
    }
  } else {
    res.status(404)
    throw new Error('User Not Found')
  }
})

/**
 * @method - POST
 * @description - register a merchant
 * @route - /api/admin/merchant/reg
 * @access - private
 */
const registerMerchant = asyncHandler(async (req, res) => {
  const superAdmin = await SuperAdminModel.findById(req.user._id)
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { businessName, contactName, contactNumber, location } =
    req.body.personal
  const { productDetails } = req.body
  const { paymentMode, momoNumber, accountName } = req.body.payment
  const uniqueID = `MTC-${generateID()}`

  if (superAdmin) {
    let merchantExists = await MerchantModel.findOne({
      'personal.businessName': businessName,
    })

    if (merchantExists) {
      res.status(400)
      throw new Error('Merchant already exists')
    }

    const newMerchant = new MerchantModel({
      personal: { businessName, contactName, contactNumber, location },
      productDetails,
      payment: { paymentMode, momoNumber, accountName },
      uniqueID: uniqueID,
      registeredBy: req.user._id,
    })

    let saveMerchant = await newMerchant.save()

    if (saveMerchant) {
      res.status(201).json({
        ...saveMerchant._doc,
      })
    } else {
      res.status(400)
      throw new Error("Invalid Merchant's details")
    }
  } else {
    res.status(404)
    throw new Error(`User Not Found`)
  }
})

/**
 * @method - GET
 * @description - list of all registered merchants
 * @route - /api/admin/merchants
 * @access - private(Super Admin)
 */
const getAllMerchants = asyncHandler(async (req, res) => {
  const superAdmin = await SuperAdminModel.findById(req.user._id)
  if (superAdmin) {
    const merchants = await MerchantModel.find({})
    res.json(merchants)
  } else {
    res.status(404)
    throw new Error('User Not Found')
  }
})

/**
 * @method - GET
 * @description - list of all registered drivers
 * @route - /api/admin/drivers
 * @access - private(Super Admin)
 */
const getAllDrivers = asyncHandler(async (req, res) => {
  const superAdmin = await SuperAdminModel.findById(req.user._id)
  if (superAdmin) {
    const drivers = await DriverModel.find({})
    res.json(drivers)
  } else {
    res.status(404)
    throw new Error('User Not Found')
  }
})

/**
 * @method - GET
 * @description - list of all active drivers
 * @route - /api/admin/activedrivers
 * @access - private(Super Admin)
 */
const getActiveDrivers = asyncHandler(async (req, res) => {
  const superAdmin = await SuperAdminModel.findById(req.user._id)
  if (superAdmin) {
    const drivers = await DriverModel.find({}).select('-pin -__v')
    let activeDrivers = []
    drivers.map((driver) => {
      let today = Date.now()
      let driverDate = new Date(driver.updatedAt).getTime()
      let numberOfDays = Math.ceil((today - driverDate) / 8.64e7)
      if (numberOfDays < 7) {
        activeDrivers.push(driver)
      }
    })
    res.json(activeDrivers)
  } else {
    res.status(404)
    throw new Error('User Not Found')
  }
})

/**
 * @method - GET
 * @description - list of all inactive drivers
 * @route - /api/admin/inactivedrivers
 * @access - private(Super Admin)
 */
const getInactiveDrivers = asyncHandler(async (req, res) => {
  const superAdmin = await SuperAdminModel.findById(req.user._id)
  if (superAdmin) {
    const drivers = await DriverModel.find({}).select('-pin -__v')
    let inactiveDrivers = []
    drivers.map((driver) => {
      let today = Date.now()
      let driverDate = new Date(driver.updatedAt).getTime()
      let numberOfDays = Math.ceil((today - driverDate) / 8.64e7)
      if (numberOfDays > 7) {
        inactiveDrivers.push(driver)
      }
    })
    res.json(inactiveDrivers)
  } else {
    res.status(404)
    throw new Error('User Not Found')
  }
})

/**
 * @method - GET
 * @description - list of amount paid by all drivers
 * @route - /api/admin/driversamount
 * @access - private(Super Admin)
 */
const getDriversAmount = asyncHandler(async (req, res) => {
  const superAdmin = await SuperAdminModel.findById(req.user._id)
  if (superAdmin) {
    const drivers = await DriverModel.find({})
    let driversAmount = []
    drivers.map((driver) => {
      driversAmount.push([driver._id, driver.uniqueID, driver.payment])
    })
    res.json(driversAmount)
  } else {
    res.status(404)
    throw new Error('User Not Found')
  }
})

export {
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
}
