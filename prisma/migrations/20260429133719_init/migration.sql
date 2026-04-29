-- CreateTable
CREATE TABLE "Propiedad" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "precio" INTEGER NOT NULL,
    "comuna" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "habitaciones" INTEGER NOT NULL,
    "banos" INTEGER NOT NULL,
    "metros" INTEGER NOT NULL,
    "imagen" TEXT NOT NULL DEFAULT '/uploads/default.jpg',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
