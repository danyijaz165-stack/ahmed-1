import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IOrderItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

export interface ICustomer {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  postalCode: string
  country: string
  paymentMethod: string
}

export interface IOrder extends Document {
  userId?: string
  items: IOrderItem[]
  customer: ICustomer
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  createdAt: Date
  updatedAt: Date
}

const OrderItemSchema: Schema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  quantity: { type: Number, required: true },
})

const CustomerSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
  paymentMethod: { type: String, required: true },
})

const OrderSchema: Schema = new Schema(
  {
    userId: {
      type: String,
      required: false,
    },
    items: [OrderItemSchema],
    customer: CustomerSchema,
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
)

const Order: Model<IOrder> = mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema)

export default Order

