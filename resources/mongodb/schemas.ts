import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,

    connectionsIds: [String],
    pendingConnectionsIds: [[String]],
    savedDocuments: [{name: String, path: String}],
    logs: [{}],

    sessionId: String,
    verification: Boolean,
    firstTime: Boolean,
    logoutAfter: Number
});

const connectionSchema = new Schema({
    usersIds: [String],
    requests: [[String]]
});

const sessionSchema = new Schema({
    invalidAt: Date,

    userId: String,
    token: String
});

export const User = mongoose.models.User || mongoose.model("User", userSchema, "users");
export const Connection = mongoose.models.Connection || mongoose.model("Connection", connectionSchema, "connections");
export const Session = mongoose.models.Session || mongoose.model("Session", sessionSchema, "sessions");

