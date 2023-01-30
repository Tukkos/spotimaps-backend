import { prisma } from "@/config";
import { NewMusicProtocol } from "@/protocols/NewMusicProtocol";
import { NewMusicsPlaylistProtocol } from "@/protocols/NewMusicsPlaylistProtocol";
import { NewPlaylistProtocol } from "@/protocols/NewPlaylistProtocol";

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
  });
};

async function changePlaylistName(playlistId: number, name: string) {
  return prisma.playlists.update({
    where: {
      id: playlistId,
    },
    data: {
      name: name,
    }
  });
};

async function createPlaylist(body: NewPlaylistProtocol, userId: number) {
  const bandName = body.bandName;
  const duration = body.duration;
  const image = body.image;

  return prisma.playlists.create({
    data: {
      userId: userId,
      name: `Playlist ${bandName}`,
      duration: duration,
      image: image,
    }
  });
};

async function createMusic(body: NewMusicProtocol) {
  const name = body.name;
  const duration = body.duration;

  return prisma.musics.create({
    data: {
      name: name,
      duration: duration,
    }
  });
};

async function createMusicsPlaylist(body: NewMusicsPlaylistProtocol, userId: number) {
  const musicId = body.musicsId;
  const playlistId = body.playlistId;

  return prisma.musicsPlaylists.create({
    data: {
      playlistId: playlistId,
      musicsId: musicId,
    }
  });
};

async function deleteMusicsPlaylists(musicPlaylistId: number) {
  return prisma.musicsPlaylists.delete({
    where: {
      id: musicPlaylistId,
    }
  });
};

async function deletePlaylists(playlistId: number) {
  return prisma.playlists.delete({
    where: {
      id: playlistId,
    }
  });
};

async function deleteMusics(musicId: number) {
  return prisma.musics.delete({
    where: {
      id: musicId,
    }
  });
};

const playlistsRepository = {
  findPlaylists,
  findPlaylistMusic,
  changePlaylistName,
  createPlaylist,
  createMusic,
  createMusicsPlaylist,
  deleteMusicsPlaylists,
  deletePlaylists,
  deleteMusics,
};

export default playlistsRepository;