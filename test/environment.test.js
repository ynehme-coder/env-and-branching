import assert from 'node:assert/strict';
import test from 'node:test';
import { loadEnvironment } from '../src/config/loadEnvironment.js';

test('loads staging configuration', () => {
  const config = loadEnvironment('staging');
  assert.equal(config.name, 'staging');
  assert.equal(config.port, 3000);
  assert.match(config.mongoUri, /env_staging$/);
});

test('loads preprod configuration', () => {
  const config = loadEnvironment('preprod');
  assert.equal(config.name, 'preprod');
  assert.equal(config.port, 3001);
  assert.match(config.mongoUri, /env_preprod$/);
});

test('loads prod configuration', () => {
  const config = loadEnvironment('prod');
  assert.equal(config.name, 'prod');
  assert.equal(config.port, 3002);
  assert.match(config.mongoUri, /env_prod$/);
});

test('rejects unsupported environments', () => {
  assert.throws(
    () => loadEnvironment('development'),
    /Unsupported APP_ENV/,
  );
});
