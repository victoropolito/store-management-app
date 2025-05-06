import { Request, Response } from 'express';
import { prisma } from '../../prisma/client';

function generateSKU(name: string): string {
  const prefix = name.slice(0, 3).toUpperCase();
  const suffix = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `${prefix}-${suffix}`;
}

export async function getAll(req: Request, res: Response) {
  const products = await prisma.product.findMany();
  res.json(products);
}

export async function getById(req: Request, res: Response) {
  const id = Number(req.params.id);
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) return res.status(404).json({ error: 'Not found' });
  res.json(product);
}

export async function create(req: Request, res: Response) {
  const { name, price, quantity, description } = req.body;

  const sku = generateSKU(name);

  const product = await prisma.product.create({
    data: { name, sku, price, quantity, description },
  });

  res.status(201).json(product);
}

export async function update(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { name, price, quantity, description } = req.body;
  const product = await prisma.product.update({
    where: { id },
    data: { name, price, quantity, description },
  });
  res.json(product);
}

export async function remove(req: Request, res: Response) {
  const id = Number(req.params.id);
  await prisma.product.delete({ where: { id } });
  res.status(204).send();
}
