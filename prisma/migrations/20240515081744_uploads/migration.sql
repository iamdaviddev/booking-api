/*
  Warnings:

  - Made the column `image` on table `images` required. This step will fail if there are existing NULL values in that column.
  - Made the column `capacity` on table `rooms` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `rooms` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `rooms` required. This step will fail if there are existing NULL values in that column.
  - Made the column `price` on table `rooms` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_images" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "image" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    CONSTRAINT "images_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_images" ("id", "image", "roomId") SELECT "id", "image", "roomId" FROM "images";
DROP TABLE "images";
ALTER TABLE "new_images" RENAME TO "images";
CREATE TABLE "new_rooms" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "price" REAL NOT NULL
);
INSERT INTO "new_rooms" ("capacity", "description", "id", "name", "price") SELECT "capacity", "description", "id", "name", "price" FROM "rooms";
DROP TABLE "rooms";
ALTER TABLE "new_rooms" RENAME TO "rooms";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
