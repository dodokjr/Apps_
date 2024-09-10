import { Model, Sequelize } from "sequelize";
import dbApps from "../config/db.js";
import { encript } from "../utilities/brcryp.js";
import moment from "moment";
import Users from "./usersModel.js";
import usersPost from "./usersPostModels.js";

const { DataTypes } = Sequelize;
const LikePost = dbApps.define('likePost', {
    likePostId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
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
    isLike: {
        type: Sequelize.TEXT,
        defaultValue: false,
    }
},
    {
        tabelName: "likePost",
        underscored: true,
        timestamps: true,
    });

Users.hasMany(LikePost, {
    foreignKey: "userId"
});

LikePost.belongsTo(Users, {
    foreignKey: "userId"
});

usersPost.hasMany(LikePost, {
    foreignKey: "postId"
});

LikePost.belongsTo(usersPost, {
    foreignKey: "postId"
})
export default LikePost;