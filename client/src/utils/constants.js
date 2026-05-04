export const API_URL = import.meta.env.VITE_API_URL;
export const WHATSAPP_NUMBER = '919680077007';

export const WHATSAPP_LINK = (message = 'Hello, I am interested in WoodIt Exportz furniture.') =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const CONTACT = {
  phone: '+91-9680077007',
  email: 'wooditexportz@gmail.com',
  location: 'Jodhpur, Rajasthan, India',
  hours: 'Monday – Saturday: 10:00 AM – 7:00 PM',
};

export const CATEGORIES = [
  {
    name: 'The Chair Gallery',
    slug: 'chair-gallery',
    tagline: 'Curated chairs combining comfort, craftsmanship, and modern global design aesthetics',
    icon: '🪑',
    heroSubtitle: 'A curated range of chairs designed for global interiors',
    introHeading: 'Versatile Seating, Crafted to Last',
    introText: 'The Chair Gallery brings together a wide range of seating styles — from dining chairs to accent and lounge pieces. Each design focuses on comfort, structure, and visual appeal, making them suitable for both residential and commercial environments.',
  },
  {
    name: 'Urban Metal Seating',
    slug: 'urban-metal-seating',
    tagline: 'Industrial-inspired metal chairs designed for durability and contemporary spaces',
    icon: '🔩',
    heroSubtitle: 'Industrial strength meets contemporary design',
    introHeading: 'Built for Durability & Style',
    introText: 'Urban Metal Seating focuses on industrial aesthetics and long-lasting construction. Designed using high-quality metal frames, these chairs are ideal for cafés, restaurants, and modern interiors.',
  },
  {
    name: 'The High Seat Collection',
    slug: 'high-seat-collection',
    tagline: 'Elevated seating solutions crafted for bars, counters, and hospitality environments',
    icon: '🍽️',
    heroSubtitle: 'Elevated seating for modern hospitality spaces',
    introHeading: 'Designed for Height & Comfort',
    introText: 'This collection includes bar stools and counter seating crafted for cafés, bars, and restaurants. Built for both comfort and durability, these pieces enhance elevated dining experiences.',
  },
  {
    name: 'Signature Seating',
    slug: 'signature-seating',
    tagline: 'Statement seating pieces designed for comfort, style, and everyday use',
    icon: '✨',
    heroSubtitle: 'Comfort-driven seating designed to stand out',
    introHeading: 'Statement Pieces for Everyday Comfort',
    introText: 'Signature Seating features lounge chairs and sofa chairs designed to bring comfort and character into any space. Each piece balances softness with structural strength.',
  },
  {
    name: 'Dining & Living Ensembles',
    slug: 'dining-living-ensembles',
    tagline: 'Complete furniture sets designed for cohesive living and dining spaces',
    icon: '🏠',
    heroSubtitle: 'Complete furniture sets for cohesive interiors',
    introHeading: 'Designed for Complete Spaces',
    introText: 'This collection offers coordinated living and dining furniture designed for harmony and functionality. Ideal for residential and hospitality interiors.',
  },
  {
    name: 'Signature Bedroom Sets',
    slug: 'signature-bedroom-sets',
    tagline: 'Bedroom furniture crafted for comfort, durability, and timeless appeal',
    icon: '🛏️',
    heroSubtitle: 'Furniture designed for comfort, rest, and durability',
    introHeading: 'Built for Restful Living',
    introText: 'Our bedroom sets are crafted with real wood and designed for long-term comfort. Each piece reflects simplicity, strength, and timeless appeal.',
  },
  {
    name: 'Open-Air Collection',
    slug: 'open-air-collection',
    tagline: 'Weather-resistant furniture designed for outdoor and semi-open environments',
    icon: '🌿',
    heroSubtitle: 'Furniture designed for outdoor durability and style',
    introHeading: 'Made for Outdoor Living',
    introText: 'The Open-Air Collection includes weather-resistant furniture suitable for patios, gardens, and cafés. Designed to withstand varying conditions without compromising aesthetics.',
  },
  {
    name: 'Cabinets & Side Tables',
    slug: 'cabinets-side-tables',
    tagline: 'Functional storage and accent pieces with refined craftsmanship',
    icon: '🗄️',
    heroSubtitle: 'Functional storage with refined design',
    introHeading: 'Smart Storage, Crafted Beautifully',
    introText: 'This collection offers versatile storage and surface solutions. From bedside tables to cabinets, each piece is built for practicality and visual balance.',
  },
];