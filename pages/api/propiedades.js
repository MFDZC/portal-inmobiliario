import { PrismaClient } from '@prisma/client';
import { PrismaLibSQL } from '@prisma/adapter-libsql';
import { createClient } from '@libsql/client';

// 1. Configuración del cliente de base de datos Turso
const libsql = createClient({
  url: process.env.DATABASE_URL || 'libsql://inmobiliaria-inmobiliaria.aws-us-east-1.turso.io',
  authToken: process.env.TURSO_AUTH_TOKEN || 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3Nzc1ODE0ODMsImlkIjoiMDE5ZGRhYTEtOTIwMS03YWE3LThhNmYtOTE2YWQyYTExYjUyIiwicmlkIjoiMTgzYThhYzctZTQwZS00NGY5LTgyNmYtZDZmMzcwZGViOTU2In0.fPqwQMgdYIy0RBztZ6LF4JYgX07urN-7H58tzn3hclFEexQcBHu9L8K-pcZTfYRLCXL370x09JKNkT_VBBiDAg',
});

// 2. Adaptador para que Prisma reconozca a Turso
const adapter = new PrismaLibSQL(libsql);

// 3. Patrón Singleton para el cliente de Prisma
const prisma = global.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export default async function handler(req, res) {
  // Manejo del método GET: Obtener todas las propiedades
  if (req.method === 'GET') {
    try {
      const propiedades = await prisma.propiedad.findMany();
      return res.status(200).json(propiedades);
    } catch (error) {
      console.error("Error al obtener propiedades:", error);
      return res.status(500).json({ error: "No se pudieron cargar las propiedades." });
    }
  } 
  
  // Manejo del método POST: Crear una nueva propiedad
  if (req.method === 'POST') {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "El cuerpo de la solicitud está vacío." });
    }

    try {
      const nuevaPropiedad = await prisma.propiedad.create({
        data: req.body,
      });
      return res.status(201).json(nuevaPropiedad);
    } catch (error) {
      console.error("Error al crear propiedad:", error);
      return res.status(500).json({ error: "Error al guardar en la base de datos." });
    }
  }

  // Respuesta para métodos no soportados
  return res.status(405).json({ message: `Método ${req.method} no permitido` });
}