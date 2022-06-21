import asyncHandler from 'express-async-handler'
import { validationResult } from 'express-validator'

import AdminModel from '../models/adminModel.js'
import MerchantModel from '../models/merchantModel.js'
import DriverModel from '../models/driverModel.js'
import generateToken from '../utils/generateToken.js'
import generateID from '../utils/generateID.js'

/**
 * @method - POST
 * @description - log admin in and get token
 * @route - /api/admin/login
 * @access - public
 */
const loginAdmin = asyncHandler(async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { email, password } = req.body

  try {
    let adminUser = await AdminModel.findOne({ email })

    if (adminUser && (await adminUser.matchPassword(password))) {
      res.json({
        _id: adminUser._id,
        name: adminUser.name,
        email: adminUser.email,
        token: generateToken(adminUser._id),
      })
    } else {
      res.status(401)
      throw new Error('Invalid Admin Email or Password')
    }
  } catch (err) {
    res.status(400)
    throw new Error(err.message)
  }
})

/**
 * @method - POST
 * @description - register a driver
 * @route - /api/admin/driver/reg
 * @access - private (Admin)
 */
const registerDriver = asyncHandler(async (req, res) => {
  const admin = await AdminModel.findById(req.user._id)
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

  if (admin) {
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
  const admin = await AdminModel.findById(req.user._id)
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { businessName, contactName, contactNumber, location } =
    req.body.personal
  const { productDetails } = req.body
  const { paymentMode, momoNumber, accountName } = req.body.payment
  const uniqueID = `MTC-${generateID()}`

  if (admin) {
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

export { loginAdmin, registerDriver, registerMerchant }
