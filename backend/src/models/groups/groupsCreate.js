import { Model, Sequelize } from "sequelize";
import dbApps from "../../config/db.js";
import Users from "../usersModel.js";

const { DataTypes } = Sequelize;
const GroupsCreate = dbApps.define('groups', {
    GroupId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    userId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
    },
    OwnerGrup: {
        type: Sequelize.STRING,
    },
    isPrivate: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    isSign: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    isFollowGroup: {
        type: Sequelize.STRING
    }
},
    {
        tabelName: "groups",
        underscored: true,
        timestamps: true,
    });

Users.hasMany(GroupsCreate, {
    foreignKey: "userId"
});

GroupsCreate.belongsTo(Users, {
    foreignKey: "userId"
})
export default GroupsCreate;