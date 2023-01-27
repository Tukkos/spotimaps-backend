import httpStatus from "http-status";
import { Response } from "express";

import { AuthenticatedRequest } from "@/middlewares/authentication-middleware";
import playlistsServices from "@/services/playlistsServices";

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