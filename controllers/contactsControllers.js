import * as contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";

export const getAllContacts = async (_, res) => {
  const contacts = await contactsService.listContacts();
  if (!contacts) {
    throw HttpError(404);
  }
  res.json(contacts);
};

export const getOneContact = async (req, res) => {
  const { id } = req.params;
  const contact = await contactsService.getContactById(id);
  if (!contact) {
    throw HttpError(404);
  }
  res.json(contact);
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  const contact = await contactsService.removeContact(id);
  if (!contact) {
    throw HttpError(404);
  }
  res.json(contact);
};

export const createContact = async (req, res) => {
  const contact = await contactsService.addContact(req.body);
  if (!contact) {
    throw HttpError(404);
  }
  res.status(201).json(contact);
};

export const updateContact = async (req, res) => {
  const { id } = req.params;
  if (Object.keys(req.body).length === 0) {
    throw HttpError(400, "Body must have at least one field");
  }
  const contact = await contactsService.updateContact(id, req.body);
  if (!contact) {
    throw HttpError(404);
  }
  res.status(200).json(contact);
};

export const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const contact = await contactsService.updateContact(id, req.body, {
    new: true,
  });
  if (!contact) {
    throw HttpError(404);
  }
  res.status(200).json(contact);
};

export const ctrl = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getOneContact: ctrlWrapper(getOneContact),
  deleteContact: ctrlWrapper(deleteContact),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
