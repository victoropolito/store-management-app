import { Request, Response } from 'express';
import { prisma } from '../../prisma/client';

export async function getAll(req: Request, res: Response) {
  const movements = await prisma.stockMovement.findMany({
    include: { product: true },
    orderBy: { createdAt: 'desc' },
  });
  res.json(movements);
}

export async function create(req: Request, res: Response) {
  const { productId, quantity, type, reason } = req.body;

  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) return res.status(404).json({ error: 'Product not found' });

  const movement = await prisma.stockMovement.create({
    data: { productId, quantity, type, reason },
  });

  const newQuantity =
    type === 'IN'
      ? product.quantity + quantity
      : type === 'OUT'
      ? product.quantity - quantity
      : quantity;

  await prisma.product.update({
    where: { id: productId },
    data: { quantity: newQuantity },
  });

  res.status(201).json(movement);
}
