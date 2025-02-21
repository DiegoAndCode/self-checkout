/*
  Warnings:

  - You are about to drop the column `imgUrl` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `avatarImgUrl` on the `Restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `coverImgUrl` on the `Restaurant` table. All the data in the column will be lost.
  - Added the required column `imageUrl` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `avatarImageUrl` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coverImageUrl` to the `Restaurant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "imgUrl",
ADD COLUMN     "imageUrl" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Restaurant" DROP COLUMN "avatarImgUrl",
DROP COLUMN "coverImgUrl",
ADD COLUMN     "avatarImageUrl" TEXT NOT NULL,
ADD COLUMN     "coverImageUrl" TEXT NOT NULL;
