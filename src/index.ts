import type { Server } from 'node:http';
import app from './app';
import { env } from './config';
import { logger } from './config/logger';
import prisma from './lib/prisma';

let server: Server;
let isShuttingDown = false;

async function startServer() {
  try {
    await prisma.$connect();
    logger.info('Connected to PostgreSQL');

    server = app.listen(env.port, () => {
      logger.info(`Listening on port ${env.port}`);
    });
  } catch (error) {
    logger.error('Error connecting to PostgreSQL:', error);
    process.exit(1);
  }
}

startServer();

async function shutdown() {
  if (isShuttingDown) return;
  isShuttingDown = true;

  logger.info('Shutting down gracefully...');

  try {
    if (server) {
      await new Promise<void>((resolve) => {
        server.close(() => {
          logger.info('HTTP server closed');
          resolve();
        });
      });
    }

    await prisma.$disconnect();
    logger.info('Database disconnected');

    process.exit(0);
  } catch (error) {
    logger.error('Error during shutdown:', error);
    process.exit(1);
  }
}

function exitHandler() {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
}

const unexpectedErrorHandler = (error: unknown) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);
process.on('SIGTERM', shutdown);
