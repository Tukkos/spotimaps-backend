import Joi from "joi";

export const NewMusicSchema = Joi.object({
  name: Joi.string().required(),
  duration: Joi.number().required(),
});
