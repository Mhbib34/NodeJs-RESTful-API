import { register, login, get } from "../services/user-service.js";

const registerHandler = async (req, res, next) => {
  try {
    const result = await register(req.body);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const loginHandler = async (req, res, next) => {
  try {
    const result = await login(req.body);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getUserHandler = async (req, res, next) => {
  try {
    const username = req.user.username;
    const result = await get(username);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export default {
  register: registerHandler,
  login: loginHandler,
  get: getUserHandler,
};
