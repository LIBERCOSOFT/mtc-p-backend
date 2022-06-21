import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const driverSchema = mongoose.Schema(
  {
    personal: {
      fullName: String,
      contact: Number,
      location: String,
      gender: String,
      age: Number,
      licenseNumber: String,
    },
    pin: {
      type: String,
      required: true,
    },
    vehicle: {
      carModel: String,
      modelYear: Number,
      plateNumber: String,
    },
    resourcesInterest: {
      type: Array,
    },
    payment: {
      amountPaid: String,
      weeklyPayment: String,
      paymentMode: String,
      momoNumber: Number,
    },
    resourcesAllocation: {
      type: Array,
    },
    uniqueID: {
      type: String,
      required: true,
    },
    registeredBy: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

// driverSchema.methods.matchPin = async function (enteredPin) {
//   return await bcrypt.compare(enteredPin, this.pin)
// }

driverSchema.pre('save', async function (next) {
  if (!this.isModified('pin')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.pin = await bcrypt.hash(this.pin, salt)
})

const Driver = mongoose.model('Driver', driverSchema)

export default Driver
