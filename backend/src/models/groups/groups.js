import { Model, Sequelize } from "sequelize";
import dbApps from "../../config/db.js";
import Users from "../usersModel.js";
import GroupsCreate from "./groupsCreate.js";

const { DataTypes } = Sequelize;
const GroupsMembers = dbApps.define('groups_members', {
    memberGroupId: {
        primaryKey: true,
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

GroupsCreate.hasMany(GroupsMembers, {
    foreignKey: "GroupId"
});

GroupsMembers.belongsTo(GroupsCreate, {
    foreignKey: "GroupId"
})

Users.hasMany(GroupsMembers, {
    foreignKey: "userId"
});

GroupsMembers.belongsTo(Users, {
    foreignKey: "userId"
})
export default GroupsMembers;