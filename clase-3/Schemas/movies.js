import z from 'zod'

const movieSchema = z.object({
  title: z.string({ invalid_type_error: 'Movie title no es String' }),
  year: z.number().int().min(1900).max(2025),
  director: z.string(),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10),
  poster: z.string().url(),
  genre: z.array(z.string(
    z.enum(['Action', 'Drama', 'Adventure', 'Comedy', 'Fantasy', 'Horror', 'Thriller', 'Sci-Fi'])
  ))
})

export function validateMovie (object) {
  return movieSchema.safeParse(object)
}
