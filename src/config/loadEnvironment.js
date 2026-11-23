import dotenv from 'dotenv';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

dotenv.config();

const supportedEnvironments = new Set(['staging', 'preprod', 'prod']);

export function loadEnvironment(environment = process.env.APP_ENV) {
  const name = (environment || 'staging').toLowerCase();

  if (!supportedEnvironments.has(name)) {
    throw new Error(
      `Unsupported APP_ENV "${name}". Use one of: staging, preprod, prod.`,
    );
  }

  const configPath = fileURLToPath(
    new URL(`../../config/${name}.json`, import.meta.url),
  );
  const fileConfig = JSON.parse(readFileSync(configPath, 'utf8'));

  return {
    name,
    port: Number(process.env.PORT || fileConfig.port),
    mongoUri: process.env.MONGO_URI || fileConfig.mongoUri,
  };
}
