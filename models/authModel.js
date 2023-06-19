const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConn");
const Contacts = require("./contactModel");

const Users = sequelize.define(
  "Users",
  {
    id: {
      type: DataTypes.STRING,
      autoIncrement: false,
      primaryKey: true,
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
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { schema: "ContactManager", timestamps: false }
);
// Users.associate = (models) => {
//   Users.belongsToMany(models.Contacts, {
//     through: models.UserContacts,
//     as: "contacts",
//     foreignKey: "user_id",
//   });
// };

module.exports = Users;
