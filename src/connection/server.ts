import express, { Application } from 'express';
import cors from 'cors';

import db from './database';

class Server {
  private app: Application;
  private port: string;
  private paths = {
    users: '/api/users',
    auth: '/api/auth',
    todos: '/api/todos/',
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '8000';

    this.DBConnection();
    this.middlewares();
    this.routes();
  }

  async DBConnection() {
    try {
      await db.authenticate();
      console.log('database on');
    } catch (error: any) {
      throw new Error(error);
    }
  }

  middlewares() {
    this.app.use(cors());

    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.paths.users, require('../routes/users.route'));
    this.app.use(this.paths.auth, require('../routes/auth.route'));
    this.app.use(this.paths.todos, require('../routes/todos.route'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('server is running on ' + this.port);
    });
  }
}

export default Server;
