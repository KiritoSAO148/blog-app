import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  create,
  deletepost,
  getTopPosts,
  getposts,
  newPosts,
  updateLike,
  updateView,
  updatepost,
} from "../controllers/post.controller.js";

const router = express.Router();

router.post("/create", verifyToken, create);
router.get("/getposts", getposts);
router.delete("/deletepost/:postId/:userId", verifyToken, deletepost);
router.put("/updatepost/:postId/:userId", verifyToken, updatepost);
router.put("/view/:postId", updateView);
router.post("/like/:postId", updateLike);
router.get("/top-post", getTopPosts);
router.get("/new-post", newPosts);

export default router;
