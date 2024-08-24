import { Sequelize } from "sequelize"
import db from "../config/db.js"

const { DataTypes } = Sequelize;

const Users = db.define('users', {
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    pin: {
        type: DataTypes.STRING
    },
    image_profile: {
        type: DataTypes.STRING
    },
    bio: {
        type: DataTypes.STRING
    },
    refersh_token: {
        type: DataTypes.TEXT
    },
}, {
    freezeTableName: true
})

export default Users;