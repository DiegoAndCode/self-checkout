/*
  Warnings:

  - The values [TAKEWAY] on the enum `ConsumptionMethod` will be removed. If these variants are still used in the database, this will fail.
  - The values [FINISHED] on the enum `OrderStatus` will be removed. If these variants are still used in the database, this will fail.
  - The primary key for the `OrderProduct` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `price` on the `OrderProduct` table. All the data in the column will be lost.
  - The `id` column on the `OrderProduct` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[slug]` on the table `Restaurant` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `prince` to the `OrderProduct` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ConsumptionMethod_new" AS ENUM ('DINE_IN', 'TAKEAWAY');
ALTER TABLE "Order" ALTER COLUMN "consumptionMethod" TYPE "ConsumptionMethod_new" USING ("consumptionMethod"::text::"ConsumptionMethod_new");
ALTER TYPE "ConsumptionMethod" RENAME TO "ConsumptionMethod_old";
ALTER TYPE "ConsumptionMethod_new" RENAME TO "ConsumptionMethod";
DROP TYPE "ConsumptionMethod_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "OrderStatus_new" AS ENUM ('PENDING', 'IN_PREPARATION', 'CONFIRMED', 'DELIVERED', 'CANCELED');
ALTER TABLE "Order" ALTER COLUMN "status" TYPE "OrderStatus_new" USING ("status"::text::"OrderStatus_new");
ALTER TYPE "OrderStatus" RENAME TO "OrderStatus_old";
ALTER TYPE "OrderStatus_new" RENAME TO "OrderStatus";
DROP TYPE "OrderStatus_old";
COMMIT;

-- AlterTable
ALTER TABLE "OrderProduct" DROP CONSTRAINT "OrderProduct_pkey",
DROP COLUMN "price",
ADD COLUMN     "prince" DOUBLE PRECISION NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "OrderProduct_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Restaurant_slug_key" ON "Restaurant"("slug");
