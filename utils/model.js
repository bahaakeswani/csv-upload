import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserModel = new Schema({
  userEmail: { type: String },
  userPassword: { type: String },
});

export default mongoose.model("registered_users", UserModel);
