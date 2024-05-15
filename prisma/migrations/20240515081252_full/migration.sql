-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_rooms" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "description" TEXT,
    "capacity" INTEGER,
    "price" REAL
);
INSERT INTO "new_rooms" ("capacity", "description", "id", "name", "price") SELECT "capacity", "description", "id", "name", "price" FROM "rooms";
DROP TABLE "rooms";
ALTER TABLE "new_rooms" RENAME TO "rooms";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
