import asyncHandler from 'express-async-handler'
import { validationResult } from 'express-validator'

import MerchantModel from '../models/merchantModel.js'
import generateID from '../utils/generateID.js'
