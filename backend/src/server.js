import app from './app.js';
import env from './config/env.js';

const startServer = () => {
  try {
    app.listen(env.PORT,"0.0.0.0", () => {
      console.log(`Server running on port ${env.PORT} [${env.NODE_ENV}]`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();