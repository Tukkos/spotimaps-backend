import Joi from "joi";

export const NewMusicsPlaylistSchema = Joi.object({
  playlistId: Joi.number().required(),
  musicsId: Joi.number().required(),
});
