import { Router } from "express";
import { CreateBookmark, GetAllBookmarks } from "../controllers/bookmark.controller";
const router = Router();

router.post('/bookmark', CreateBookmark);
router.get('/bookmarks', GetAllBookmarks);

export default router;