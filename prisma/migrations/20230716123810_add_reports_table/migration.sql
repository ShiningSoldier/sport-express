-- CreateTable
CREATE TABLE "reports" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "weight" REAL NOT NULL,
    "leg" REAL NOT NULL,
    "waist" REAL NOT NULL,
    "chest" REAL NOT NULL,
    "arm" REAL NOT NULL,
    "photo_front" TEXT NOT NULL,
    "photo_back" TEXT NOT NULL,
    CONSTRAINT "reports_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
