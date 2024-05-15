/*
  Warnings:

  - You are about to drop the `Avatar` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN "avatar" TEXT;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Avatar";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "image" TEXT NOT NULL,
    "roomId" INTEGER NOT NULL,
    CONSTRAINT "Image_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
