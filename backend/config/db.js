import { Sequelize } from "sequelize"

const db = new Sequelize("losroot", "root", "", {
    host: "localhost",
    dialect: "mysql"
})

export default db;