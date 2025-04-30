import { Request, Response } from 'express';
import { prisma } from '../../prisma/client';

export async function getAll(req: Request, res: Response) {
  const items = await prisma.accountPayable.findMany();
  res.json(items);
}

export async function getById(req: Request, res: Response) {
  const id = Number(req.params.id);
  const item = await prisma.accountPayable.findUnique({ where: { id } });
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
}

export async function create(req: Request, res: Response) {
  const { title, supplier, dueDate, amount, description, status } = req.body;
  const created = await prisma.accountPayable.create({
    data: { title, supplier, dueDate: new Date(dueDate), amount, description, status },
  });
  res.status(201).json(created);
}

export async function update(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { title, supplier, dueDate, amount, description, status } = req.body;
  const updated = await prisma.accountPayable.update({
    where: { id },
    data: { title, supplier, dueDate: new Date(dueDate), amount, description, status },
  });
  res.json(updated);
}

export async function remove(req: Request, res: Response) {
  const id = Number(req.params.id);
  await prisma.accountPayable.delete({ where: { id } });
  res.status(204).send();
}
