import about1 from "../../../assets/images/about-1.webp";
import about2 from "../../../assets/images/about-2.webp";
import about3 from "../../../assets/images/about-3.webp";

export default function About() {
  return (
    <section className="px-6 md:px-12 py-28 bg-[var(--wood-bg)]">
      
      <div className="mx-auto grid max-w-6xl items-center gap-20 md:grid-cols-2">
        
        {/* LEFT: IMAGE LAYOUT */}
        <div className="grid grid-cols-2 gap-6">
          
          {/* Large Image */}
          <div className="col-span-2 overflow-hidden rounded-2xl">
            <img
              src={about1}
              alt="Wood craftsmanship"
              className="w-full aspect-[7/5] object-cover transition duration-500 hover:scale-105"
            />
          </div>

          {/* Bottom Left */}
          <div className="overflow-hidden rounded-2xl">
            <img
              src={about2}
              alt="Furniture detail"
              className="w-full aspect-[7/5] object-cover transition duration-500 hover:scale-105"
            />
          </div>

          {/* Bottom Right */}
          <div className="overflow-hidden rounded-2xl">
            <img
              src={about3}
              alt="Workshop"
              className="w-full aspect-[7/5] object-cover transition duration-500 hover:scale-105"
            />
          </div>

        </div>

        {/* RIGHT: CONTENT */}
        <div className="max-w-xl">
          
          <h2 className="text-3xl md:text-4xl font-semibold leading-tight text-[var(--wood-text)]">
            Crafted with Purpose. Built to Last.
          </h2>

          <div className="mt-5 h-[2px] w-20 bg-[var(--wood-surface)]" />

          <p className="mt-8 text-[var(--wood-text)]/70 leading-relaxed">
            WoodIt is a furniture brand focused on creating high-quality wooden
            pieces for homes, hotels, and commercial spaces. Every product is
            crafted using real wood, ensuring durability, strength, and a natural
            aesthetic that stands the test of time.
          </p>

          <p className="mt-5 text-[var(--wood-text)]/70 leading-relaxed">
            We primarily serve businesses in hospitality and interior design,
            while also offering select pieces for individual buyers. Our approach
            combines traditional craftsmanship with modern design to deliver
            furniture that feels both refined and functional.
          </p>

          {/* Highlights */}
          <div className="mt-10 space-y-3 text-[var(--wood-text)]/80">
            <p>• Real wood. No engineered substitutes.</p>
            <p>• Designed for premium hospitality environments.</p>
            <p>• Built for durability, not trends.</p>
          </div>

        </div>

      </div>
    </section>
  );
}