import { Item } from '../models/item.js';

export function createItem(data) {
  return Item.create(data);
}

export function getItems() {
  return Item.find();
}

export function getItemById(id) {
  return Item.findById(id);
}

export function updateItem(id, data) {
  return Item.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
}

export function deleteItem(id) {
  return Item.findByIdAndDelete(id);
}
