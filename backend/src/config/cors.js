import env from './env.js';

const corsOptions = {
  origin: env.NODE_ENV === 'production'
    ? env.CLIENT_URL
    : ['http://localhost:5173', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

export default corsOptions;