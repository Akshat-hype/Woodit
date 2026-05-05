import api from "./api";

export const heroService = {
  getHero: () => api.get("/banners", { params: { type: "hero" } }),
  updateHero: (heroData) => api.post("/banners", heroData),
};
