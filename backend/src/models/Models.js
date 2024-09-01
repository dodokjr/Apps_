import { Sequelize } from "sequelize";
import db from "../src/config/db.js"

const { DataTypes } = Sequelize;

export const UsersPost = db.define("usersPost", {
    postId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Caption: {
        type: DataTypes.STRING
    },
    image_url: {
        type: DataTypes.STRING
    },
    post_date: {
        type: DataTypes.DATEONLY
    },
    // It is possible to create foreign keys:
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            // This is a reference to another model
            model: Users,

            // This is the column name of the referenced model
            key: 'userId'
        }
    }
},
    {
        timestamps: false
    });