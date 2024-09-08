import { Sequelize } from "sequelize";
import dbApps from "../config/db.js";
import Users from "./usersModel.js";


const { DataTypes } = Sequelize;

const usersPost = dbApps.define("usersPost", {
  postId: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },

  userId: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    unique: true,
    allowNull: false,
  },

  ContentUrl: {
    type: DataTypes.STRING,
    allowNull: false
  },

  Caption: {
    type: DataTypes.TEXT
  },
},
  {
    tableName: "usersPost",
    underscored: true,
  }
);


Users.hasMany(usersPost, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

usersPost.belongsTo(Users, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

export default usersPost;