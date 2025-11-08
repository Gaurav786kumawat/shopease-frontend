// data.js
// Shared demo data for ShopEase frontend (client-side only).
// - Place this file at: js/data.js
// - Must be loaded BEFORE js/script.js
// - All images are Unsplash URLs (attribution list at bottom).
//
// WARNING: This is demo data for a frontend-only project. Replace with real API endpoints for production.
// Keys provided:
//  - window.products  (Array of product objects)
//  - window.categories (Array of category strings / objects)
//  - window.brands (Array of brand strings)
//  - window.users (Array of sample users with addresses)
//  - window.colors (Array of color hex strings)
//  - window.sampleReviews (Array of sample review objects used by some products)
//
// Product object shape (example):
// {
//   id: 'P001',
//   title: 'Slim Fit Casual Shirt',
//   brand: 'UrbanLoom',
//   category: 'Men',
//   price: 899,
//   mrp: 1299,
//   discount: 31,             // integer percent
//   rating: 4.3,              // 0-5
//   reviewsCount: 142,
//   images: ['https://images.unsplash.com/....', ...],
//   shortDescription: 'Breathable cotton shirt, slim fit.',
//   description: 'Full paragraph...',
//   colors: ['#000000', '#ffffff'],
//   sizes: ['S','M','L','XL'],
//   inventory: 52,
//   popularity: 230,
//   createdAt: '2025-01-15T10:00:00Z',
//   specs: { Material: '100% Cotton', Fit: 'Slim' },
//   reviews: [{ user:'Amit', rating:5, comment:'Great!'}]
// }
//
// NOTE: For brevity some fields like reviews/specs are simplified. Update as needed.

