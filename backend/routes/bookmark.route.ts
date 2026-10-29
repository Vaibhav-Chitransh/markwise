import { Router } from "express";
import { CreateBookmark, GetAllBookmarks, GetBookmarkGivenId } from "../controllers/bookmark.controller";
const router = Router();

router.post('/bookmark', CreateBookmark);
router.get('/bookmarks', GetAllBookmarks);
router.get('/bookmark/:id', GetBookmarkGivenId);

export default router;