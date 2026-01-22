/*
  Warnings:

  - A unique constraint covering the columns `[storeId,productName]` on the table `StoreGoods` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "StoreGoods_storeId_productName_key" ON "StoreGoods"("storeId", "productName");
