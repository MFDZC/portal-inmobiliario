import { PrismaClient } from '@prisma/client';
import { PrismaLibSQL } from '@prisma/adapter-libsql'; // <-- Cambio aquí
import { createClient } from '@libsql/client';

const libsql = createClient({
  url: process.env.DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

const adapter = new PrismaLibSQL(libsql); // <-- Cambio aquí
const prisma = global.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  try {
    if (req.method === 'GET') {
      const { q } = req.query;
      const propiedades = await prisma.propiedad.findMany({
        where: q ? { comuna: { contains: q } } : {},
        orderBy: { createdAt: 'desc' }
      });
      return res.status(200).json(propiedades);
    }

    if (req.method === 'POST') {
      const nueva = await prisma.propiedad.create({
        data: {
          precio: parseInt(req.body.precio),
          comuna: req.body.comuna,
          tipo: req.body.tipo,
          habitaciones: parseInt(req.body.habitaciones),
          banos: parseInt(req.body.banos),
          metros: parseInt(req.body.metros),
        }
      });
      return res.status(200).json(nueva);
    }
  } catch (error) {
    console.error("Error en Turso:", error);
    return res.status(500).json({ error: error.message });
  }
}