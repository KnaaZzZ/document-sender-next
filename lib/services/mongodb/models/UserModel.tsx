import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    email: String,
    password: String,

    connectionsIds: [String]
});

const User = mongoose.models.User || mongoose.model("User", userSchema, "users");

export default User;