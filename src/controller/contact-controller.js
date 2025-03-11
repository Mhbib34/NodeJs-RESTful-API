import { create, get, update } from "../services/contact-service.js";

const createHandler = async (req, res, next) => {
  try {
    const user = req.user;
    const result = await create(user, req.body);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getContactHandler = async (req, res, next) => {
  try {
    const user = req.user;
    const result = await get(user, req.params.contactId);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateContactHandler = async (req, res, next) => {
  try {
    const user = req.user;
    const contactId = req.params.contactId;
    const request = req.body;
    request.id = contactId;

    const result = await update(user, request);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export default {
  create: createHandler,
  get: getContactHandler,
  update: updateContactHandler,
};
