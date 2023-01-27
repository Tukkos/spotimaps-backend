import { prisma } from "@/config";

async function findPlaylists(userId: number) {
  return prisma.playlists.findMany({
    where: {
      userId: userId,
    }
  });
}

const playlistsRepository = {
  findPlaylists,
};

export default playlistsRepository;