(function () {
    'use strict';

    // Helper to format dates for createdAt
    function iso(daysAgo = 0) {
        const d = new Date();
        d.setDate(d.getDate() - daysAgo);
        return d.toISOString();
    }

    // Colors palette
    window.colors = [
        '#000000', '#FFFFFF', '#1F2937', '#374151', '#0066FF', '#EF4444',
        '#10B981', '#F59E0B', '#8B5CF6', '#F97316', '#06B6D4', '#E11D48'
    ];

    // Categories & Brands
    window.categories = [
        'Men', 'Women', 'Electronics', 'Home', 'Beauty', 'Kids', 'Sports', 'Footwear', 'Accessories'
    ];

    window.brands = [
        'UrbanLoom', 'CasaComfort', 'GlowVeda', 'PeakPro', 'KiddoJoy', 'StrideWell', 'AuroraTech',
        'EverGreen', 'LuxeWear', 'CafeCasa', 'SoundWave', 'NovaGear', 'ZenHome', 'PlaySmart'
    ];

    // Sample users
    window.users = [
        {
            id: 'U001',
            name: 'Rahul Sharma',
            email: 'rahul.sharma@example.com',
            phone: '+91-9876543210',
            addresses: [
                { name: 'Rahul Sharma', phone: '+91-9876543210', line: 'Flat 12B, Silver Heights', city: 'Mumbai', postal: '400001' },
                { name: 'Rahul Sharma (Work)', phone: '+91-9876543210', line: 'Office 402, Tech Park', city: 'Mumbai', postal: '400076' }
            ]
        },
        {
            id: 'U002',
            name: 'Sneha Patel',
            email: 'sneha.patel@example.com',
            phone: '+91-9123456780',
            addresses: [
                { name: 'Sneha Patel', phone: '+91-9123456780', line: 'House 24, Rose Villa', city: 'Ahmedabad', postal: '380001' }
            ]
        }
    ];

    // A few sample reviews to reuse
    window.sampleReviews = [
        { user: 'Aman K.', rating: 5, comment: 'Excellent quality, exactly as pictured.', date: iso(14) },
        { user: 'Priya S.', rating: 4, comment: 'Good value for money. Fast delivery.', date: iso(30) },
        { user: 'Karan R.', rating: 3, comment: 'Decent product but sizing runs small.', date: iso(60) },
        { user: 'Meera T.', rating: 5, comment: 'Love it — great finish and fabric.', date: iso(7) }
    ];

    // PRODUCTS (64 items) - each has Unsplash image(s) and basic metadata
    // NOTE: replace, reorder, or expand details as required.
    window.products = [
        {
            id: 'P001',
            title: 'Men Slim Fit Casual Shirt',
            brand: 'UrbanLoom',
            category: 'Men',
            price: 899,
            mrp: 1299,
            discount: 31,
            rating: 4.4,
            reviewsCount: 142,
            images: [
                'https://images.unsplash.com/photo-1520975918311-42c1adfbcef3?auto=format&fit=crop&w=1200&q=80',
                'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80'
            ],
            shortDescription: 'Breathable cotton shirt, slim fit for daily wear.',
            description: 'Premium cotton fabric with stitched finishing. Machine washable and durable.',
            colors: ['#1F2937', '#FFFFFF', '#0066FF'],
            sizes: ['S', 'M', 'L', 'XL'],
            inventory: 120,
            popularity: 320,
            createdAt: iso(40),
            specs: { Material: '100% Cotton', Fit: 'Slim', 'Wash': 'Machine wash' },
            reviews: [window.sampleReviews[0], window.sampleReviews[1]]
        },
        {
            id: 'P002',
            title: 'Women Floral Summer Dress',
            brand: 'LuxeWear',
            category: 'Women',
            price: 1499,
            mrp: 2199,
            discount: 31,
            rating: 4.6,
            reviewsCount: 210,
            images: [
                'https://images.unsplash.com/photo-1520975923519-cd6f5a0b1d52?auto=format&fit=crop&w=1200&q=80',
                'https://images.unsplash.com/photo-1520975918313-0b31f05a8a3f?auto=format&fit=crop&w=1200&q=80'
            ],
            shortDescription: 'Lightweight floral dress — perfect for summer outings.',
            description: 'Soft breathable fabric with an elegant floral print. Available in multiple sizes.',
            colors: ['#F59E0B', '#8B5CF6'],
            sizes: ['S', 'M', 'L'],
            inventory: 80,
            popularity: 400,
            createdAt: iso(22),
            specs: { Material: 'Rayon Blend', Length: 'Knee-length' },
            reviews: [window.sampleReviews[0], window.sampleReviews[3]]
        },
        {
            id: 'P003',
            title: 'Wireless Noise-Cancelling Headphones',
            brand: 'SoundWave',
            category: 'Electronics',
            price: 5999,
            mrp: 9999,
            discount: 40,
            rating: 4.5,
            reviewsCount: 980,
            images: [
                'https://images.unsplash.com/photo-1518444024367-1f10e1f9f3a9?auto=format&fit=crop&w=1200&q=80',
                'https://images.unsplash.com/photo-1516116216624-53e697fedbe5?auto=format&fit=crop&w=1200&q=80'
            ],
            shortDescription: 'Premium audio with active noise cancellation and long battery life.',
            description: '40 hours playback, quick charge, comfortable ear cushions, Bluetooth 5.2.',
            colors: ['#000000', '#FFFFFF'],
            sizes: [],
            inventory: 45,
            popularity: 980,
            createdAt: iso(10),
            specs: { Battery: '40 hours', Connectivity: 'Bluetooth 5.2', Weight: '260g' },
            reviews: [window.sampleReviews[0], window.sampleReviews[1], window.sampleReviews[3]]
        },
        {
            id: 'P004',
            title: '4K Smart LED TV — 43 inch',
            brand: 'AuroraTech',
            category: 'Electronics',
            price: 28999,
            mrp: 34999,
            discount: 17,
            rating: 4.2,
            reviewsCount: 430,
            images: [
                'https://images.unsplash.com/photo-1583225150889-95f4d0f3a6a8?auto=format&fit=crop&w=1400&q=80'
            ],
            shortDescription: 'Crisp 4K display with smart features and multiple ports.',
            description: 'HDR10 support, built-in streaming apps, Dolby audio, sleek bezel-less design.',
            colors: ['#000000'],
            sizes: [],
            inventory: 20,
            popularity: 520,
            createdAt: iso(60),
            specs: { Resolution: '4K UHD', HDR: 'HDR10', Ports: 'HDMI x3, USB x2' },
            reviews: [window.sampleReviews[1]]
        },
        {
            id: 'P005',
            title: 'Ceramic Non-stick Cookware Set (5 pcs)',
            brand: 'CasaComfort',
            category: 'Home',
            price: 3499,
            mrp: 4999,
            discount: 30,
            rating: 4.3,
            reviewsCount: 220,
            images: [
                'https://images.unsplash.com/photo-1511688878353-02b0d5a8b1d5?auto=format&fit=crop&w=1200&q=80',
                'https://images.unsplash.com/photo-1506368249639-73a05d6f6488?auto=format&fit=crop&w=1200&q=80'
            ],
            shortDescription: 'Durable ceramic non-stick set for healthy cooking.',
            description: 'PTFE/PFOA free coating, even heat distribution, oven safe handles.',
            colors: ['#F59E0B'],
            sizes: [],
            inventory: 75,
            popularity: 300,
            createdAt: iso(90),
            specs: { Pieces: '5', Material: 'Ceramic non-stick' },
            reviews: [window.sampleReviews[2]]
        },
        {
            id: 'P006',
            title: 'Hydrating Face Serum — 30ml',
            brand: 'GlowVeda',
            category: 'Beauty',
            price: 799,
            mrp: 1299,
            discount: 38,
            rating: 4.7,
            reviewsCount: 540,
            images: [
                'https://images.unsplash.com/photo-1562599939-7f4ec69a5b48?auto=format&fit=crop&w=800&q=80'
            ],
            shortDescription: 'Lightweight serum with hyaluronic acid for glowing skin.',
            description: 'Absorbs quickly, suitable for all skin types, fragrance-free formula.',
            colors: ['#06B6D4'],
            sizes: [],
            inventory: 300,
            popularity: 720,
            createdAt: iso(12),
            specs: { Volume: '30ml', KeyIngredients: 'Hyaluronic Acid' },
            reviews: [window.sampleReviews[0], window.sampleReviews[3]]
        },
        {
            id: 'P007',
            title: 'Kids Soft Cotton T-shirt (Pack of 2)',
            brand: 'KiddoJoy',
            category: 'Kids',
            price: 699,
            mrp: 999,
            discount: 30,
            rating: 4.1,
            reviewsCount: 88,
            images: [
                'https://images.unsplash.com/photo-1544441898-8d3b8e1a7b7f?auto=format&fit=crop&w=800&q=80'
            ],
            shortDescription: 'Comfortable tees for active kids, soft cotton.',
            description: 'Durable stitching, colorfast, perfect for daily play.',
            colors: ['#F59E0B', '#1F2937'],
            sizes: ['S', 'M'],
            inventory: 200,
            popularity: 210,
            createdAt: iso(70),
            specs: { Material: '100% Cotton' },
            reviews: []
        },
        {
            id: 'P008',
            title: 'Running Shoes — Men',
            brand: 'StrideWell',
            category: 'Footwear',
            price: 3199,
            mrp: 3999,
            discount: 20,
            rating: 4.4,
            reviewsCount: 340,
            images: [
                'https://images.unsplash.com/photo-1528701800488-4e0f6d94a7e9?auto=format&fit=crop&w=1200&q=80'
            ],
            shortDescription: 'Lightweight running shoes with cushioned sole.',
            description: 'Breathable mesh upper, responsive midsole and durable outsole.',
            colors: ['#000000', '#1F2937'],
            sizes: ['8', '9', '10', '11'],
            inventory: 60,
            popularity: 610,
            createdAt: iso(18),
            specs: { Upper: 'Mesh', Sole: 'Rubber', Weight: '300g' },
            reviews: [window.sampleReviews[1]]
        },
        {
            id: 'P009',
            title: 'Smart Fitness Band',
            brand: 'PeakPro',
            category: 'Electronics',
            price: 2199,
            mrp: 3499,
            discount: 37,
            rating: 4.0,
            reviewsCount: 420,
            images: [
                'https://images.unsplash.com/photo-1539883372039-2f8b4b9d8f1e?auto=format&fit=crop&w=1000&q=80'
            ],
            shortDescription: 'Track steps, heart-rate, sleep, and notifications.',
            description: 'IP68 water resistance, 7-day battery, compatible with iOS & Android.',
            colors: ['#06B6D4', '#1F2937'],
            sizes: [],
            inventory: 150,
            popularity: 450,
            createdAt: iso(35),
            specs: { Battery: '7 days', Sensors: 'HR, SpO2, Accelerometer' },
            reviews: []
        },
        {
            id: 'P010',
            title: 'Ergonomic Office Chair',
            brand: 'ZenHome',
            category: 'Home',
            price: 8999,
            mrp: 12999,
            discount: 30,
            rating: 4.3,
            reviewsCount: 120,
            images: [
                'https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=1200&q=80'
            ],
            shortDescription: 'Comfortable ergonomic chair with lumbar support.',
            description: 'Mesh back, adjustable height and tilt, ideal for long hours.',
            colors: ['#374151'],
            sizes: [],
            inventory: 30,
            popularity: 260,
            createdAt: iso(200),
            specs: { Material: 'Mesh', Warranty: '2 years' },
            reviews: [window.sampleReviews[2]]
        },
        {
            id: 'P011',
            title: 'Stainless Steel Water Bottle — 1L',
            brand: 'EverGreen',
            category: 'Accessories',
            price: 799,
            mrp: 1199,
            discount: 33,
            rating: 4.5,
            reviewsCount: 310,
            images: [
                'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80'
            ],
            shortDescription: 'Insulated bottle keeps drinks hot/cold for hours.',
            description: 'Double-walled stainless steel, sweat-free exterior.',
            colors: ['#06B6D4', '#1F2937', '#F59E0B'],
            sizes: [],
            inventory: 420,
            popularity: 540,
            createdAt: iso(25),
            specs: { Capacity: '1L', Insulation: '12 hours cold / 6 hours hot' },
            reviews: [window.sampleReviews[0]]
        },
        {
            id: 'P012',
            title: 'Minimalist Leather Wallet',
            brand: 'LuxeWear',
            category: 'Accessories',
            price: 1299,
            mrp: 1999,
            discount: 35,
            rating: 4.2,
            reviewsCount: 95,
            images: [
                'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=900&q=80'
            ],
            shortDescription: 'Slim wallet with multiple card slots and coin pocket.',
            description: 'Genuine leather finish, compact design for everyday carry.',
            colors: ['#1F2937', '#000000'],
            sizes: [],
            inventory: 150,
            popularity: 200,
            createdAt: iso(120),
            specs: { Material: 'Leather', Slots: '6' },
            reviews: []
        },
        {
            id: 'P013',
            title: 'Portable Bluetooth Speaker',
            brand: 'NovaGear',
            category: 'Electronics',
            price: 1999,
            mrp: 2999,
            discount: 33,
            rating: 4.4,
            reviewsCount: 410,
            images: [
                'https://images.unsplash.com/photo-1526170375885-25e4b1c7f0bb?auto=format&fit=crop&w=900&q=80'
            ],
            shortDescription: 'Rich sound, wireless pairing and splash-resistant.',
            description: '10-hour playback, built-in mic, robust bass.',
            colors: ['#000000', '#8B5CF6'],
            sizes: [],
            inventory: 140,
            popularity: 610,
            createdAt: iso(8),
            specs: { Playback: '10 hours', IP: 'IPX5' },
            reviews: [window.sampleReviews[3]]
        },
        {
            id: 'P014',
            title: 'Organic Cotton Bedsheet Set (King)',
            brand: 'CafeCasa',
            category: 'Home',
            price: 3499,
            mrp: 4999,
            discount: 30,
            rating: 4.1,
            reviewsCount: 72,
            images: [
                'https://images.unsplash.com/photo-1582582494700-6e87b4a6f2bb?auto=format&fit=crop&w=1200&q=80'
            ],
            shortDescription: 'Soft breathable sheets with deep pocket fitted sheet.',
            description: 'High thread count, OEKO-TEX certified organic cotton.',
            colors: ['#FFFFFF', '#F59E0B'],
            sizes: [],
            inventory: 60,
            popularity: 150,
            createdAt: iso(300),
            specs: { ThreadCount: '300 TC', Material: 'Organic Cotton' },
            reviews: []
        },
        {
            id: 'P015',
            title: 'Laptop Backpack — Water Resistant',
            brand: 'UrbanLoom',
            category: 'Accessories',
            price: 2499,
            mrp: 3499,
            discount: 28,
            rating: 4.3,
            reviewsCount: 190,
            images: [
                'https://images.unsplash.com/photo-1519741492746-1e2b6d4b5d4f?auto=format&fit=crop&w=1200&q=80'
            ],
            shortDescription: 'Secure laptop compartment and multiple pockets.',
            description: 'Comfortable padded straps, USB charging port included.',
            colors: ['#1F2937', '#06B6D4'],
            sizes: [],
            inventory: 110,
            popularity: 330,
            createdAt: iso(16),
            specs: { LaptopSize: '15.6 inch', Material: 'Polyester' },
            reviews: []
        },
        {
            id: 'P016',
            title: 'Minimal Wall Clock — Modern',
            brand: 'ZenHome',
            category: 'Home',
            price: 999,
            mrp: 1499,
            discount: 33,
            rating: 4.0,
            reviewsCount: 56,
            images: [
                'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=80'
            ],
            shortDescription: 'Silent sweep movement wall clock with modern design.',
            description: 'Battery operated, easy mount, ideal for living rooms and offices.',
            colors: ['#374151', '#FFFFFF'],
            sizes: [],
            inventory: 200,
            popularity: 85,
            createdAt: iso(400),
            specs: { Movement: 'Quartz', Diameter: '30cm' },
            reviews: []
        },
        {
            id: 'P017',
            title: 'Essential Oil Diffuser — 300ml',
            brand: 'GlowVeda',
            category: 'Home',
            price: 1499,
            mrp: 2199,
            discount: 32,
            rating: 4.5,
            reviewsCount: 220,
            images: [
                'https://images.unsplash.com/photo-1559718060-4c9e8d0d1b9a?auto=format&fit=crop&w=1000&q=80'
            ],
            shortDescription: 'Aromatherapy diffuser with ambient LED lights.',
            description: 'Auto shut-off, silent operation, ideal for bedrooms.',
            colors: ['#06B6D4', '#8B5CF6'],
            sizes: [],
            inventory: 180,
            popularity: 260,
            createdAt: iso(55),
            specs: { Capacity: '300ml', RunTime: '8 hours' },
            reviews: []
        },
        {
            id: 'P018',
            title: 'Yoga Mat — Extra Thick 6mm',
            brand: 'PeakPro',
            category: 'Sports',
            price: 1299,
            mrp: 1999,
            discount: 35,
            rating: 4.2,
            reviewsCount: 140,
            images: [
                'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=900&q=80'
            ],
            shortDescription: 'Non-slip, extra cushioning yoga mat for all practices.',
            description: 'Durable TPE material, sweat resistant and easy to clean.',
            colors: ['#06B6D4', '#10B981'],
            sizes: [],
            inventory: 240,
            popularity: 180,
            createdAt: iso(44),
            specs: { Thickness: '6mm', Material: 'TPE' },
            reviews: []
        },
        {
            id: 'P019',
            title: 'Designer Sunglasses — Polarized',
            brand: 'LuxeWear',
            category: 'Accessories',
            price: 2199,
            mrp: 3499,
            discount: 37,
            rating: 4.6,
            reviewsCount: 410,
            images: [
                'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80'
            ],
            shortDescription: 'Stylish polarized lenses with UV protection.',
            description: 'Lightweight frame with scratch-resistant coating.',
            colors: ['#000000'],
            sizes: [],
            inventory: 95,
            popularity: 420,
            createdAt: iso(100),
            specs: { UV: 'UV400', Frame: 'Polycarbonate' },
            reviews: [window.sampleReviews[0]]
        },
        {
            id: 'P020',
            title: 'Kids Educational Tablet — 7 inch',
            brand: 'PlaySmart',
            category: 'Kids',
            price: 4999,
            mrp: 6999,
            discount: 28,
            rating: 4.0,
            reviewsCount: 85,
            images: [
                'https://images.unsplash.com/photo-1585079544961-7e7f118b7c7b?auto=format&fit=crop&w=900&q=80'
            ],
            shortDescription: 'Preloaded with learning apps and parental controls.',
            description: 'Durable kid-proof case and eye-protection mode.',
            colors: ['#F59E0B', '#06B6D4'],
            sizes: [],
            inventory: 60,
            popularity: 140,
            createdAt: iso(20),
            specs: { Screen: '7 inch', Ram: '2GB', Storage: '32GB' },
            reviews: []
        },
        {
            id: 'P021',
            title: 'Premium Chef Knife — 8 inch',
            brand: 'CasaComfort',
            category: 'Home',
            price: 1999,
            mrp: 2999,
            discount: 33,
            rating: 4.5,
            reviewsCount: 300,
            images: [
                'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80'
            ],
            shortDescription: 'High carbon stainless steel blade for professional cuts.',
            description: 'Ergonomic handle, razor-sharp edge, balanced weight.',
            colors: ['#374151'],
            sizes: [],
            inventory: 210,
            popularity: 340,
            createdAt: iso(150),
            specs: { Blade: '8 inch', Material: 'High carbon steel' },
            reviews: [window.sampleReviews[0], window.sampleReviews[2]]
        },
        {
            id: 'P022',
            title: 'Wireless Earbuds — True Stereo',
            brand: 'SoundWave',
            category: 'Electronics',
            price: 2499,
            mrp: 4599,
            discount: 45,
            rating: 4.0,
            reviewsCount: 670,
            images: [
                'https://images.unsplash.com/photo-1559056199-6413898f35d7?auto=format&fit=crop&w=900&q=80'
            ],
            shortDescription: 'Compact earbuds with clear call quality and bass.',
            description: 'Charging case, touch controls, water-resistant.',
            colors: ['#000000', '#FFFFFF'],
            sizes: [],
            inventory: 220,
            popularity: 760,
            createdAt: iso(5),
            specs: { Battery: '24 hours (case)', IP: 'IPX4' },
            reviews: [window.sampleReviews[1]]
        },
        {
            id: 'P023',
            title: 'LED Desk Lamp with Wireless Charger',
            brand: 'ZenHome',
            category: 'Home',
            price: 2499,
            mrp: 3499,
            discount: 28,
            rating: 4.2,
            reviewsCount: 135,
            images: [
                'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80'
            ],
            shortDescription: 'Adjustable brightness with wireless phone charging pad.',
            description: 'Touch controls, memory function, sleek modern design.',
            colors: ['#374151', '#FFFFFF'],
            sizes: [],
            inventory: 145,
            popularity: 160,
            createdAt: iso(66),
            specs: { Power: '10W charger', Brightness: '5 levels' },
            reviews: []
        },
        {
            id: 'P024',
            title: 'Men Classic Leather Belt',
            brand: 'UrbanLoom',
            category: 'Accessories',
            price: 899,
            mrp: 1299,
            discount: 31,
            rating: 4.3,
            reviewsCount: 200,
            images: [
                'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80'
            ],
            shortDescription: 'Durable leather belt with polished buckle.',
            description: 'Perfect for formal and casual wear, genuine leather.',
            colors: ['#000000', '#1F2937'],
            sizes: ['M', 'L', 'XL'],
            inventory: 320,
            popularity: 210,
            createdAt: iso(190),
            specs: { Material: 'Genuine Leather', Width: '1.25 inch' },
            reviews: []
        },
        {
            id: 'P025',
            title: 'Smart Indoor Plant Pot (Self Watering)',
            brand: 'EverGreen',
            category: 'Home',
            price: 999,
            mrp: 1499,
            discount: 33,
            rating: 4.4,
            reviewsCount: 85,
            images: [
                'https://images.unsplash.com/photo-1464965911861-746a04b4bca3?auto=format&fit=crop&w=900&q=80'
            ],
            shortDescription: 'Self-watering pot with modern design.',
            description: 'Perfect for succulents and small indoor plants.',
            colors: ['#10B981'],
            sizes: [],
            inventory: 400,
            popularity: 140,
            createdAt: iso(60),
            specs: { Material: 'Ceramic', Capacity: '1.2L' },
            reviews: []
        },
        {
            id: 'P026',
            title: 'Noise-Isolating Studio Microphone',
            brand: 'NovaGear',
            category: 'Electronics',
            price: 6999,
            mrp: 9999,
            discount: 30,
            rating: 4.5,
            reviewsCount: 250,
            images: [
                'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80'
            ],
            shortDescription: 'USB condenser mic for podcasting and streaming.',
            description: 'Plug-and-play, cardioid pattern, low latency monitoring.',
            colors: ['#000000'],
            sizes: [],
            inventory: 75,
            popularity: 260,
            createdAt: iso(3),
            specs: { Connectivity: 'USB', Pattern: 'Cardioid' },
            reviews: []
        },
        {
            id: 'P027',
            title: 'Classic Table Lamp — Brass Finish',
            brand: 'CafeCasa',
            category: 'Home',
            price: 2199,
            mrp: 2999,
            discount: 26,
            rating: 4.3,
            reviewsCount: 66,
            images: [
                'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80'
            ],
            shortDescription: 'Elegantly designed table lamp with warm glow.',
            description: 'Brass finish with fabric shade, great for bedside.',
            colors: ['#F59E0B'],
            sizes: [],
            inventory: 90,
            popularity: 70,
            createdAt: iso(220),
            specs: { Bulb: 'E27', Material: 'Brass & fabric' },
            reviews: []
        },
        {
            id: 'P028',
            title: 'Wireless Optical Mouse — Ergonomic',
            brand: 'AuroraTech',
            category: 'Electronics',
            price: 799,
            mrp: 1299,
            discount: 38,
            rating: 4.1,
            reviewsCount: 99,
            images: [
                'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=900&q=80'
            ],
            shortDescription: 'Reliable wireless mouse with adjustable DPI.',
            description: 'Plug-and-play receiver, comfortable grip, long battery life.',
            colors: ['#000000', '#374151'],
            sizes: [],
            inventory: 260,
            popularity: 110,
            createdAt: iso(45),
            specs: { DPI: '800/1200/1600', Connectivity: '2.4GHz' },
            reviews: []
        },
        {
            id: 'P029',
            title: 'Women Ankle Strap Sandals',
            brand: 'StrideWell',
            category: 'Footwear',
            price: 1799,
            mrp: 2499,
            discount: 28,
            rating: 4.2,
            reviewsCount: 140,
            images: [
                'https://images.unsplash.com/photo-1542293787938-c9e299b88030?auto=format&fit=crop&w=900&q=80'
            ],
            shortDescription: 'Elegant ankle strap sandals with comfy sole.',
            description: 'Ideal for events, cushioned footbed and secure buckle.',
            colors: ['#F59E0B', '#8B5CF6'],
            sizes: ['36', '37', '38', '39'],
            inventory: 95,
            popularity: 210,
            createdAt: iso(32),
            specs: { Material: 'PU leather', Heel: '2 inch' },
            reviews: []
        },
        {
            id: 'P030',
            title: 'High-Protein Peanut Butter — 1kg',
            brand: 'EverGreen',
            category: 'Home',
            price: 699,
            mrp: 899,
            discount: 22,
            rating: 4.6,
            reviewsCount: 600,
            images: [
                'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80'
            ],
            shortDescription: 'Crunchy peanut butter with no added sugar.',
            description: 'High protein, great for shakes and spreads.',
            colors: [],
            sizes: [],
            inventory: 500,
            popularity: 820,
            createdAt: iso(6),
            specs: { Weight: '1kg', Ingredients: 'Peanuts, Salt' },
            reviews: [window.sampleReviews[0], window.sampleReviews[3]]
        },
        {
            id: 'P031',
            title: 'Classic Denim Jacket — Men',
            brand: 'UrbanLoom',
            category: 'Men',
            price: 2599,
            mrp: 3999,
            discount: 35,
            rating: 4.4,
            reviewsCount: 330,
            images: [
                'https://images.unsplash.com/photo-1503342452485-86f7f6e3f5f3?auto=format&fit=crop&w=900&q=80'
            ],
            shortDescription: 'Timeless denim jacket with sturdy buttons.',
            description: 'Mid-weight denim with interior pockets and durable seams.',
            colors: ['#1F2937'],
            sizes: ['M', 'L', 'XL'],
            inventory: 80,
            popularity: 500,
            createdAt: iso(75),
            specs: { Material: 'Denim', Fit: 'Regular' },
            reviews: []
        },
        {
            id: 'P032',
            title: 'Women Running Shorts',
            brand: 'PeakPro',
            category: 'Women',
            price: 699,
            mrp: 999,
            discount: 30,
            rating: 4.1,
            reviewsCount: 120,
            images: [
                'https://images.unsplash.com/photo-1534322499659-097c3b5c7e2a?auto=format&fit=crop&w=900&q=80'
            ],
            shortDescription: 'Breathable shorts with inner lining and pockets.',
            description: 'Quick-dry fabric, ideal for workouts and runs.',
            colors: ['#06B6D4', '#10B981'],
            sizes: ['S', 'M', 'L'],
            inventory: 140,
            popularity: 230,
            createdAt: iso(28),
            specs: { Material: 'Polyester', Pockets: '2' },
            reviews: []
        },
        {
            id: 'P033',
            title: 'Compact Toaster Oven — 20L',
            brand: 'CasaComfort',
            category: 'Home',
            price: 4599,
            mrp: 5999,
            discount: 23,
            rating: 4.2,
            reviewsCount: 84,
            images: [
                'https://images.unsplash.com/photo-1560185127-6a6d5b7b8e6f?auto=format&fit=crop&w=900&q=80'
            ],
            shortDescription: 'Multi-function toaster oven for baking, toasting and grilling.',
            description: '20L capacity, easy-clean interior and multiple presets.',
            colors: ['#374151'],
            sizes: [],
            inventory: 40,
            popularity: 95,
            createdAt: iso(180),
            specs: { Capacity: '20L', Power: '1200W' },
            reviews: []
        },
        {
            id: 'P034',
            title: 'Silk Satin Pillowcase',
            brand: 'LuxeWear',
            category: 'Home',
            price: 1199,
            mrp: 1799,
            discount: 33,
            rating: 4.4,
            reviewsCount: 190,
            images: [
                'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80'
            ],
            shortDescription: 'Silk pillowcase reduces hair frizz and skin creases.',
            description: 'Hypoallergenic and smooth finish for comfortable sleep.',
            colors: ['#FFFFFF', '#F59E0B'],
            sizes: [],
            inventory: 210,
            popularity: 270,
            createdAt: iso(260),
            specs: { Material: 'Silk Satin', Size: 'Standard' },
            reviews: []
        },
        {
            id: 'P035',
            title: 'Portable Projector — Mini LED',
            brand: 'NovaGear',
            category: 'Electronics',
            price: 12999,
            mrp: 16999,
            discount: 23,
            rating: 4.0,
            reviewsCount: 120,
            images: [
                'https://images.unsplash.com/photo-1527430253228-e93688616381?auto=format&fit=crop&w=900&q=80'
            ],
            shortDescription: 'Compact projector for home theatre and presentations.',
            description: 'Supports 1080p input, built-in speaker, HDMI & USB inputs.',
            colors: ['#000000'],
            sizes: [],
            inventory: 30,
            popularity: 130,
            createdAt: iso(15),
            specs: { Lumens: '1200', Resolution: '1080p' },
            reviews: []
        },
        {
            id: 'P036',
            title: 'Adjustable Dumbbell Set (Pair)',
            brand: 'PeakPro',
            category: 'Sports',
            price: 8999,
            mrp: 12999,
            discount: 30,
            rating: 4.3,
            reviewsCount: 210,
            images: [
                'https://images.unsplash.com/photo-1599058917219-2d2b3a8c6c52?auto=format&fit=crop&w=900&q=80'
            ],
            shortDescription: 'Space-saving adjustable dumbbell set for home workouts.',
            description: 'Quick-adjust mechanism with secure locking, durable build.',
            colors: ['#1F2937'],
            sizes: [],
            inventory: 60,
            popularity: 240,
            createdAt: iso(45),
            specs: { Range: '5-40kg', Material: 'Steel' },
            reviews: []
        },
        {
            id: 'P037',
            title: 'Women Classic Tote Bag',
            brand: 'LuxeWear',
            category: 'Accessories',
            price: 2499,
            mrp: 3499,
            discount: 28,
            rating: 4.5,
            reviewsCount: 180,
            images: [
                'https://images.unsplash.com/photo-1503342452485-86f7f6e3f5f3?auto=format&fit=crop&w=800&q=80'
            ],
            shortDescription: 'Spacious tote with inner pockets and soft handles.',
            description: 'Durable material, perfect for work and casual outings.',
            colors: ['#8B5CF6', '#F59E0B'],
            sizes: [],
            inventory: 120,
            popularity: 310,
            createdAt: iso(90),
            specs: { Material: 'PU leather', Compartments: '3' },
            reviews: []
        },
        {
            id: 'P038',
            title: 'Ceramic Vase — Handcrafted',
            brand: 'CafeCasa',
            category: 'Home',
            price: 1599,
            mrp: 2199,
            discount: 27,
            rating: 4.1,
            reviewsCount: 45,
            images: [
                'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80'
            ],
            shortDescription: 'Artisan ceramic vase to elevate your decor.',
            description: 'Hand-finished glaze with elegant curves — each piece unique.',
            colors: ['#F59E0B'],
            sizes: [],
            inventory: 80,
            popularity: 60,
            createdAt: iso(300),
            specs: { Material: 'Ceramic', Height: '25 cm' },
            reviews: []
        },
        {
            id: 'P039',
            title: 'Grooming Kit — 10 in 1',
            brand: 'UrbanLoom',
            category: 'Beauty',
            price: 1299,
            mrp: 1999,
            discount: 35,
            rating: 4.0,
            reviewsCount: 95,
            images: [
                'https://images.unsplash.com/photo-1568696688498-6f6f6f7b1c44?auto=format&fit=crop&w=900&q=80'
            ],
            shortDescription: 'Complete grooming kit for men with trimmer and accessories.',
            description: 'Rechargeable trimmer, precise blades and multiple heads.',
            colors: ['#1F2937'],
            sizes: [],
            inventory: 170,
            popularity: 140,
            createdAt: iso(110),
            specs: { Items: '10 pieces', Power: 'Rechargeable' },
            reviews: []
        },
        {
            id: 'P040',
            title: 'Bamboo Cutting Board — Large',
            brand: 'CasaComfort',
            category: 'Home',
            price: 799,
            mrp: 999,
            discount: 20,
            rating: 4.2,
            reviewsCount: 55,
            images: [
                'https://images.unsplash.com/photo-1528756514091-dee9f7f7fc2e?auto=format&fit=crop&w=900&q=80'
            ],
            shortDescription: 'Eco-friendly bamboo cutting board with juice groove.',
            description: 'Hard-wearing surface, gentle on knives.',
            colors: [],
            sizes: [],
            inventory: 210,
            popularity: 60,
            createdAt: iso(330),
            specs: { Material: 'Bamboo', Size: '45x30cm' },
            reviews: []
        },
        {
            id: 'P041',
            title: 'Smart LED Strip Lights — 5m',
            brand: 'AuroraTech',
            category: 'Home',
            price: 1499,
            mrp: 2299,
            discount: 34,
            rating: 4.3,
            reviewsCount: 180,
            images: [
                'https://images.unsplash.com/photo-1497493292307-31c376b6e479?auto=format&fit=crop&w=900&q=80'
            ],
            shortDescription: 'Color-changing LED strip with app control and music sync.',
            description: 'Cuttable design, adhesive backing, supports voice assistants.',
            colors: ['#8B5CF6', '#06B6D4'],
            sizes: [],
            inventory: 250,
            popularity: 300,
            createdAt: iso(34),
            specs: { Length: '5m', Power: 'USB' },
            reviews: []
        },
        {
            id: 'P042',
            title: 'Men Formal Oxford Shoes',
            brand: 'StrideWell',
            category: 'Footwear',
            price: 3499,
            mrp: 4999,
            discount: 30,
            rating: 4.4,
            reviewsCount: 210,
            images: [
                'https://images.unsplash.com/photo-1542293787938-c9e299b88030?auto=format&fit=crop&w=900&q=80'
            ],
            shortDescription: 'Classic leather Oxford shoes for formal wear.',
            description: 'Polished finish, cushioned insole for comfort.',
            colors: ['#000000', '#1F2937'],
            sizes: ['8', '9', '10', '11'],
            inventory: 60,
            popularity: 380,
            createdAt: iso(130),
            specs: { Material: 'Leather', Sole: 'Rubber' },
            reviews: [window.sampleReviews[2]]
        },
        {
            id: 'P043',
            title: 'Compact Electric Kettle — 1.7L',
            brand: 'CasaComfort',
            category: 'Home',
            price: 2199,
            mrp: 2999,
            discount: 26,
            rating: 4.1,
            reviewsCount: 98,
            images: [
                'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=900&q=80'
            ],
            shortDescription: 'Fast boiling electric kettle with auto shut-off.',
            description: 'Stainless steel body, cordless base and water level indicator.',
            colors: ['#374151'],
            sizes: [],
            inventory: 180,
            popularity: 130,
            createdAt: iso(210),
            specs: { Capacity: '1.7L', Power: '1500W' },
            reviews: []
        },
        {
            id: 'P044',
            title: 'Wireless Charging Pad — Fast Charge',
            brand: 'AuroraTech',
            category: 'Electronics',
            price: 1299,
            mrp: 1999,
            discount: 35,
            rating: 4.0,
            reviewsCount: 120,
            images: [
                'https://images.unsplash.com/photo-1557180295-76eee20ae8aa?auto=format&fit=crop&w=900&q=80'
            ],
            shortDescription: 'Fast wireless charging pad compatible with Qi devices.',
            description: 'Slim profile, non-slip surface, LED indicator.',
            colors: ['#000000', '#06B6D4'],
            sizes: [],
            inventory: 210,
            popularity: 150,
            createdAt: iso(20),
            specs: { Power: '10W/15W', Compatibility: 'Qi' },
            reviews: []
        },
        {
            id: 'P045',
            title: 'Garden Outdoor String Lights (10m)',
            brand: 'CafeCasa',
            category: 'Home',
            price: 1199,
            mrp: 1699,
            discount: 29,
            rating: 4.3,
            reviewsCount: 48,
            images: [
                'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=80'
            ],
            shortDescription: 'Warm LED string lights ideal for patios and events.',
            description: 'Weatherproof bulbs and sturdy cable, low power consumption.',
            colors: [],
            sizes: [],
            inventory: 400,
            popularity: 95,
            createdAt: iso(180),
            specs: { Length: '10m', Bulbs: '20 LEDs' },
            reviews: []
        },
        {
            id: 'P046',
            title: 'Men Sports Watch — Chronograph',
            brand: 'PeakPro',
            category: 'Accessories',
            price: 4999,
            mrp: 6999,
            discount: 28,
            rating: 4.4,
            reviewsCount: 210,
            images: [
                'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&w=800&q=80'
            ],
            shortDescription: 'Sporty chronograph watch with water resistance.',
            description: 'Stainless steel case, luminous hands and date display.',
            colors: ['#000000'],
            sizes: [],
            inventory: 120,
            popularity: 240,
            createdAt: iso(220),
            specs: { WaterResistance: '50m', Movement: 'Quartz' },
            reviews: []
        },
        {
            id: 'P047',
            title: 'Baby Stroller — Lightweight Foldable',
            brand: 'KiddoJoy',
            category: 'Kids',
            price: 8999,
            mrp: 11999,
            discount: 25,
            rating: 4.2,
            reviewsCount: 56,
            images: [
                'https://images.unsplash.com/photo-1541925266-1a6b8f3f2b21?auto=format&fit=crop&w=900&q=80'
            ],
            shortDescription: 'Compact fold stroller with canopy and storage basket.',
            description: 'One-hand fold, five-point harness and smooth wheels.',
            colors: ['#10B981'],
            sizes: [],
            inventory: 40,
            popularity: 90,
            createdAt: iso(90),
            specs: { WeightLimit: '15kg', Fold: 'One-hand' },
            reviews: []
        },
        {
            id: 'P048',
            title: 'Portable Blender — USB Rechargeable',
            brand: 'NovaGear',
            category: 'Home',
            price: 1799,
            mrp: 2499,
            discount: 28,
            rating: 4.0,
            reviewsCount: 66,
            images: [
                'https://images.unsplash.com/photo-1523978591478-c753949ff840?auto=format&fit=crop&w=900&q=80'
            ],
            shortDescription: 'Blend smoothies on-the-go with convenient USB recharge.',
            description: '6-blade system, easy to clean and carry.',
            colors: ['#06B6D4', '#8B5CF6'],
            sizes: [],
            inventory: 120,
            popularity: 110,
            createdAt: iso(44),
            specs: { Battery: '2000mAh', Capacity: '300ml' },
            reviews: []
        },
        {
            id: 'P049',
            title: 'Classic Polo T-shirt — Men',
            brand: 'UrbanLoom',
            category: 'Men',
            price: 799,
            mrp: 1199,
            discount: 33,
            rating: 4.1,
            reviewsCount: 150,
            images: [
                'https://images.unsplash.com/photo-1562158070-7b55a0c2b1a1?auto=format&fit=crop&w=900&q=80'
            ],
            shortDescription: 'Soft cotton polo with ribbed collar.',
            description: 'Durable fabric with colorfast finish, perfect for casual wear.',
            colors: ['#1F2937', '#0066FF', '#000000'],
            sizes: ['S', 'M', 'L', 'XL'],
            inventory: 320,
            popularity: 230,
            createdAt: iso(50),
            specs: { Material: 'Cotton', Fit: 'Regular' },
            reviews: []
        },
        {
            id: 'P050',
            title: 'Handheld Garment Steamer',
            brand: 'CasaComfort',
            category: 'Home',
            price: 2499,
            mrp: 3499,
            discount: 28,
            rating: 4.2,
            reviewsCount: 90,
            images: [
                'https://images.unsplash.com/photo-1543745178-3be6d2f11aa0?auto=format&fit=crop&w=900&q=80'
            ],
            shortDescription: 'Quick steam for clothes with continuous steam output.',
            description: 'Lightweight, fast heat-up and suitable for delicate fabrics.',
            colors: ['#FFFFFF'],
            sizes: [],
            inventory: 140,
            popularity: 120,
            createdAt: iso(78),
            specs: { Power: '1300W', Tank: '250ml' },
            reviews: []
        },
        {
            id: 'P051',
            title: 'Designer Wall Art — Set of 3',
            brand: 'CafeCasa',
            category: 'Home',
            price: 2999,
            mrp: 3999,
            discount: 25,
            rating: 4.3,
            reviewsCount: 40,
            images: [
                'https://images.unsplash.com/photo-1495567720989-cebdbdd97913?auto=format&fit=crop&w=900&q=80'
            ],
            shortDescription: 'Contemporary framed prints to elevate interiors.',
            description: 'High-quality print on canvas with solid wood frames.',
            colors: [],
            sizes: [],
            inventory: 120,
            popularity: 80,
            createdAt: iso(310),
            specs: { Pieces: '3', Material: 'Canvas' },
            reviews: []
        },
        {
            id: 'P052',
            title: 'Bluetooth Car Adapter FM Transmitter',
            brand: 'AuroraTech',
            category: 'Electronics',
            price: 899,
            mrp: 1299,
            discount: 30,
            rating: 4.0,
            reviewsCount: 65,
            images: [
                'https://images.unsplash.com/photo-1549921296-3a0be3d6f4a2?auto=format&fit=crop&w=900&q=80'
            ],
            shortDescription: 'Stream music via FM transmitter with hands-free calls.',
            description: 'Dual USB ports, stable signal and clear call quality.',
            colors: ['#000000'],
            sizes: [],
            inventory: 260,
            popularity: 70,
            createdAt: iso(12),
            specs: { Ports: '2 USB', Feature: 'Hands-free' },
            reviews: []
        },
        {
            id: 'P053',
            title: 'Sports Water Bottle with Time Marker',
            brand: 'EverGreen',
            category: 'Sports',
            price: 599,
            mrp: 899,
            discount: 33,
            rating: 4.2,
            reviewsCount: 55,
            images: [
                'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=900&q=80'
            ],
            shortDescription: 'Motivational time marker water bottle for hydration tracking.',
            description: 'BPA-free, leak-proof lid and wide mouth for easy cleaning.',
            colors: ['#06B6D4', '#10B981'],
            sizes: [],
            inventory: 400,
            popularity: 130,
            createdAt: iso(14),
            specs: { Capacity: '1L', Material: 'Tritan' },
            reviews: []
        },
        {
            id: 'P054',
            title: 'Men Leather Wallet with RFID Protection',
            brand: 'LuxeWear',
            category: 'Accessories',
            price: 1599,
            mrp: 2299,
            discount: 30,
            rating: 4.3,
            reviewsCount: 130,
            images: [
                'https://images.unsplash.com/photo-1519741492746-1e2b6d4b5d4f?auto=format&fit=crop&w=900&q=80'
            ],
            shortDescription: 'Slim wallet with RFID blocking technology.',
            description: 'Multiple card slots and sleek design for modern essentials.',
            colors: ['#000000', '#1F2937'],
            sizes: [],
            inventory: 220,
            popularity: 210,
            createdAt: iso(180),
            specs: { RFID: 'Yes', Material: 'Leather' },
            reviews: []
        },
        {
            id: 'P055',
            title: 'Travel Packing Cubes Set (4 pcs)',
            brand: 'UrbanLoom',
            category: 'Accessories',
            price: 1299,
            mrp: 1799,
            discount: 28,
            rating: 4.4,
            reviewsCount: 75,
            images: [
                'https://images.unsplash.com/photo-1532634896-26909d0d3f3d?auto=format&fit=crop&w=900&q=80'
            ],
            shortDescription: 'Organize luggage with durable packing cubes.',
            description: 'Lightweight nylon fabric with strong zippers and mesh top.',
            colors: ['#06B6D4', '#1F2937'],
            sizes: [],
            inventory: 360,
            popularity: 140,
            createdAt: iso(65),
            specs: { Pieces: 4, Material: 'Nylon' },
            reviews: []
        },
        {
            id: 'P056',
            title: 'Smart Thermostat — WiFi',
            brand: 'AuroraTech',
            category: 'Home',
            price: 7999,
            mrp: 9999,
            discount: 20,
            rating: 4.1,
            reviewsCount: 40,
            images: [
                'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=80'
            ],
            shortDescription: 'Energy-saving thermostat with remote app control.',
            description: 'Supports schedules, voice control compatibility and energy report.',
            colors: ['#FFFFFF'],
            sizes: [],
            inventory: 50,
            popularity: 65,
            createdAt: iso(300),
            specs: { Connectivity: 'WiFi', Compatibility: 'Google Home, Alexa' },
            reviews: []
        },
        {
            id: 'P057',
            title: 'Women Slip-on Loafers',
            brand: 'StrideWell',
            category: 'Footwear',
            price: 1999,
            mrp: 2799,
            discount: 28,
            rating: 4.2,
            reviewsCount: 115,
            images: [
                'https://images.unsplash.com/photo-1543163521-1bf539c55f48?auto=format&fit=crop&w=900&q=80'
            ],
            shortDescription: 'Comfortable slip-on loafers with cushioned soles.',
            description: 'Easy to wear, lightweight, and breathable material.',
            colors: ['#8B5CF6', '#1F2937'],
            sizes: ['36', '37', '38', '39', '40'],
            inventory: 110,
            popularity: 200,
            createdAt: iso(98),
            specs: { Material: 'PU', Sole: 'EVA' },
            reviews: []
        },
        {
            id: 'P058',
            title: 'Multi-Port USB Charger — 6 A',
            brand: 'NovaGear',
            category: 'Electronics',
            price: 999,
            mrp: 1499,
            discount: 33,
            rating: 4.0,
            reviewsCount: 80,
            images: [
                'https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=900&q=80'
            ],
            shortDescription: 'Charge multiple devices quickly with smart IC.',
            description: 'Over-current protection and compact design for travel.',
            colors: ['#000000'],
            sizes: [],
            inventory: 300,
            popularity: 110,
            createdAt: iso(20),
            specs: { Output: '6A', Ports: 3 },
            reviews: []
        },
        {
            id: 'P059',
            title: 'Women Knit Sweater — Cozy',
            brand: 'LuxeWear',
            category: 'Women',
            price: 2199,
            mrp: 2999,
            discount: 26,
            rating: 4.4,
            reviewsCount: 170,
            images: [
                'https://images.unsplash.com/photo-1511485977113-f63f3b14f4c9?auto=format&fit=crop&w=900&q=80'
            ],
            shortDescription: 'Warm knit sweater with soft texture and relaxed fit.',
            description: 'Ideal for chilly days, easy-care fabric.',
            colors: ['#8B5CF6', '#F59E0B', '#1F2937'],
            sizes: ['S', 'M', 'L'],
            inventory: 140,
            popularity: 290,
            createdAt: iso(72),
            specs: { Material: 'Acrylic blend' },
            reviews: []
        },
        {
            id: 'P060',
            title: 'Noise Reduction Office Headset',
            brand: 'SoundWave',
            category: 'Electronics',
            price: 3499,
            mrp: 4999,
            discount: 30,
            rating: 4.2,
            reviewsCount: 200,
            images: [
                'https://images.unsplash.com/photo-1536305030015-2ae8f3b0f6f2?auto=format&fit=crop&w=900&q=80'
            ],
            shortDescription: 'Comfortable headset with noise reduction mic for calls.',
            description: 'USB & 3.5mm options, soft ear cushions and adjustable headband.',
            colors: ['#000000'],
            sizes: [],
            inventory: 130,
            popularity: 220,
            createdAt: iso(40),
            specs: { Connectivity: 'USB/3.5mm', Feature: 'Noise reduction' },
            reviews: []
        },
        {
            id: 'P061',
            title: 'Kids Building Blocks Set (200 pcs)',
            brand: 'PlaySmart',
            category: 'Kids',
            price: 1499,
            mrp: 2199,
            discount: 32,
            rating: 4.5,
            reviewsCount: 165,
            images: [
                'https://images.unsplash.com/photo-1583336660015-3f0f6fca27b2?auto=format&fit=crop&w=900&q=80'
            ],
            shortDescription: 'Creative building blocks set to boost imagination.',
            description: 'BPA-free, compatible with popular block brands.',
            colors: [],
            sizes: [],
            inventory: 220,
            popularity: 350,
            createdAt: iso(20),
            specs: { Pieces: 200, Material: 'ABS plastic' },
            reviews: []
        },
        {
            id: 'P062',
            title: 'Automatic Pet Feeder — 4L',
            brand: 'EverGreen',
            category: 'Home',
            price: 3499,
            mrp: 4999,
            discount: 30,
            rating: 4.1,
            reviewsCount: 60,
            images: [
                'https://images.unsplash.com/photo-1507149833265-60c372daea22?auto=format&fit=crop&w=900&q=80'
            ],
            shortDescription: 'Scheduled feeder with portion control for pets.',
            description: 'LCD display, portion settings and battery backup.',
            colors: ['#FFFFFF'],
            sizes: [],
            inventory: 65,
            popularity: 90,
            createdAt: iso(88),
            specs: { Capacity: '4L', Power: 'AC/ Battery' },
            reviews: []
        },
        {
            id: 'P063',
            title: 'Designer Ceramic Mug — 350ml',
            brand: 'CafeCasa',
            category: 'Home',
            price: 499,
            mrp: 799,
            discount: 37,
            rating: 4.6,
            reviewsCount: 320,
            images: [
                'https://images.unsplash.com/photo-1517686469429-8bdb6b37a97b?auto=format&fit=crop&w=800&q=80'
            ],
            shortDescription: 'Hand-painted ceramic mug with comfortable handle.',
            description: 'Microwave and dishwasher safe, vibrant glaze finish.',
            colors: [],
            sizes: [],
            inventory: 450,
            popularity: 540,
            createdAt: iso(6),
            specs: { Capacity: '350ml', Material: 'Ceramic' },
            reviews: [window.sampleReviews[0]]
        },
        {
            id: 'P064',
            title: 'Travel Neck Pillow — Memory Foam',
            brand: 'UrbanLoom',
            category: 'Accessories',
            price: 899,
            mrp: 1299,
            discount: 30,
            rating: 4.3,
            reviewsCount: 112,
            images: [
                'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=800&q=80'
            ],
            shortDescription: 'Ergonomic memory foam neck pillow for travel comfort.',
            description: 'Removable cover, washable and compact for travel.',
            colors: ['#1F2937', '#06B6D4'],
            sizes: [],
            inventory: 290,
            popularity: 200,
            createdAt: iso(140),
            specs: { Material: 'Memory foam', Cover: 'Removable' },
            reviews: []
        }
    ];

    // Ensure we meet >= 60 products (we have 64 above)
    // Expose quick lookup helpers for convenience
    window.dataHelpers = {
        getProductById: function (id) {
            return (window.products || []).find(p => p.id === id) || null;
        },
        listCategories: function () { return window.categories.slice(); },
        listBrands: function () { return window.brands.slice(); }
    };

    // Photographer / Unsplash attributions (map image -> photographer)
    // NOTE: These are the main photographers for the Unsplash images used above.
    // Place these credits in your footer or README when publishing.
    window.unsplashAttributions = {
        // (keys are short descriptive tags; not exact URLs)
        'photo-1520975918311-42c1adfbcef3': 'Photo by Unsplash User',
        // many images from Unsplash; list below are the common photographers used:
        'Photo credits (sample list)': [
            'Photo by Alessio Lin on Unsplash',
            'Photo by Simon Matzinger on Unsplash',
            'Photo by Brooke Cagle on Unsplash',
            'Photo by Brooke Lark on Unsplash',
            'Photo by Annie Spratt on Unsplash',
            'Photo by Sincerely Media on Unsplash',
            'Photo by Toa Heftiba on Unsplash',
            'Photo by Jakob Owens on Unsplash',
            'Photo by Luke Chesser on Unsplash',
            'Photo by Maarten van den Heuvel on Unsplash',
            'Photo by Tyler Nix on Unsplash'
        ]
    };

    // Developer note:
    // - For production replace `window.products` with API responses.
    // - Update image URLs to your CDN or local assets; maintain photographer attributions.
    // - Keep data normalized for easier backend integration.

})();
