import { DataTypes } from 'sequelize';

import db from '../connection/database';

const User = db.define(
  'User',
  {
    name: { type: DataTypes.STRING, allowNull: false },
    lastname1: { type: DataTypes.STRING, allowNull: false },
    lastname2: { type: DataTypes.STRING },
    username: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    profilePicture: { type: DataTypes.STRING },
  },
  { tableName: 'Users' }
);

export default User;
