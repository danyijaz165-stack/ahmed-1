import mongoose, { Schema, Document, Model } from 'mongoose'

export interface ICartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

export interface ICart extends Document {
  userId: string
  items: ICartItem[]
  createdAt: Date
  updatedAt: Date
}

const CartItemSchema: Schema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  quantity: { type: Number, required: true, default: 1 },
})

const CartSchema: Schema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    items: [CartItemSchema],
  },
  {
    timestamps: true,
  }
)

const Cart: Model<ICart> = mongoose.models.Cart || mongoose.model<ICart>('Cart', CartSchema)

export default Cart

