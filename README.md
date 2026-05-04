# Woodit


client/
├── public/
│   └── favicon.ico
│
├── src/
│   ├── assets/
│   │   ├── images/
│   │   ├── icons/
│   │   └── videos/
│
│   ├── website/                 # 🌐 MAIN WEBSITE
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   └── WhatsAppFloat.jsx
│   │   │   │
│   │   │   ├── home/
│   │   │   │   ├── Hero.jsx
│   │   │   │   ├── Categories.jsx
│   │   │   │   ├── Testimonials.jsx
│   │   │   │   └── FeaturedProducts.jsx
│   │   │   │
│   │   │   ├── product/
│   │   │   │   ├── ProductCard.jsx
│   │   │   │   ├── ProductGrid.jsx
│   │   │   │   └── ProductModal.jsx
│   │   │   │
│   │   │   └── common/
│   │   │       ├── Button.jsx
│   │   │       └── Loader.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   │
│   │   │   └── categories/
│   │   │       ├── ChairsSofa.jsx
│   │   │       ├── Beds.jsx
│   │   │       ├── BeachBar.jsx
│   │   │       ├── CompleteRoom.jsx
│   │   │       ├── Miscellaneous.jsx
│   │   │       └── Almera.jsx
│   │   │
│   │   └── routes/
│   │       └── WebsiteRoutes.jsx
│
│   ├── admin/                   # 🛠 ADMIN PORTAL
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── AdminSidebar.jsx
│   │   │   │   ├── AdminHeader.jsx
│   │   │   │   └── AdminLayout.jsx
│   │   │   │
│   │   │   └── common/
│   │   │       ├── Table.jsx
│   │   │       ├── Modal.jsx
│   │   │       └── ConfirmDialog.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── Inquiries.jsx
│   │   │   ├── Banners.jsx
│   │   │   ├── Testimonials.jsx
│   │   │   └── Catalogue.jsx
│   │   │
│   │   ├── routes/
│   │   │   └── AdminRoutes.jsx
│   │   │
│   │   └── utils/
│   │       └── adminGuards.js
│
│   ├── services/                # 🔗 SHARED SERVICES
│   │   ├── api.js
│   │   ├── auth.service.js
│   │   ├── product.service.js
│   │   ├── inquiry.service.js
│   │   ├── banner.service.js
│   │   └── testimonial.service.js
│
│   ├── context/                 # 🔐 SHARED STATE
│   │   ├── AuthContext.jsx
│   │   └── AdminContext.jsx
│
│   ├── hooks/
│   │   ├── useAuth.js
│   │   └── useFetch.js
│
│   ├── utils/
│   │   ├── constants.js
│   │   └── validators.js
│
│   ├── styles/
│   │   └── globals.css          # Tailwind v4
│
│   ├── supabaseClient.js
│   ├── App.jsx                  # Route switcher
│   └── main.jsx
│
├── .env
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── package.json



backend/
├── src/
│   ├── config/
│   │   ├── supabase.js
│   │   ├── env.js
│   │   └── cors.js
│
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── product.controller.js
│   │   ├── inquiry.controller.js
│   │   ├── banner.controller.js
│   │   ├── testimonial.controller.js
│   │   └── catalogue.controller.js
│
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── product.routes.js
│   │   ├── inquiry.routes.js
│   │   ├── banner.routes.js
│   │   ├── testimonial.routes.js
│   │   └── catalogue.routes.js
│
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   ├── admin.middleware.js
│   │   ├── error.middleware.js
│   │   └── rateLimit.middleware.js
│
│   ├── services/
│   │   ├── supabase.service.js
│   │   ├── product.service.js
│   │   ├── inquiry.service.js
│   │   └── media.service.js
│
│   ├── utils/
│   │   ├── logger.js
│   │   ├── response.js
│   │   └── validators.js
│
│   ├── app.js
│   └── server.js
│
├── .env
├── .gitignore
├── package.json
└── README.md







