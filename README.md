# ScentSation Perfume E-Commerce Website

A modern, responsive e-commerce website for perfumes built with Next.js, React, and Tailwind CSS. This is a replica of scentsationperfume.com with all the same features and design.

## Features

- 🏠 **Homepage** with product collections and hero sections
- 🛍️ **Product Catalog** with filtering and search
- 📦 **Product Pages** with image gallery, pricing, and add to cart
- 🛒 **Shopping Cart** with quantity management
- 📧 **Contact Form** for customer inquiries
- 📱 **Responsive Design** for all devices
- 🎨 **Modern UI** matching the original design

## Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Icons** - Icons

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── page.tsx              # Homepage
│   ├── layout.tsx             # Root layout
│   ├── globals.css            # Global styles
│   ├── products/
│   │   └── [slug]/           # Dynamic product pages
│   ├── pages/
│   │   └── contact/          # Contact page
│   ├── collections/
│   │   └── catalog/          # Catalog page
│   ├── cart/                 # Shopping cart
│   └── checkout/             # Checkout page
├── components/
│   ├── Header.tsx            # Navigation header
│   ├── Footer.tsx            # Footer component
│   ├── ProductCard.tsx       # Product card component
│   ├── ProductSlider.tsx     # Product slider
│   └── AddToCartButton.tsx   # Add to cart button
└── data/
    └── products.ts           # Product data
```

## Features in Detail

### Homepage
- Announcement bar with shipping info
- Navigation menu
- Product collection sections
- About Us section
- Instagram feed section
- Winter collection slideshow
- Newsletter signup

### Product Pages
- High-quality product images
- Product details and pricing
- Quantity selector
- Add to cart functionality
- Related products

### Shopping Cart
- View all cart items
- Update quantities
- Remove items
- Calculate totals
- Free shipping threshold (5000 PKR)

### Contact Page
- Contact form with validation
- Name, email, phone, and message fields

## Customization

### Adding Products

Edit `data/products.ts` to add or modify products:

```typescript
{
  id: 'unique-id',
  name: 'Product Name',
  price: 3000,
  originalPrice: 5000, // Optional
  image: 'image-url',
  slug: 'product-slug',
  onSale: true, // Optional
  category: 'category-name',
  description: 'Product description',
}
```

## License

This project is created for educational purposes.








