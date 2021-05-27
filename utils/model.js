import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserModel = new Schema({
  userName: { type: String },
  userEmail: { type: String },
  userPassword: { type: String },
  userCSV: {},
  date: { type: String },
});

export default mongoose.model("registered_users", UserModel);
