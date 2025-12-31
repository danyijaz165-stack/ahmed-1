export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  slug: string
  onSale?: boolean
  description?: string
  images?: string[]
  category: string
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Ecolight LED Chandelier',
    price: 3000,
    originalPrice: 5000,
    image: 'https://images.pexels.com/photos/132340/pexels-photo-132340.jpeg?auto=compress&cs=tinysrgb&w=360',
    slug: 'ecolight-led-chandelier',
    onSale: true,
    category: "gentleman's-reserve",
    description: 'Elegant LED chandelier for dining rooms and living spaces',
    images: [
      'https://images.pexels.com/photos/132340/pexels-photo-132340.jpeg?auto=compress&cs=tinysrgb&w=360',
    ],
  },
  {
    id: '2',
    name: 'Ecolight Pendant Light',
    price: 2400,
    image: 'https://images.pexels.com/photos/3288108/pexels-photo-3288108.jpeg?auto=compress&cs=tinysrgb&w=360',
    slug: 'ecolight-pendant-light',
    category: "gentleman's-reserve",
    description: 'Modern pendant light perfect for kitchen islands and tables',
  },
  {
    id: '3',
    name: 'Ecolight Track Light Set',
    price: 2000,
    originalPrice: 4500,
    image: 'https://images.pexels.com/photos/1451471/pexels-photo-1451471.jpeg?auto=compress&cs=tinysrgb&w=360',
    slug: 'ecolight-track-light-set',
    onSale: true,
    category: "gentleman's-reserve",
    description: 'Adjustable track lighting system for focused illumination',
  },
  {
    id: '4',
    name: 'Ecolight Recessed Downlight',
    price: 2199,
    image: 'https://images.pexels.com/photos/3709388/pexels-photo-3709388.jpeg?auto=compress&cs=tinysrgb&w=360',
    slug: 'ecolight-recessed-downlight',
    category: "gentleman's-reserve",
    description: 'Sleek recessed downlight for modern ceiling installation',
  },
  {
    id: '13',
    name: 'Ecolight LED Panel 18W',
    price: 3200,
    originalPrice: 4000,
    image:
      'https://images.pexels.com/photos/3709388/pexels-photo-3709388.jpeg?auto=compress&cs=tinysrgb&w=360',
    slug: 'ecolight-led-panel-18w',
    onSale: true,
    category: "gentleman's-reserve",
    description: 'Slim ceiling LED panel with bright, energy-efficient light.',
  },
  {
    id: '14',
    name: 'Ecolight Warm Ceiling Spot',
    price: 2500,
    image:
      'https://images.pexels.com/photos/1451471/pexels-photo-1451471.jpeg?auto=compress&cs=tinysrgb&w=360',
    slug: 'ecolight-warm-ceiling-spot',
    category: "gentleman's-reserve",
    description: 'Recessed warm white spot light for living rooms and halls.',
  },
  {
    id: '15',
    name: 'Ecolight Decorative Lamp',
    price: 2800,
    image:
      'https://images.pexels.com/photos/751175/pexels-photo-751175.jpeg?auto=compress&cs=tinysrgb&w=360',
    slug: 'ecolight-decorative-lamp',
    category: "gentleman's-reserve",
    description: 'Stylish table lamp to give your room a cozy modern look.',
  },
  {
    id: '5',
    name: 'Ecolight Wall Sconce',
    price: 3000,
    image: 'https://images.pexels.com/photos/1484516/pexels-photo-1484516.jpeg?auto=compress&cs=tinysrgb&w=360',
    slug: 'ecolight-wall-sconce',
    category: 'products',
    description: 'Decorative wall sconce for ambient lighting',
  },
  {
    id: '6',
    name: 'Ecolight LED Strip Light',
    price: 7000,
    image: 'https://images.pexels.com/photos/3945673/pexels-photo-3945673.jpeg?auto=compress&cs=tinysrgb&w=360',
    slug: 'ecolight-led-strip-light',
    category: 'products',
    description: 'Flexible LED strip lighting for under cabinets and accent lighting',
  },
  {
    id: '7',
    name: 'Ecolight Floor Lamp',
    price: 3149,
    originalPrice: 5000,
    image: 'https://images.pexels.com/photos/112811/pexels-photo-112811.jpeg?auto=compress&cs=tinysrgb&w=360',
    slug: 'ecolight-floor-lamp',
    onSale: true,
    category: 'products',
    description: 'Modern floor lamp with adjustable height',
  },
  {
    id: '8',
    name: 'Ecolight Ceiling Fan Light',
    price: 1800,
    image: 'https://images.pexels.com/photos/1517355/pexels-photo-1517355.jpeg?auto=compress&cs=tinysrgb&w=360',
    slug: 'ecolight-ceiling-fan-light',
    category: 'products',
    description: 'Energy-efficient ceiling fan with integrated LED light',
  },
  {
    id: '9',
    name: 'Ecolight Table Lamp',
    price: 1999,
    originalPrice: 5000,
    image: 'https://images.pexels.com/photos/751175/pexels-photo-751175.jpeg?auto=compress&cs=tinysrgb&w=360',
    slug: 'ecolight-table-lamp',
    onSale: true,
    category: 'products',
    description: 'Stylish table lamp for bedrooms and study areas',
  },
  {
    id: '10',
    name: 'Ecolight Outdoor Wall Light',
    price: 2200,
    image: 'https://images.pexels.com/photos/132340/pexels-photo-132340.jpeg?auto=compress&cs=tinysrgb&w=360',
    slug: 'ecolight-outdoor-wall-light',
    category: 'products',
    description: 'Weather-resistant outdoor wall light for patios and gardens',
  },
  {
    id: '11',
    name: 'Ecolight LED Bulb Pack',
    price: 2190,
    image: 'https://images.pexels.com/photos/3709388/pexels-photo-3709388.jpeg?auto=compress&cs=tinysrgb&w=360',
    slug: 'ecolight-led-bulb-pack',
    category: 'products',
    description: 'Pack of 4 energy-efficient LED bulbs (9W each)',
  },
  {
    id: '12',
    name: 'Ecolight Spot Light',
    price: 3000,
    image: 'https://images.pexels.com/photos/1451471/pexels-photo-1451471.jpeg?auto=compress&cs=tinysrgb&w=360',
    slug: 'ecolight-spot-light',
    category: 'products',
    description: 'Adjustable spot light for highlighting artwork and features',
  },
  {
    id: '16',
    name: '12 W Bulb',
    price: 130,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    slug: '12w-bulb',
    category: 'products',
    description: 'Energy-efficient 12W LED bulb with bright white light',
  },
  {
    id: '17',
    name: '18 W Bulb',
    price: 250,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    slug: '18w-bulb',
    category: 'products',
    description: 'High-power 18W LED bulb for brighter illumination',
  },
  {
    id: '18',
    name: '7 W SMD Downlight Metallic',
    price: 230,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    slug: '7w-smd-downlight-metallic',
    category: 'products',
    description: 'Sleek 7W SMD downlight with metallic finish for modern ceilings',
  },
  {
    id: '19',
    name: '12 W SMD Downlight Metallic',
    price: 280,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    slug: '12w-smd-downlight-metallic',
    category: 'products',
    description: 'Powerful 12W SMD downlight with metallic finish',
  },
  {
    id: '20',
    name: '7 W PK Moon',
    price: 250,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    slug: '7w-pk-moon',
    category: 'products',
    description: 'Elegant 7W PK Moon light with moon-like design',
  },
  {
    id: '21',
    name: '12 W PK Moon',
    price: 280,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    slug: '12w-pk-moon',
    category: 'products',
    description: 'Bright 12W PK Moon light for enhanced illumination',
  },
  {
    id: '22',
    name: '12 W Ice Moon Adjustable',
    price: 350,
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    slug: '12w-ice-moon-adjustable',
    category: 'products',
    description: 'Adjustable 12W Ice Moon light with flexible positioning',
  },
  {
    id: '23',
    name: '18 W Ice Moon Adjustable',
    price: 450,
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    slug: '18w-ice-moon-adjustable',
    category: 'products',
    description: 'High-power 18W Ice Moon adjustable light',
  },
  {
    id: '24',
    name: '24 W Ice Moon Adjustable',
    price: 650,
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    slug: '24w-ice-moon-adjustable',
    category: 'products',
    description: 'Premium 24W Ice Moon adjustable light for maximum brightness',
  },
  {
    id: '25',
    name: '5 W COB',
    price: 230,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    slug: '5w-cob',
    category: 'products',
    description: 'Compact 5W COB LED light with uniform illumination',
  },
]

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find((p) => p.slug === slug)
}

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter((p) => p.category === category)
}


