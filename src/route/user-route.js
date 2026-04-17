import express from "express";
import {
  deleteProfile,
  getProfile,
  getProfiles,
  saveUser,
} from "../controller/user-controller.js";

const router = express.Router();

router.post("/profiles", saveUser);
router.get("/profiles/:id", getProfile);
router.get("/profiles", getProfiles);
router.delete("/profiles/:id", deleteProfile);

export default router;
