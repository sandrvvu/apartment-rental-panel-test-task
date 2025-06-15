import http from 'http';
import dotenv from 'dotenv';
import express, { Application } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import apartmentRoutes from './routes/apartments.route';
import { connectDB } from './config/db';
import { errorHandler } from './middlewares/errorHandler';
import { logger } from './utils/logger';

dotenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/apartments', apartmentRoutes);

app.use(errorHandler);

const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    server.listen(PORT, () => {
        logger.info(`Server running on http://localhost:${PORT}`);
    });
});
