import api from "./api";

let heroRequest;

export const preloadHeroBanners = () => {
  if (!heroRequest) {
    heroRequest = api.get("/banners", { params: { type: "hero" } });
  }

  return heroRequest;
};

export const heroService = {
  getHero: preloadHeroBanners,
  updateHero: (heroData) => api.post("/banners", heroData),
};
