const { Schema, model } = require("mongoose")

const commentSchema = new Schema({
    authorId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    articleId: {
        type: Schema.Types.ObjectId,
        ref: "Article"
    },
    body: {
        type: String
    },
    status: {
        type: String,
        enum: ["public", "private"]
    }
}, { timestamps: true })

const Comment = model("Comment", commentSchema)
module.exports = Comment