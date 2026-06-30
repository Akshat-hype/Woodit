export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
export const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '919680077007';

export const WHATSAPP_LINK = (message = 'Hello, I am interested in WoodIt Exportz furniture.') =>
  `https://wa.me/${919680077007}?text=${encodeURIComponent(message)}`;

export const HERO_COPY = {
  headline: 'Crafted in Wood. Made for the World.',
  supportingLine: 'Export-quality furniture for hospitality, retail, and modern living.',
  supportingDetail: 'Handcrafted in Jodhpur with precision, durability, and timeless design.',
};

export const ABOUT_COPY = {
  shortIntro:
    'WoodIt is a Jodhpur-based furniture manufacturer creating handcrafted pieces for global spaces where design, durability, and detail come together.',
  brandStory:
    'At WoodIt, every piece begins with a simple belief that furniture should not just fill a space, it should belong to it. Rooted in Jodhpur\'s legacy of craftsmanship, we work closely with skilled artisans who understand wood, material, and form at a deeper level. Each design is shaped with intention, combining real wood, metal, rope, and leather to create pieces that feel as good as they look. We do not believe in fast furniture. We believe in pieces that hold their strength, their finish, and their character over time. Furniture that travels across spaces from boutique cafes and hotels to thoughtfully designed homes and continues to perform. While we primarily partner with hospitality brands, designers, and global buyers, every product carries the same promise: consistency, reliability, and a standard that meets the world. Because at WoodIt, we are not just making furniture, we are crafting pieces that stay.',
};

export const COLLECTIONS_COPY = {
  title: 'Our Collections',
  supportingLine: 'Explore thoughtfully designed furniture collections crafted for global spaces and modern interiors.',
};

export const CONTACT = {
  businessName: 'WoodIt Exportz',
  phone: '+91-9680077007',
  email: 'info@woodit.co.in',
  location: 'Jodhpur, Rajasthan, India',
  hours: 'Monday - Saturday: 10:00 AM - 7:00 PM',
  socials: [
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/woodit_exportz?igsh=MXE1dDVzdzJ4bGNhcg==',
    },
    {
      name: 'Pinterest',
      url: 'https://pin.it/f88KlycUR',
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/company/woodit-furniture11/',
    },
  ],
};

export const FINAL_BRAND_LINE = 'WoodIt Exportz: Handcrafted in India. Delivered Worldwide.';

export const CATEGORIES = [
  {
    name: 'The Chair Gallery',
    slug: 'chair-gallery',
    tagline: 'Curated chairs combining comfort, craftsmanship, and modern global design aesthetics',
    heroSubtitle: 'A curated range of chairs designed for global interiors',
    introHeading: 'Versatile Seating, Crafted to Last',
    introText:
      'The Chair Gallery brings together a wide range of seating styles - from dining chairs to accent and lounge pieces. Each design focuses on comfort, structure, and visual appeal, making them suitable for both residential and commercial environments.',
  },
  {
    name: 'Urban Metal Seating',
    slug: 'urban-metal-seating',
    tagline: 'Industrial-inspired metal chairs designed for durability and contemporary spaces',
    heroSubtitle: 'Industrial strength meets contemporary design',
    introHeading: 'Built for Durability and Style',
    introText:
      'Urban Metal Seating focuses on industrial aesthetics and long-lasting construction. Designed using high-quality metal frames, these chairs are ideal for cafes, restaurants, and modern interiors.',
  },
  {
    name: 'The High Seat Collection',
    slug: 'high-seat-collection',
    tagline: 'Elevated seating solutions crafted for bars, counters, and hospitality environments',
    heroSubtitle: 'Elevated seating for modern hospitality spaces',
    introHeading: 'Designed for Height and Comfort',
    introText:
      'This collection includes bar stools and counter seating crafted for cafes, bars, and restaurants. Built for both comfort and durability, these pieces enhance elevated dining experiences.',
  },
  {
    name: 'Signature Seating',
    slug: 'signature-seating',
    tagline: 'Statement seating pieces designed for comfort, style, and everyday use',
    heroSubtitle: 'Comfort-driven seating designed to stand out',
    introHeading: 'Statement Pieces for Everyday Comfort',
    introText:
      'Signature Seating features lounge chairs and sofa chairs designed to bring comfort and character into any space. Each piece balances softness with structural strength.',
  },
  {
    name: 'Dining and Living Ensembles',
    slug: 'dining-living-ensembles',
    tagline: 'Complete furniture sets designed for cohesive living and dining spaces',
    heroSubtitle: 'Complete furniture sets for cohesive interiors',
    introHeading: 'Designed for Complete Spaces',
    introText:
      'This collection offers coordinated living and dining furniture designed for harmony and functionality. Ideal for residential and hospitality interiors.',
  },
  {
    name: 'Signature Bedroom Sets',
    slug: 'signature-bedroom-sets',
    tagline: 'Bedroom furniture crafted for comfort, durability, and timeless appeal',
    heroSubtitle: 'Furniture designed for comfort, rest, and durability',
    introHeading: 'Built for Restful Living',
    introText:
      'Our bedroom sets are crafted with real wood and designed for long-term comfort. Each piece reflects simplicity, strength, and timeless appeal.',
  },
  {
    name: 'Open-Air Collection',
    slug: 'open-air-collection',
    tagline: 'Weather-resistant furniture designed for outdoor and semi-open environments',
    heroSubtitle: 'Furniture designed for outdoor durability and style',
    introHeading: 'Made for Outdoor Living',
    introText:
      'The Open-Air Collection includes weather-resistant furniture suitable for patios, gardens, and cafes. Designed to withstand varying conditions without compromising aesthetics.',
  },
  {
    name: 'Cabinets and Side Tables',
    slug: 'cabinets-side-tables',
    tagline: 'Functional storage and accent pieces with refined craftsmanship',
    heroSubtitle: 'Functional storage with refined design',
    introHeading: 'Smart Storage, Crafted Beautifully',
    introText:
      'This collection offers versatile storage and surface solutions. From bedside tables to cabinets, each piece is built for practicality and visual balance.',
  },
];
