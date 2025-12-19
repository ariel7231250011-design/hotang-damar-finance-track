-- CreateTable
CREATE TABLE "EmployeeIncome" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "employee" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "note" TEXT,
    "amount" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
