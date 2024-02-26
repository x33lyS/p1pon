import { app } from './app';
import { sequelize } from '../database/instance';
import * as dotenv from 'dotenv';

dotenv.config();

sequelize
  .sync({ force: false })
  .then(() => {
    console.log('Connection has been established successfully.');
    app.listen(3000, () => {
      console.log(`My server running at http://localhost:${process.env.APP_PORT}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database: ', error);
  });
