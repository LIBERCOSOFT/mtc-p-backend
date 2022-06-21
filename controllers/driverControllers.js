import asyncHandler from 'express-async-handler'
import { validationResult } from 'express-validator'

import generateToken from '../utils/generateToken.js'
import DriverModel from '../models/driverModel.js'
