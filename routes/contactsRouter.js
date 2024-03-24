import express from "express";
import { ctrl } from "../controllers/contactsControllers.js";

import validateBody from "../helpers/validateBody.js";
import {
  createContactSchema,
  updateContactSchema,
  updateStatusSchema,
} from "../schemas/contactsSchemas.js";
import isValidId from "../middlewares/isValidId.js";

const contactsRouter = express.Router();

contactsRouter.get("/", ctrl.getAllContacts);

contactsRouter.get("/:id", isValidId, ctrl.getOneContact);

contactsRouter.delete("/:id", isValidId, ctrl.deleteContact);

contactsRouter.post("/", validateBody(createContactSchema), ctrl.createContact);

contactsRouter.put(
  "/:id",
  isValidId,
  validateBody(updateContactSchema),
  ctrl.updateContact
);

contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  validateBody(updateStatusSchema),
  ctrl.updateStatusContact
);

export default contactsRouter;
