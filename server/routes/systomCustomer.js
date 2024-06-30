import express from "express";
import systemController from "../controllers/systemController.js";

const router = express.Router();

router.post("/openai", systemController.updateOpenaiKey);
router.get("/openai", systemController.getOpenaiKey);

export default router;
