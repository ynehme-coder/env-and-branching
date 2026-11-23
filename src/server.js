import { createApp } from './app.js';
import { connectDatabase, disconnectDatabase } from './config/database.js';
import { loadEnvironment } from './config/loadEnvironment.js';

const config = loadEnvironment();
const app = createApp(config.name);

async function start() {
  await connectDatabase(config.mongoUri);
  app.listen(config.port, () => {
    console.log(`Server running in ${config.name} environment on port ${config.port}`);
  });
}

async function shutdown(signal) {
  console.log(`Received ${signal}; closing database connection`);
  await disconnectDatabase();
  process.exit(0);
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

start().catch((error) => {
  console.error('Failed to start the application:', error);
  process.exit(1);
});
