import mongoose from 'mongoose'
const Schema = mongoose.Schema

const MerchantSchema = new Schema(
  {
    personal: {
      businessName: String,
      contactName: String,
      contactNumber: Number,
      location: String,
    },
    productDetails: {
      type: Array,
    },
    payment: {
      paymentMode: String,
      momoNumber: Number,
      accountName: String,
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

const Merchant = mongoose.model('Merchant', MerchantSchema)

export default Merchant
