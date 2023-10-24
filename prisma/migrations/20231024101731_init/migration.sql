-- CreateTable
CREATE TABLE "examroom" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "period" INTEGER NOT NULL,
    "room" TEXT NOT NULL
);
