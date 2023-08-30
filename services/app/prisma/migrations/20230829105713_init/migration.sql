/*
  Warnings:

  - You are about to drop the column `productId` on the `History` table. All the data in the column will be lost.
  - You are about to drop the `Rating` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StoreRating` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[cartId]` on the table `History` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `totalPrice` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cartId` to the `History` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating` to the `History` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `History` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "History" DROP CONSTRAINT "History_productId_fkey";

-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_productId_fkey";

-- DropForeignKey
ALTER TABLE "StoreRating" DROP CONSTRAINT "StoreRating_storeId_fkey";

-- AlterTable
ALTER TABLE "Cart" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'updaid',
ADD COLUMN     "totalPrice" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "History" DROP COLUMN "productId",
ADD COLUMN     "cartId" INTEGER NOT NULL,
ADD COLUMN     "rating" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "Rating";

-- DropTable
DROP TABLE "StoreRating";

-- CreateTable
CREATE TABLE "HistoryDetail" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "HistoryDetail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "History_cartId_key" ON "History"("cartId");

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
