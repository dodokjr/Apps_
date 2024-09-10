import { Model, Sequelize } from "sequelize";
import dbApps from "../config/db.js";
import { encript } from "../utilities/brcryp.js";
import moment from "moment";
import Users from "./usersModel.js";

const { DataTypes } = Sequelize;
const Follower = dbApps.define('follower', {
    followerId: {
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
    isFollow: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    }
},
    {
        tabelName: "follower",
        underscored: true,
        timestamps: true,
    });

Users.hasMany(Follower, {
    foreignKey: "userId"
});

Follower.belongsTo(Users, {
    foreignKey: "userId"
})
export default Follower;