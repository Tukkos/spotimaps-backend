import playlistsRepository from "@/repository/playlistsRepository";

async function getPlaylists(userId: number) {
  const playlists = await playlistsRepository.findPlaylists(userId);
  return playlists;
}

const playlistsServices = {
  getPlaylists,
};

export default playlistsServices;