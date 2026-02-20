import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    id: Number,
    title: String,
    price: Number,
    description: String,
    category: String,
    image: String,
    rating: {
      rate: Number,
      count: Number,
    },
  },
  { versionKey: false, collection: "Products" },
);

export default mongoose.models.Products ||
  mongoose.model("Products", ProductSchema);
