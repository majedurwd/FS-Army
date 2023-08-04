const { Schema, model } = require("mongoose")

const userSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    status: {
        type: String,
        enum: ["pending", "approved", "decline", "block"],
        default: "pending"
    }
}, { timestamps: true })

const User = model("User", userSchema)
module.exports = User