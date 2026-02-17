import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    role: String,
  },
  { versionKey: false, collection: "Admin" },
);

export default mongoose.models.Admin || mongoose.model("Admin", UserSchema);
