-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "gender" TEXT NOT NULL DEFAULT 'OTHER',
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
