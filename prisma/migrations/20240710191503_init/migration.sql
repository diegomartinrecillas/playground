/*
  Warnings:

  - The primary key for the `Todo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `complete` on the `Todo` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Todo` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `Todo` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Todo` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Todo` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `Todo` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - Added the required column `email` to the `Todo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Todo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "time_slot" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Todo" ("id") SELECT "id" FROM "Todo";
DROP TABLE "Todo";
ALTER TABLE "new_Todo" RENAME TO "Todo";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
