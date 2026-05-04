import express from 'express';
import cors from 'cors';
import corsOptions from './config/cors.js';
import { errorMiddleware } from './middlewares/error.middleware.js';
import { rateLimitMiddleware } from './middlewares/rateLimit.middleware.js';

// Routes
import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/product.routes.js';
import inquiryRoutes from './routes/inquiry.routes.js';
import bannerRoutes from './routes/banner.routes.js';
import testimonialRoutes from './routes/testimonial.routes.js';
import catalogueRoutes from './routes/catalogue.routes.js';
import categoryRoutes from './routes/category.routes.js';

const app = express();

// Core middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(rateLimitMiddleware);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', env: process.env.NODE_ENV });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/banners', bannerRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/catalogue', catalogueRoutes);
app.use('/api/categories', categoryRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Global error handler (always last)
app.use(errorMiddleware);

export default app;