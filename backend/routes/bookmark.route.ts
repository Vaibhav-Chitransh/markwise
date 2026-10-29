import { Router } from "express";
import { CreateBookmark } from "../controllers/bookmark.controller";
const router = Router();

router.post('/bookmark', CreateBookmark);

export default router;