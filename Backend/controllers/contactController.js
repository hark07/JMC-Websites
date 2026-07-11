import Contact from "../model/Contact.js";

// ================= CREATE MESSAGE =================

export const createContact = async (req, res) => {
  try {
    const contact = await Contact.create({
      name: req.body.name,

      email: req.body.email,

      subject: req.body.subject,

      message: req.body.message,
    });

    res.status(201).json({
      success: true,

      message: "Message sent successfully",

      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ================= GET ALL =================

export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,

      count: contacts.length,

      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ================= GET SINGLE =================

export const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,

        message: "Message not found",
      });
    }

    res.status(200).json({
      success: true,

      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ================= MARK READ =================

export const updateContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,

        message: "Message not found",
      });
    }

    contact.isRead = true;

    await contact.save();

    res.status(200).json({
      success: true,

      message: "Message marked as read",

      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ================= DELETE =================

export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,

        message: "Message not found",
      });
    }

    await contact.deleteOne();

    res.status(200).json({
      success: true,

      message: "Message deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};
