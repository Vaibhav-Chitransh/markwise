import express from 'express';
const app = express();

import authRoutes from './routes/auth.route';
import { PORT } from './utils/constants';

app.use(express.json());

app.use('/', authRoutes);

app.listen(PORT || 3000, () => {
    console.log("Server is up and running");
});