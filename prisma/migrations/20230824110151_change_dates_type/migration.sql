-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_reports" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "date" TEXT NOT NULL,
    "weight" REAL NOT NULL,
    "leg" REAL NOT NULL,
    "waist" REAL NOT NULL,
    "chest" REAL NOT NULL,
    "arm" REAL NOT NULL,
    "photo_front" TEXT NOT NULL,
    "photo_back" TEXT NOT NULL,
    CONSTRAINT "reports_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_reports" ("arm", "chest", "date", "id", "leg", "photo_back", "photo_front", "user_id", "waist", "weight") SELECT "arm", "chest", "date", "id", "leg", "photo_back", "photo_front", "user_id", "waist", "weight" FROM "reports";
DROP TABLE "reports";
ALTER TABLE "new_reports" RENAME TO "reports";
CREATE TABLE "new_users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "height" REAL,
    "birth_date" TEXT,
    "goal" TEXT NOT NULL DEFAULT 'MAINTAIN',
    "activity_level" TEXT NOT NULL DEFAULT 'LIGHT'
);
INSERT INTO "new_users" ("activity_level", "birth_date", "email", "goal", "height", "id", "name", "password") SELECT "activity_level", "birth_date", "email", "goal", "height", "id", "name", "password" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_users_1" ON "users"("email");
Pragma writable_schema=0;
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
