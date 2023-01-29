import { NewMusicProtocol } from "@/protocols/NewMusicProtocol";
import { NewMusicsPlaylistProtocol } from "@/protocols/NewMusicsPlaylistProtocol";
import { NewPlaylistProtocol } from "@/protocols/NewPlaylistProtocol";
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

async function postPlaylist(body: NewPlaylistProtocol, userId: number) {
  const newPlaylist = await playlistsRepository.createPlaylist(body, userId);
  return newPlaylist;
}

async function postMusic(body: NewMusicProtocol) {
  const newMusic = await playlistsRepository.createMusic(body);
  return newMusic;
}

async function postMusicsPlaylist(body: NewMusicsPlaylistProtocol, userId: number) {
  const newMusicsPlaylist = await playlistsRepository.createMusicsPlaylist(body, userId);
  return newMusicsPlaylist;
}

const playlistsServices = {
  getPlaylists,
  getPlaylistMusics,
  putPlaylistName,
  postPlaylist,
  postMusic,
  postMusicsPlaylist,
};

export default playlistsServices;