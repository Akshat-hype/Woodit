import { useEffect, useState } from "react";
import Hero from "../components/home/Hero";
import Categories from "../components/home/Categories";
import FeaturedProducts from "../components/home/FeaturedProducts";
import Testimonials from "../components/home/Testimonials";
import {
  ABOUT_COPY,
  FINAL_BRAND_LINE,
  WHATSAPP_LINK,
} from "../../utils/constants";
import Button from "../components/common/Button";
import aboutOne from "../../assets/images/about-1.webp";
import aboutTwo from "../../assets/images/about-2.webp";
import { catalogueService } from "../../services/catalogue.service";

const AboutSection = () => (
  <section className="bg-[var(--color-background)] py-16 sm:py-20">
    <div className="page-shell grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-primary)]">
          About WoodIt
        </p>
        <h2 className="font-serif text-4xl font-semibold leading-tight text-[var(--color-text)] sm:text-5xl">
          Rooted in craft. Built for the world.
        </h2>
        <p className="mt-5 max-w-2xl text-sm leading-7 text-[var(--color-text-muted)]">
          {ABOUT_COPY.shortIntro}
        </p>
        <p className="mt-5 max-w-3xl text-sm leading-7 text-[var(--color-text-muted)]">
          {ABOUT_COPY.brandStory}
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {[
            {
              label: "Real Wood",
              desc: "Real wood, metal, rope, and leather shaped with intention.",
            },
            {
              label: "B2B Focused",
              desc: "Built for hospitality brands, designers, and global buyers.",
            },
            {
              label: "Export Quality",
              desc: "Consistency, reliability, and standards that meet the world.",
            },
            {
              label: "Jodhpur Craft",
              desc: "Rooted in a legacy of skilled furniture craftsmanship.",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-md border border-[var(--color-border)] bg-white p-4"
            >
              <p className="text-sm font-semibold text-[var(--color-text)]">
                {item.label}
              </p>
              <p className="mt-1 text-xs leading-5 text-[var(--color-text-muted)]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <img
          src={aboutOne}
          alt="WoodIt crafted furniture detail"
          width="606"
          height="808"
          loading="lazy"
          decoding="async"
          className="aspect-[3/4] w-full rounded-md object-cover"
        />
        <img
          src={aboutTwo}
          alt="WoodIt furniture interior setting"
          width="606"
          height="808"
          loading="lazy"
          decoding="async"
          className="mt-8 aspect-[3/4] w-full rounded-md object-cover sm:mt-12"
        />
      </div>
    </div>
  </section>
);

const CatalogueCTA = () => {
  const [catalogueUrl, setCatalogueUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    try {
      setLoading(true);
      const res = await catalogueService.get();
      const url = res.data.data.catalogue?.file_url;
      if (url) {
        window.open(url, "_blank");
      }
    } catch (err) {
      console.error("Failed to load company profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#171310] py-16 text-white sm:py-20">
      <div className="page-shell text-center">
        <h2 className="font-serif text-4xl font-semibold sm:text-5xl">
          Discover WoodIt Exportz
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/62">
          Explore our company profile to learn about our collections,
          craftsmanship, hospitality projects, and manufacturing capabilities.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button
            size="lg"
            onClick={handleDownload}
            disabled={loading}
            className="w-full sm:w-auto"
          >
            {loading ? "Loading..." : "View Company Profile"}
          </Button>
          <a href={WHATSAPP_LINK()} target="_blank" rel="noreferrer">
            <Button
              variant="outline"
              size="lg"
              className="w-full border-white/80 text-white hover:bg-white hover:text-[var(--color-text)] sm:w-auto"
            >
              Talk to Us
            </Button>
          </a>
        </div>
        <p className="mt-8 text-xs uppercase tracking-[0.18em] text-white/45">
          {FINAL_BRAND_LINE}
        </p>
      </div>
    </section>
  );
};

const Home = () => (
  <div>
    <Hero />
    <AboutSection />
    <Categories />
    <FeaturedProducts />
    <Testimonials />
    <CatalogueCTA />
  </div>
);

export default Home;
