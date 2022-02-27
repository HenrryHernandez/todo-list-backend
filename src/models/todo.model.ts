import { DataTypes } from 'sequelize';

import db from '../connection/database';

import User from './user.model';

const Todo = db.define(
  'Todo',
  {
    userId: { type: DataTypes.INTEGER, allowNull: false },
    title: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
  },
  { tableName: 'Todos' }
);

Todo.hasOne(User, {
  foreignKey: 'id',
  sourceKey: 'userId',
});

export default Todo;
