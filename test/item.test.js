import assert from 'node:assert/strict';
import test from 'node:test';
import { Item } from '../src/models/item.js';

test('item requires a name', async () => {
  const item = new Item({});
  await assert.rejects(
    item.validate(),
    (error) => error.errors.name?.kind === 'required',
  );
});

test('item trims and accepts a name', async () => {
  const item = new Item({ name: '  Example item  ' });
  await item.validate();
  assert.equal(item.name, 'Example item');
});