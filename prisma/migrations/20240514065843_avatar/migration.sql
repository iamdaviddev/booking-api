/*
  Warnings:

  - Made the column `path` on table `Avatar` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Avatar" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "path" TEXT NOT NULL,
    "roomId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Avatar_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Avatar_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Avatar" ("id", "path", "roomId", "userId") SELECT "id", "path", "roomId", "userId" FROM "Avatar";
DROP TABLE "Avatar";
ALTER TABLE "new_Avatar" RENAME TO "Avatar";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
