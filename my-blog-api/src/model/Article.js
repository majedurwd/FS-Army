const { Schema, model } = require("mongoose")

const articleSchema = new Schema(
	{
		author: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		title: {
			type: String,
		},
		body: {
			type: String,
		},
		status: {
			type: String,
			enum: ['draft', 'published'],
			default: 'draft',
		},
	},
	{ timestamps: true, strict: false }
);

const Article = model("Article", articleSchema)
module.exports = Article