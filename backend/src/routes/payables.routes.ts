import { Router } from 'express';
import * as PayableController from '../controllers/payables.controller';

const router = Router();

router.get('/', PayableController.getAll);
router.get('/:id', PayableController.getById);
router.post('/', PayableController.create);
router.put('/:id', PayableController.update);
router.delete('/:id', PayableController.remove);

export default router;
