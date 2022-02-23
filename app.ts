import dotenv from 'dotenv';
import Server from './src/connection/server';

dotenv.config();

const server = new Server();

server.listen();
