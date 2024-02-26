import express from 'express';
import * as dotenv from 'dotenv';
import RobotRouter from '../routers/RobotRouter';
import FireStationRouter from '../routers/FireStationRouter';
import ObstacleRouter from '../routers/ObstacleRouter';
import cors from 'cors';

dotenv.config();

const app = express();
const robotRouter = new RobotRouter();
const fireStationRouter = new FireStationRouter();
const obstacleRouter = new ObstacleRouter();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World==!');
});

app.use('/robots', robotRouter.getRouter());
app.use('/firestations', fireStationRouter.getRouter());
app.use('/obstacles', obstacleRouter.getRouter());


app.listen(process.env.APP_PORT, () => {
  return console.log(`Express is listening at http://localhost:${process.env.APP_PORT}`);
});

export { app };
