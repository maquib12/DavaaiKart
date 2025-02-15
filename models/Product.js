import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    composition: {
      type: String,
      required: true,
    },
    manufacturer: {
      type: String,
      required: true,
      trim: true,
    },
    consumeType: {
      type: String,
      enum: ["Oral", "Injection", "Topical", "Inhaler"],
      required: true,
    },
    returnPolicy: {
      type: String,
      default: "No returns allowed",
    },
    expires: {
      type: Date,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    numberOfProducts: {
      type: Number,
      required: true,
      min: 0,
    },
    packetSize: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    supply: {
      type: Number,
      required: true,
      min: 0,
    },
    image: {
      type: String,
      required: false,
    },
    images: {
      type: [String],
      required: false,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);
export default Product;
