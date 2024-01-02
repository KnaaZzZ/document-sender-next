import mongoose, { Schema } from "mongoose";

const connectionSchema = new Schema({
    usersIds: [String]
});

const Connection = mongoose.models.Connection || mongoose.model("Connection", connectionSchema, "connections");

export default Connection;