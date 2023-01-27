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
    return res.sendStatus(httpStatus.OK);
  }
}