import { Router } from 'express';
import * as StockController from '../controllers/stock.controller';

const router = Router();

router.get('/', StockController.getAll);
router.post('/', StockController.create);

export default router;
