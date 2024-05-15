/*
  Warnings:

  - The primary key for the `images` table will be changed. If it partially fails, the table could be left without primary key constraint.

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
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
