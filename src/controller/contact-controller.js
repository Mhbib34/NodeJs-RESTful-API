import { create, get } from "../services/contact-service.js";

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
export default {
  create: createHandler,
  get: getContactHandler,
};
