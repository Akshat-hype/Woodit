import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle } from "lucide-react";
import { HERO_COPY, WHATSAPP_LINK } from "../../../utils/constants";
import heroImage from "../../../assets/images/hero-1.webp";
import heroMobileImage from "../../../assets/images/hero-1-mobile.webp";
import Button from "../common/Button";
import { heroService } from "../../../services/hero.service";

const Hero = () => {
  const [heroBanner, setHeroBanner] = useState(null);

  useEffect(() => {
    heroService
      .getHero()
      .then((res) => {
        const banners = res.data.data.banners || [];
        if (banners.length > 0) {
          setHeroBanner(banners[0]);
        }
      })
      .catch(() => {
        // Fallback to default images
      });
  }, []);

  const displayImage = heroBanner?.media_url || heroImage;

  return (
    <section className="relative min-h-[calc(100svh-64px)] overflow-hidden bg-[#111] text-white">
      {heroBanner?.media_type === "video" ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={displayImage} type="video/mp4" />
        </video>
      ) : (
        <picture className="absolute inset-0">
          <source media="(max-width: 640px)" srcSet={heroMobileImage} />
          <img
            src={displayImage}
            alt="WoodIt real wood furniture collection"
            className="h-full w-full object-cover"
          />
        </picture>
      )}
      <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/45 to-black/15" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-black/45 to-transparent" />

      <div className="page-shell relative z-10 flex min-h-[calc(100svh-64px)] items-end py-10 sm:py-14 lg:py-16">
        <div className="max-w-2xl pb-8 sm:pb-10">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-primary-light)]">
            Handcrafted in Jodhpur
          </p>
          <h1 className="max-w-4xl font-serif text-5xl font-semibold leading-[1.02] sm:text-7xl lg:text-8xl">
            {HERO_COPY.headline}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-white/82 sm:text-lg">
            {HERO_COPY.supportingLine}
          </p>
          <p className="mt-2 max-w-xl text-sm leading-6 text-white/68 sm:text-base">
            {HERO_COPY.supportingDetail}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link to="/category/chair-gallery">
              <Button size="lg" className="w-full sm:w-auto">
                View Catalogue <ArrowRight size={18} />
              </Button>
            </Link>
            <a href={WHATSAPP_LINK()} target="_blank" rel="noreferrer">
              <Button
                variant="outline"
                size="lg"
                className="w-full border-white/80 text-white hover:bg-white hover:text-[var(--color-text)] sm:w-auto"
              >
                <MessageCircle size={18} />
                WhatsApp
              </Button>
            </a>
          </div>

          <div className="mt-9 grid max-w-xl grid-cols-3 gap-3 border-t border-white/20 pt-5">
            {[
              { value: "B2B", label: "Focused" },
              { value: "8", label: "Collections" },
              { value: "Real", label: "Wood" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-serif text-2xl font-semibold sm:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.12em] text-white/60">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
