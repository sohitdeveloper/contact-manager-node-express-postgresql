const Contacts = require("../models/contactModel");
const crypto = require("crypto");
const moment = require("moment");
const Users = require("../models/authModel");

// @desc Get All Contacts
// @route GET /api/contacts
// @access public

const getContacts = async (req, res, next) => {
  try {
    // Access the user ID from req.userId
    const userId = req.userId;
    if (userId) {
      // const contacts = await Contact.findAll({ where: { userId } } );
      const contacts = await Contacts.findAll();
      res
        .status(200)
        .json({ message: "Get all Contacts.", contacts: contacts });
    } else {
      res.status(401);
      throw new Error("Unauthorised !");
    }
  } catch (error) {
    next(error);
  }
};

// @desc Get Contact By ID
// @route GET /api/contacts/:id
// @access public

const getContact = async (req, res, next) => {
  try {
    const userId = req.userId;
    if (userId) {
      const contact = await Contacts.findByPk(req.params.id);
      if (contact === null) {
        res.status(404);
        throw new Error("Contact with the given Id doesn't exist !");
      }
      res
        .status(200)
        .json({ message: `Get Contact for ${req.params.id}`, data: contact });
    } else {
      res.status(401);
      throw new Error("Unauthorised !");
    }
  } catch (error) {
    next(error);
  }
};

// @desc Create Contact
// @route POST /api/contacts
// @access public

const createContact = async (req, res, next) => {
  const { name, email, phone } = req.body;

  try {
    // Access the user ID from req.userId
    const userId = req.userId;
    if (userId) {
      const user = await Users.findOne({ where: { id: userId } });
      if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory!");
      }
      const created_at = moment().valueOf();
      const updated_at = moment().valueOf();
      const contact = await Contacts.create({
        id: crypto.randomUUID(),
        name,
        email,
        phone,
        created_at,
        updated_at,
      });

      // Add the association between user and contact
      // await UserContacts.create({
      //   user_id: userId,
      //   contact_id: contact.id,
      // });
      await user.addContact(contact);
      res.status(201).json({ message: "Contact Created.", data: contact });
    } else {
      res.status(401);
      throw new Error("Unauthorised !");
    }
  } catch (error) {
    next(error);
  }
};

// @desc Update Contact
// @route PUT /api/contacts/:id
// @access public

const updateContact = async (req, res, next) => {
  const { name, email, phone } = req.body;
  try {
    const userId = req.userId;
    if (userId) {
      const user = await Users.findByPk(userId);
      if (!user) {
        res.status(404);
        throw new Error("User not found !");
      }
      if (req.params.id) {
        const contact = await Contacts.findOne({
          where: { id: req.params.id },
        });
        if (!contact) {
          res.status(404);
          throw new Error("Contact with the given Id doesn't exist !");
        }
        const updatedContact = await contact.update({
          name,
          email,
          phone,
          created_at: contact.created_at,
          updated_at: moment().valueOf(),
        });
        res.status(200).json({
          message: `Contact updated for ${req.params.id}`,
          data: updatedContact,
        });
      } else {
        throw new Error("Please pass valid Id!");
      }
    } else {
      res.status(401);
      throw new Error("Unauthorised !");
    }
  } catch (error) {
    next(error);
  }
};
// @desc Delete Contact
// @route DELETE /api/contacts/:id
// @access public

const deleteContact = async (req, res, next) => {
  try {
    // Access the user ID from req.userId
    const userId = req.userId;
    if (userId) {
      if (req.params.id) {
        const contact = await Contacts.findOne({
          where: { id: req.params.id },
        });
        if (!contact) {
          res.status(404);
          throw new Error("Contact with the given Id doesn't exist !");
        }
        await contact.destroy();
        res
          .status(200)
          .json({ message: `Contact deleted for ${req.params.id}` });
      } else {
        throw new Error("Please pass valid Id!");
      }
    } else {
      res.status(401);
      throw new Error("Unauthorised !");
    }
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};
