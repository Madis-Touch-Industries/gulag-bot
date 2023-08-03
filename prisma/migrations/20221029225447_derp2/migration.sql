-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SUPER_LEGATE', 'LEGATE', 'OFFICER', 'MEMBER');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'MEMBER';