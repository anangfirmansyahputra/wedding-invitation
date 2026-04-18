-- CreateEnum
CREATE TYPE "UcapanStatus" AS ENUM ('HADIR', 'TIDAK_HADIR');

-- CreateTable
CREATE TABLE "Ucapan" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "ucapan" TEXT NOT NULL,
    "status" "UcapanStatus" NOT NULL DEFAULT 'HADIR',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ucapan_pkey" PRIMARY KEY ("id")
);
