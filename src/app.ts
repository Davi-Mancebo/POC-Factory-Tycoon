import express from "express";
import 'dotenv/config'
import cors from 'cors';
import userRoutes from './routes/user-route';

const server = express();
const port = process.env.PORT;

server.use(express.json());
server.use(cors());

server.use('/api/user', userRoutes);

server.listen(port, () => {
    console.log("servidor ligado no port " +port)
});