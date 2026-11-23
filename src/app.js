import express from 'express';
import mongoose from 'mongoose';
import itemRoutes from './routes/itemRoutes.js';

export function createApp(environmentName) {
  const app = express();

  app.use(express.json());
  app.use('/api', itemRoutes);

  app.get('/health', (_request, response) => {
    const databaseStates = ['disconnected', 'connected', 'connecting', 'disconnecting'];

    response.status(200).json({
      status: 'ok',
      environment: environmentName,
      database: databaseStates[mongoose.connection.readyState] || 'unknown',
    });
  });

  app.use((_request, response) => {
    response.status(404).json({ error: 'Not found' });
  });

  app.use((error, _request, response, _next) => {
    if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message });
    }

    if (error.name === 'CastError') {
      return response.status(400).json({ error: 'Invalid item ID' });
    }

    console.error(error);
    response.status(error.status || 500).json({ error: 'Internal server error' });
  });

  return app;
}
