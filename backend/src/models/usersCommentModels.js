import { Sequelize } from "sequelize";
import dbApps from "../config/db.js";
import Users from "./usersModel.js";
import usersPost from "./usersPostModels.js";


const { DataTypes } = Sequelize;

const usersComment = dbApps.define("usersComment", {
    commentId: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
    },

    postId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
    },

    userId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
    },

    Content: {
        type: DataTypes.STRING,
        allowNull: false
    },
},
    {
        tableName: "usersComment",
        underscored: true,
    }
);

usersPost.belongsToMany(Users, {
    through: "usersComment",
    foreignKey: 'postId',
    otherKey: 'userId',
})

export default usersComment;