import { create } from "../services/contact-service.js";

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

export default {
  create: createHandler,
};
