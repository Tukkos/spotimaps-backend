import httpStatus from "http-status";
import { Response } from "express";

import { AuthenticatedRequest } from "@/middlewares/authentication-middleware";
import playlistsServices from "@/services/playlistsServices";
import { NewPlaylistProtocol } from "@/protocols/NewPlaylistProtocol";
import { NewMusicProtocol } from "@/protocols/NewMusicProtocol";
import { NewMusicsPlaylistProtocol } from "@/protocols/NewMusicsPlaylistProtocol";

export async function getUsersPlaylists(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;
    const playlists = await playlistsServices.getPlaylists(userId);
    return res.status(httpStatus.OK).send(playlists);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function getPlaylistMusic(req: AuthenticatedRequest, res: Response) {
  try {
    const playlistId = Number(req.params.playlistId);
    if (!playlistId) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }

    const playlistMusics = await playlistsServices.getPlaylistMusics(playlistId);
    return res.status(httpStatus.OK).send(playlistMusics);
    
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function putPlaylistName(req: AuthenticatedRequest, res: Response) {
  try {
    const name = req.body.name;
    const playlistId = Number(req.params.playlistId);
    if (!playlistId) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }

    const playlistNewName = await playlistsServices.putPlaylistName(playlistId, name);
    return res.status(httpStatus.OK).send(playlistNewName);

  } catch (error) {
    return res.sendStatus(httpStatus.NOT_MODIFIED);
  }
}

export async function createPlaylist(req: AuthenticatedRequest, res:Response) {
  try {
    const { userId } = req;
    const body = req.body as NewPlaylistProtocol;

    const playlist = await playlistsServices.postPlaylist(body, userId);
    return res.status(httpStatus.CREATED).send(playlist);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST);
  }
}

export async function createMusic(req: AuthenticatedRequest, res:Response) {
  try {
    const body = req.body as NewMusicProtocol;

    const music = await playlistsServices.postMusic(body);
    return res.status(httpStatus.CREATED).send(music);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function createMusicsPlaylist(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;
    const body = req.body as NewMusicsPlaylistProtocol;

    const musicsPlaylist = await playlistsServices.postMusicsPlaylist(body, userId);
    return res.status(httpStatus.CREATED).send(musicsPlaylist);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}