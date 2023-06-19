const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConn");
const Users = require("./authModel");

const Contacts = sequelize.define(
  "Contacts",
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
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      // defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      // defaultValue: DataTypes.NOW,
    },
  },
  { schema: "ContactManager", timestamps: false }
);
// Contacts.associate = (models) => {
//   Contacts.belongsToMany(models.Users, {
//     through: models.UserContacts,
//     as: "users",
//     foreignKey: "contact_id",
//   });
// };
module.exports = Contacts;
