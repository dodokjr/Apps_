import { Model, Sequelize } from "sequelize";
import dbApps from "../config/db.js";
import { encript } from "../utilities/brcryp.js";
import moment from "moment";
import Users from "./usersModel.js";

const { DataTypes } = Sequelize;
const Followed = dbApps.define('followed', {
    followedId: {
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
        tabelName: "followed",
        underscored: true,
        timestamps: true,
    });

Users.hasMany(Followed, {
    foreignKey: "userId"
});

Followed.belongsTo(Users, {
    foreignKey: "userId"
})
export default Followed;