import { Model, Sequelize } from "sequelize";
import dbApps from "../../config/db.js";
import Users from "../usersModel.js";
import GroupsCreate from "./groupsCreate.js";
import GroupsMembers from "./groups.js";

const { DataTypes } = Sequelize;
const GroupsPost = dbApps.define('groups_post', {
    postGroupMemberId: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
    },
    memberGroupId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
    },
    GroupId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
    },
    userId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
    },
    contentImage: {
        type: Sequelize.STRING,
    },
    contentSaveImage: {
        type: Sequelize.STRING,
    },
    contentText: {
        type: Sequelize.STRING
    },
    role: {
        type: Sequelize.STRING,
        allowNull: false
    }
},
    {
        tabelName: "groups_members",
        underscored: true,
        timestamps: true,
    });

GroupsCreate.hasMany(GroupsPost, {
    foreignKey: "GroupId"
});

GroupsPost.belongsTo(GroupsCreate, {
    foreignKey: "GroupId"
})

Users.hasMany(GroupsPost, {
    foreignKey: "userId"
});

GroupsPost.belongsTo(Users, {
    foreignKey: "userId"
});

GroupsMembers.hasMany(GroupsPost, {
    foreignKey: "memberGroupId"
});

GroupsPost.belongsTo(GroupsMembers, {
    foreignKey: "memberGroupId"
})
export default GroupsPost;