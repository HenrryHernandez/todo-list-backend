import { DataTypes } from 'sequelize';

import db from '../connection/database';

import Todo from './todo.model';

const Image = db.define(
  'Image',
  {
    todoId: { type: DataTypes.INTEGER, allowNull: false },
    imageName: { type: DataTypes.STRING, allowNull: false },
  },
  { tableName: 'Images' }
);

Image.hasOne(Todo, {
  foreignKey: 'id',
  sourceKey: 'todoId',
});

export default Image;
