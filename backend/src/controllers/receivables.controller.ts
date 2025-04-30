import { Request, Response } from 'express';
import { prisma } from '../../prisma/client';

export async function getAll(req: Request, res: Response) {
  const items = await prisma.accountReceivable.findMany();
  res.json(items);
}

export async function getById(req: Request, res: Response) {
  const id = Number(req.params.id);
  const item = await prisma.accountReceivable.findUnique({ where: { id } });
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
}

export async function create(req: Request, res: Response) {
  const { title, customer, dueDate, amount, description, status } = req.body;
  const created = await prisma.accountReceivable.create({
    data: { title, customer, dueDate: new Date(dueDate), amount, description, status },
  });
  res.status(201).json(created);
}

export async function update(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { title, customer, dueDate, amount, description, status } = req.body;
  const updated = await prisma.accountReceivable.update({
    where: { id },
    data: { title, customer, dueDate: new Date(dueDate), amount, description, status },
  });
  res.json(updated);
}

export async function remove(req: Request, res: Response) {
  const id = Number(req.params.id);
  await prisma.accountReceivable.delete({ where: { id } });
  res.status(204).send();
}
