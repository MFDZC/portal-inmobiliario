import { PrismaClient } from '@prisma/client';

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const propiedades = await prisma.propiedad.findMany();
      return res.status(200).json(propiedades);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error al obtener propiedades" });
    }
  }

  if (req.method === 'POST') {
    try {
      const nuevaPropiedad = await prisma.propiedad.create({
        data: req.body,
      });
      return res.status(201).json(nuevaPropiedad);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error al crear propiedad" });
    }
  }

  return res.status(405).json({ message: "Método no permitido" });
}