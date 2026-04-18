-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ucapan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nama" TEXT NOT NULL,
    "ucapan" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'HADIR',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Ucapan" ("createdAt", "id", "nama", "ucapan", "updatedAt") SELECT "createdAt", "id", "nama", "ucapan", "updatedAt" FROM "Ucapan";
DROP TABLE "Ucapan";
ALTER TABLE "new_Ucapan" RENAME TO "Ucapan";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
