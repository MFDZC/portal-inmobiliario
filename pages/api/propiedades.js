import { PrismaClient } from '@prisma/client';
import { PrismaLibSQL } from '@prisma/adapter-libsql';
import { createClient } from '@libsql/client';

const libsql = createClient({
  url: process.env.DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

const adapter = new PrismaLibSQL(libsql);
const prisma = global.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const propiedades = await prisma.propiedad.findMany();
      return res.status(200).json(propiedades);
    } catch (error) {
      console.error("Error en Turso GET:", error);
      return res.status(500).json({ error: error.message });
    }
  } 
  
  if (req.method === 'POST') {
    try {
      const nuevaPropiedad = await prisma.propiedad.create({
        data: req.body,
      });
      return res.status(201).json(nuevaPropiedad);
    } catch (error) {
      console.error("Error en Turso POST:", error);
      return res.status(500).json({ error: error.message });
    }
  }

  return res.status(405).json({ message: 'Método no permitido' });
}