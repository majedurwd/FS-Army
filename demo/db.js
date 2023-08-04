const mongoose = require("mongoose")

// DB_URI="db/data.json"
// DB_USERNAME="my-blog-api-app"
// DB_PASSWORD="p7VDzCrneUFNMfph"
// DB_CONNECTION_URL="mongodb+srv://<username>:<password>@cluster0.cxrteg1.mongodb.net"
// DB_URL_QUERY="retryWrites=true&w=majority"
// DB_NAME="MyBlogAPI"

const generateConnectionString = () => {
    const connectionURL = process.env.DB_CONNECTION_URL
    const name = process.env.DB_NAME
    const query = process.env.DB_URL_QUERY

    return `${connectionURL}/${name}?${query}`
}

const connect = async () => {
    const url = generateConnectionString()
    const options = { autoIndex: false }
    await mongoose.connect(url, options)
    console.log("Database connected");
}

module.exports = connect 