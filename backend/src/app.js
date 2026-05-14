import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import corsOptions from "./config/cors.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import { rateLimitMiddleware } from "./middlewares/rateLimit.middleware.js";

// Routes
import authRoutes from "./routes/auth.routes.js";
import otpRoutes from "./routes/otp.routes.js";
import productRoutes from "./routes/product.routes.js";
import inquiryRoutes from "./routes/inquiry.routes.js";
import bannerRoutes from "./routes/banner.routes.js";
import testimonialRoutes from "./routes/testimonial.routes.js";
import catalogueRoutes from "./routes/catalogue.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import mediaRoutes from "./routes/media.routes.js";

const app = express();

// Core middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(rateLimitMiddleware);

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", env: process.env.NODE_ENV });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/otp", otpRoutes);
app.use("/api/products", productRoutes);
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/banners", bannerRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/catalogue", catalogueRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/media", mediaRoutes);

// 1. Point Express to your Vite production build directory (Assuming side-by-side folders)
app.use(express.static(path.join(__dirname, "../client/dist")));

// 2. Fallback rule: send all non-API web requests straight to React Router
// Use a RegExp to avoid wildcard string parsing issues in path-to-regexp
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
});

// 404 handler (after static and SPA fallback)
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});
// Global error handler (always last)
app.use(errorMiddleware);

export default app;
