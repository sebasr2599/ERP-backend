/*
  Warnings:

  - A unique constraint covering the columns `[productKey]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "productKey" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Product_productKey_key" ON "Product"("productKey");
