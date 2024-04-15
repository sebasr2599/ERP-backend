/*
  Warnings:

  - You are about to drop the column `priceWholesale` on the `HistoricPrice` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `wholesale` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `priceWholesale` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "HistoricPrice" DROP COLUMN "priceWholesale";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "location",
DROP COLUMN "wholesale";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "priceWholesale";
