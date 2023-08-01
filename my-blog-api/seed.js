const { faker } = require("@faker-js/faker")
const User = require("./model/User")

const seedUser = (numOfUser=5) => {
    for (let i = 0; i < numOfUser; i++) {
        const user = new User({
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password()
        })
        user.save()
    }
}

module.exports = { seedUser }