const fs = require("fs/promises")
const path = require("path")

const dbUri = path.resolve(process.env.DB_URI)
class DatabaseConnection {
    constructor(dbUri) {
        this.db = null
        this.dbUri = dbUri
    }

    async connect() {
        const dbData = await fs.readFile(this.dbUri, { encoding: "utf-8" })
        this.db = JSON.parse(dbData)
    }

    async write() {
        if (this.db) {
            this.db = await fs.writeFile(this.dbUri, JSON.stringify(this.db))
        }
    }

}

const databaseConnection = new DatabaseConnection(dbUri)
module.exports = databaseConnection
