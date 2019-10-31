import express from "express";
import entries from "./entries";
import users from "./users";
import message from "../helpers/messages";

const router = express.Router();

router.get("/", (req, res, next) =>
  message(res, 200, "message", "Hello World")
);
router.use("/api/v1/auth", users);
router.use("/api/v1/entries", entries);

router.use("/*", (req, res, next) =>
  message(res, 404, "error", "Wrong api endpoint, does not exist")
);

export default router;
