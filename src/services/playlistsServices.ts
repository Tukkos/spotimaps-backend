import playlistsRepository from "@/repository/playlistsRepository";

async function getPlaylists(userId: number) {
  const playlists = await playlistsRepository.findPlaylists(userId);
  return playlists;
}

async function getPlaylistMusics(playlistId: number) {
  const musics = await playlistsRepository.findPlaylistMusic(playlistId);
  return musics;
}

async function putPlaylistName(playlistId: number, name: string) {
  const newName = await playlistsRepository.changePlaylistName(playlistId, name);
  return newName;
}

const playlistsServices = {
  getPlaylists,
  getPlaylistMusics,
  putPlaylistName,
};

export default playlistsServices;