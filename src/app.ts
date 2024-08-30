import cors from 'cors';
import express, { Application } from 'express';
import router from './app/router';
import globalErrorHandler from './midleware/globalErrorHandler';
import notFoundApi from './midleware/notFoundApi';

const app: Application = express();

//parser
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

//applicaton route
app.use('/api', router);

//global error handler
app.use(globalErrorHandler);

//not found API
app.use(notFoundApi);

export default app;
