/*
  Warnings:

  - You are about to drop the column `amountOfperson` on the `rooms` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `rooms` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `rooms` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - Added the required column `capacity` to the `rooms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `rooms` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_rooms" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "capacity" INTEGER NOT NULL,
    "price" REAL NOT NULL
);
INSERT INTO "new_rooms" ("id", "price") SELECT "id", "price" FROM "rooms";
DROP TABLE "rooms";
ALTER TABLE "new_rooms" RENAME TO "rooms";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
