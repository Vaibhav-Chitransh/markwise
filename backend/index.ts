import express from 'express';
const app = express();

import authRoutes from './routes/auth.route';
import bookmarkRoutes from './routes/bookmark.route';
import { PORT } from './utils/constants';
import { authMiddleware } from './middlewares/auth.middleware';

app.use(express.json());

app.use('/', authRoutes);
app.use('/', authMiddleware, bookmarkRoutes);

app.listen(PORT || 3000, () => {
    console.log("Server is up and running");
});