import cors from 'cors'

export const corsMiddleware = () =>
  cors({
    origin: (origin, callback) => {
      const ACCEPTED_ORIGINS = [
        'http://localhost:3030',
        'http://localhost:8080',
        'http://localhost:1234',
        'http://127.0.0.1:5500',
        'http://movies.com'
      ]

      if (ACCEPTED_ORIGINS.includes(origin)) {
        return callback(null, true)
      }
      if (!origin) {
        return callback(null, true)
      }
      return callback(new Error('Not allowed by Cors'))
    }
  })
