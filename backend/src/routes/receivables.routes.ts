import { Router } from 'express';
import * as ReceivableController from '../controllers/receivables.controller';

const router = Router();

router.get('/', ReceivableController.getAll);
router.get('/:id', ReceivableController.getById);
router.post('/', ReceivableController.create);
router.put('/:id', ReceivableController.update);
router.delete('/:id', ReceivableController.remove);

export default router;
