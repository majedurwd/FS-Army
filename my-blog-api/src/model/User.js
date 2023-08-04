const { Schema, model } = require("mongoose")

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			enum: ['user', 'admin'],
			default: 'user',
		},
		status: {
			type: String,
			enum: ['pending', 'approved', 'decline', 'block'],
			default: 'pending',
		},
	},
	{ timestamps: true }
);

const User = model("User", userSchema)
module.exports = User