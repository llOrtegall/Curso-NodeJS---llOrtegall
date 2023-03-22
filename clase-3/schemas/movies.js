const z = require('zod')

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'Movie titles must be a string'
  }),
  year: z.number().int().min(1900).max(2024),
  director: z.string(),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10).default(5),
  poster: z.string().url({ message: 'Poster must invalidate URL' }),
  genre: z.array(
    z.enum(['Action', 'Adventure', 'Comedy', 'Drama', 'Crime', 'Fantasy', 'Horror', 'Thiller', 'Sci-Fi']),
    {
      required_error: 'Movie is required'
    }
  )
})

function validateMovie(object) {
  return movieSchema.safeParse(object)
}

function validatePartialMovie(object) {
  return movieSchema.partial().safeParse(object)
}

module.exports = {
  validateMovie,
  validatePartialMovie
}
