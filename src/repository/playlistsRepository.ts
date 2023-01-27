import { prisma } from "@/config";

async function findPlaylists(userId: number) {
  return prisma.playlists.findMany({
    where: {
      userId: userId,
    }
  });
};

async function findPlaylistMusic(playlistId: number) {
  return prisma.playlists.findUnique({
    where: {
      id: playlistId,
    },
    include: {
      musicsPlaylists: {
        include: {
          musics: true,
        }
      },
    }
  })
}

async function changePlaylistName(playlistId: number, name: string) {
  return prisma.playlists.update({
    where: {
      id: playlistId,
    },
    data: {
      name: name,
    }
  })
}

const playlistsRepository = {
  findPlaylists,
  findPlaylistMusic,
  changePlaylistName,
};

export default playlistsRepository;