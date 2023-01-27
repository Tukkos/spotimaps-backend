import { Router } from "express";

import { getUsersPlaylists } from "@/controllers/playlistsController";
import { authenticateToken } from "@/middlewares/authentication-middleware";

const playlistsRouter = Router();

playlistsRouter
  .all("/*", authenticateToken)
  .get("", getUsersPlaylists);

export { playlistsRouter };