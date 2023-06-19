const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConn");
const Contacts = require("./contactModel");
const Users = require("./authModel");

const UserContacts = sequelize.define(
  "UserContacts",
  {
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Users,
        key: "id",
      },
    },
    contact_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Contacts,
        key: "id",
      },
    },
  },
  {
    tableName: "UserContacts",
    schema: "ContactManager",
    timestamps: false,
    primaryKey: false,
  }
);

Users.belongsToMany(Contacts, {
  through: UserContacts,
  foreignKey: "user_id",
  as: "Contacts",
});

Contacts.belongsToMany(Users, {
  through: UserContacts,
  foreignKey: "contact_id",
  as: "Users",
});

module.exports = { UserContacts };
