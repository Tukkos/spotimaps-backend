import { Router } from "express";

import { createMusic, createMusicsPlaylist, createPlaylist, getPlaylistMusic, getUsersPlaylists, putPlaylistName } from "@/controllers/playlistsController";
import { authenticateToken } from "@/middlewares/authentication-middleware";
import { validateBody } from "@/middlewares/validationMiddlewares";
import { NewPlaylistScheema } from "@/schemas/createPlaylistSchema";
import { NewMusicSchema } from "@/schemas/createMusicSchema";
import { NewMusicsPlaylistSchema } from "@/schemas/createMusicPlaylistSchema";

const playlistsRouter = Router();

playlistsRouter
  .all("/*", authenticateToken)
  .get("", getUsersPlaylists)
  .get("/:playlistId", getPlaylistMusic)
  .put("/name/:playlistId", putPlaylistName)
  .post("", validateBody(NewPlaylistScheema), createPlaylist)
  .post("/music", validateBody(NewMusicSchema), createMusic)
  .post("/musicsPlaylist", validateBody(NewMusicsPlaylistSchema), createMusicsPlaylist);

export { playlistsRouter };