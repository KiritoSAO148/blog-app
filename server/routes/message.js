import express from "express";
import messageController from "../controllers/messageController.js";
const router = express.Router();

router.post("/ask-ai", messageController.askAi);
router.post("/get-text", messageController.getText);
router.post("/ai-gene", messageController.aiGener);

export default router;
