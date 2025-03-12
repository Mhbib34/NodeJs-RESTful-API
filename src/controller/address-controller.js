import { create, get, update } from "../services/address-service.js";

const createAddressHandler = async (req, res, next) => {
  try {
    const user = req.user;
    const contactId = req.params.contactId;
    const request = req.body;
    const result = await create(user, contactId, request);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAddressHandler = async (req, res, next) => {
  try {
    const user = req.user;
    const contactId = req.params.contactId;
    const addressId = req.params.addressId;
    const result = await get(user, contactId, addressId);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateAddressHandler = async (req, res, next) => {
  try {
    const user = req.user;
    const contactId = req.params.contactId;
    const request = req.body;
    const addressId = req.params.addressId;
    request.id = addressId;
    const result = await update(user, contactId, request);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  create: createAddressHandler,
  get: getAddressHandler,
  update: updateAddressHandler,
};
