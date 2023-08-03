const z = require('zod')

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'movie title must be a stinrg'
  }),
  year: z.number().int().min(1900).max(2024),
  director: z.string(),
  duration: z.number(),
  poster: z.string().url(),
  genre: z.array()
})

function validateMovie(object) {
  return movieSchema.safeParse(object)
}

module.exports = {
  validateMovie
}