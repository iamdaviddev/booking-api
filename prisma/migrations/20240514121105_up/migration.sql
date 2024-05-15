/*
  Warnings:

  - The primary key for the `rooms` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_images" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
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
    "description" TEXT,
    "capacity" INTEGER NOT NULL,
    "price" REAL NOT NULL
);
INSERT INTO "new_rooms" ("capacity", "description", "id", "name", "price") SELECT "capacity", "description", "id", "name", "price" FROM "rooms";
DROP TABLE "rooms";
ALTER TABLE "new_rooms" RENAME TO "rooms";
CREATE TABLE "new_bookings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "checkinDate" DATETIME NOT NULL,
    "checkoutDate" DATETIME NOT NULL,
    "amout" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    CONSTRAINT "bookings_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "bookings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_bookings" ("amout", "checkinDate", "checkoutDate", "id", "price", "roomId", "userId") SELECT "amout", "checkinDate", "checkoutDate", "id", "price", "roomId", "userId" FROM "bookings";
DROP TABLE "bookings";
ALTER TABLE "new_bookings" RENAME TO "bookings";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
