import { Router } from "express";
import { CreateBookmark, DeleteBookmark, GetAllBookmarks, GetBookmarkGivenId, IncrementVisitedCount, UpdateBookmark } from "../controllers/bookmark.controller";
const router = Router();

router.post('/bookmark', CreateBookmark);
router.get('/bookmarks', GetAllBookmarks);
router.get('/bookmark/:id', GetBookmarkGivenId);
router.put('/bookmark/:id', UpdateBookmark);
router.delete('/bookmark/:id', DeleteBookmark);
router.put('/bookmark/incrementCount/:id', IncrementVisitedCount);

export default router;