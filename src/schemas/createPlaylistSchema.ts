import Joi from "joi";

export const NewPlaylistScheema = Joi.object({
  bandName: Joi.string().required(),
  duration: Joi.number().required(),
  image: Joi.string().required()
});
