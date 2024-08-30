import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config/config';

let server: Server;
async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    server = app.listen(config.port, () => {
      console.log(`app is listening on port :${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
