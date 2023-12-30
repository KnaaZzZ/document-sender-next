import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,

    connectionsIds: [String]
});

const User = mongoose.models.User || mongoose.model("User", userSchema, "users");

export default User;