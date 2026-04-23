import express from "express";
import {
  searchProfiles,
  getProfiles,
} from "../controller/user-controller.js";

const router = express.Router();

router.get("/profiles", getProfiles);
router.get("/profiles/search", searchProfiles);

export default router;
