import { Sequelize } from "sequelize";
import dbApps from "../config/db.js";
import { encript } from "../utilities/brcryp.js";
import moment from "moment";

const { DataTypes } = Sequelize;
const Users = dbApps.define('users', {
    userId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        },
        set(value)
        {
            this.setDataValue("email", value.toLowerCase());
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value)
        {
            this.setDataValue("password", encript(value));
        },
    },
    pin: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value)
        {
            this.setDataValue("pin", encript(value));
        },
    },
    image_profile: {
        type: DataTypes.STRING
    },
    image: {
        type: DataTypes.STRING
    },
    bio: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
    expireTime: {
        type: Sequelize.DATE,
        set(value)
        {
            if (value !== null)
            {
                this.setDataValue("expireTime", moment(value).add(1, "hours"));
            } else
            {
                this.setDataValue("expireTime", null);
            }
        },
    },
},
    {
        tabelName: "users",
        underscored: true,
        timestamps: true,
    });

export default Users;