import express from "express";
import userController from "../controller/user-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";
import contactController from "../controller/contact-controller.js";

const userRouter = new express.Router();
userRouter.use(authMiddleware);

//USER API
userRouter.get("/api/users/current", userController.get);
userRouter.patch("/api/users/current", userController.update);
userRouter.delete("/api/users/logout", userController.logout);

//CONTACTS API
userRouter.post("/api/contacts", contactController.create);
userRouter.get("/api/contacts/:contactId", contactController.get);
userRouter.put("/api/contacts/:contactId", contactController.update);
userRouter.delete("/api/contacts/:contactId", contactController.remove);
userRouter.get("/api/contacts", contactController.search);

export default userRouter;
