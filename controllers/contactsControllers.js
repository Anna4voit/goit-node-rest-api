import * as contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";

export const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;
  const filter = { owner };
  if (favorite) {
    filter.favorite = favorite;
  }

  const skip = (page - 1) * limit;
  const contacts = await contactsService.listContacts(filter, { skip, limit });
  const total = await contactsService.countContact(filter);
  if (!contacts) {
    throw HttpError(404);
  }
  res.json({ contacts, total });
};

export const getOneContact = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const contact = await contactsService.getContactByFilter({ owner, _id: id });
  if (!contact) {
    throw HttpError(404);
  }
  res.json(contact);
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const contact = await contactsService.removeContactByFilter({
    owner,
    _id: id,
  });
  if (!contact) {
    throw HttpError(404);
  }
  res.json(contact);
};

export const createContact = async (req, res) => {
  const { _id: owner } = req.user;
  const contact = await contactsService.addContact({ ...req.body, owner });
  if (!contact) {
    throw HttpError(404);
  }
  res.status(201).json(contact);
};

export const updateContact = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  if (Object.keys(req.body).length === 0) {
    throw HttpError(400, "Body must have at least one field");
  }
  const contact = await contactsService.updateContactByFilter(
    { owner, _id: id },
    req.body
  );
  if (!contact) {
    throw HttpError(404);
  }
  res.status(200).json(contact);
};

export const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const contact = await contactsService.updateContactByFilter(
    { owner, _id: id },
    req.body,
    {
      new: true,
    }
  );
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
