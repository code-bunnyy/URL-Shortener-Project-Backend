import express from "express";
import { createShortCode } from "../controllers/createShortCode.js";
import { redirectToOriginalUrl } from "../controllers/redirectToOriginalUrl.js";

const router = express.Router();

router.post("/", createShortCode);

router.get("/:shortCode", redirectToOriginalUrl);

export default router;


