import { Router } from "express";

import { getPlaylistMusic, getUsersPlaylists, putPlaylistName } from "@/controllers/playlistsController";
import { authenticateToken } from "@/middlewares/authentication-middleware";

const playlistsRouter = Router();

playlistsRouter
  .all("/*", authenticateToken)
  .get("", getUsersPlaylists)
  .get("/:playlistId", getPlaylistMusic)
  .put("/name/:playlistId", putPlaylistName);

export { playlistsRouter };