import {
  create,
  get,
  remove,
  update,
  search,
} from "../services/contact-service.js";

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

const removeContactHandler = async (req, res, next) => {
  try {
    const user = req.user;
    const contactId = req.params.contactId;

    const result = await remove(user, contactId);
    res.status(200).json({
      data: "OK",
    });
  } catch (e) {
    next(e);
  }
};

const searchContactHandler = async (req, res, next) => {
  try {
    const user = req.user;
    const request = {
      name: req.query.name,
      email: req.query.email,
      phone: req.query.phone,
      page: req.query.page,
      size: req.query.size,
    };

    const result = await search(user, request);
    res.status(200).json({
      data: result.data,
      paging: result.paging,
    });
  } catch (error) {
    next(error);
  }
};
export default {
  create: createHandler,
  get: getContactHandler,
  update: updateContactHandler,
  remove: removeContactHandler,
  search: searchContactHandler,
};
