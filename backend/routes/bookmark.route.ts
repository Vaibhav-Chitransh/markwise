import { Router } from "express";
import { CreateBookmark, GetAllBookmarks, GetBookmarkGivenId, UpdateBookmark } from "../controllers/bookmark.controller";
const router = Router();

router.post('/bookmark', CreateBookmark);
router.get('/bookmarks', GetAllBookmarks);
router.get('/bookmark/:id', GetBookmarkGivenId);
router.put('/bookmark/:id', UpdateBookmark);

export default router;