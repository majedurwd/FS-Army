require("dotenv").config()
const connect = require("./db")

const main = async () => {
    await connect()
}

main()