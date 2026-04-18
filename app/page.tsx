import { prisma } from "@/lib/prisma";
import HomeContent from "./_components/HomeContent";

export default async function HomePage() {
  const ucapan = await prisma.ucapan.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });

  return <HomeContent ucapan={ucapan} />;
}
