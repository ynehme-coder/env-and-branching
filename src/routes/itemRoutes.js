import { Router } from 'express';
import {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
} from '../services/itemService.js';

const router = Router();

router.post('/items', async (request, response, next) => {
  try {
    const item = await createItem(request.body);
    response.status(201).json(item);
  } catch (error) {
    next(error);
  }
});

router.get('/items', async (_request, response, next) => {
  try {
    response.json(await getItems());
  } catch (error) {
    next(error);
  }
});

router.get('/items/:id', async (request, response, next) => {
  try {
    const item = await getItemById(request.params.id);

    if (!item) {
      return response.status(404).json({ error: 'Item not found' });
    }

    response.json(item);
  } catch (error) {
    next(error);
  }
});

router.put('/items/:id', async (request, response, next) => {
  try {
    const item = await updateItem(request.params.id, request.body);

    if (!item) {
      return response.status(404).json({ error: 'Item not found' });
    }

    response.json(item);
  } catch (error) {
    next(error);
  }
});

router.delete('/items/:id', async (request, response, next) => {
  try {
    const item = await deleteItem(request.params.id);

    if (!item) {
      return response.status(404).json({ error: 'Item not found' });
    }

    response.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;
