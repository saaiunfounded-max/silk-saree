# THARI / தறி — The Art of Indian Silk

> **THE LOOM &rarr; THE WEAVER &rarr; THE SAREE &rarr; THE PATRON**  
> *Woven by tradition. Curated for the extraordinary.*

THARI is a modern luxury multi-vendor marketplace connecting India's finest silk weavers directly with discerning patrons worldwide. Designed with quiet luxury aesthetics inspired by international editorial fashion houses, paired with revered Indian textile craftsmanship.

---

## 🏛️ Brand & Visual Identity
- **Name**: **THARI** (representing the traditional wooden loom and weaving craft)
- **Palette**:
  - Ivory (`#F8F5EF`) & White (`#FFFFFF`) — 60%
  - Black (`#111111`) & Charcoal (`#292929`) — 25%
  - Royal Lavender (`#B9A7D4`) — 10% (accent)
  - Muted Gold (`#B89B5E`) — 5% (zari & craftsmanship details)
- **Typography**:
  - Display / Editorial Serif: **Cormorant Garamond**
  - Modern Clean Sans: **Inter**

---

## 💎 Features Built

### 1. Customer Experience
- **Editorial Homepage (`/`)**: Cinematic hero, fresh off the loom arrivals, Shop by Silk collections, The Weavers chronicle, Craftsmanship split-screen, The Festive Edit campaign, and newsletter salon.
- **Shop Catalog (`/shop`)**: Multi-dimensional filtering by Silk Type (*Kanchipuram, Banarasi, Mysore Silk, Tussar, Chanderi, Raw Silk*), Price ranges, Weaving regions, Weavers, and Stock. Sorting by Featured, Newest, and Price. Mobile filter drawer.
- **Search System**: Global search overlay supporting real-time keyword matching across saree names, silk types, regions, colors, and weavers.
- **Product Detail (`/product/[slug]`)**: High-res multi-angle photography gallery, technical specifications, Silk Mark trust badges, accordions (*The Weaver & Loom Lineage, Craft Details, Care Guide, White Glove Shipping*), and related weaves.
- **Weaver Chronicles (`/weavers/[slug]`)**: Dedicated public profiles for master weaving cooperatives documenting their town, years of experience, loom technique, and direct catalog.
- **Shopping Bag (`/cart`)**: Real-time quantity controls, complimentary white-glove shipping computation, item removals, and direct checkout access.
- **Checkout (`/checkout`)**: Demo checkout with multi-payment preferences (*UPI, Credit/Debit Card, Net Banking, Cash on Delivery*), auto-generating multi-vendor order items.
- **Patron Account (`/account`, `/account/orders`, `/account/wishlist`, `/account/profile`)**: Order history tracking, persistent wishlist with direct Move-to-Bag, and delivery destination management.

### 2. Weaver / Seller Portal
- **Weaver Landing Page (`/seller`)**: Value proposition and onboarding for weaving guilds.
- **Seller Dashboard (`/seller/dashboard`)**: GMV metrics, order volumes, monthly earnings bar chart trajectory, and loom inventory alerts.
- **Product Catalog (`/seller/products`)**: Table view with SKUs, prices, stocks, and status indicators (*Pending Review, Published, Out of Stock, Rejected*).
- **Add Product Form (`/seller/products/new`)**: Submission portal capturing pure silk classification, zari content, length, blouse inclusion, and high-res photography.
- **Fulfillment & Orders (`/seller/orders`)**: Dedicated queue displaying orders allocated specifically to that weaver's loom with net disbursement calculations.
- **Weaver Profile & Settings (`/seller/profile`, `/seller/settings`)**: Atelier story management and NEFT/RTGS bank disbursement details.

### 3. Admin Marketplace Operations Console
- **Marketplace Dashboard (`/admin`)**: Marketplace GMV, order volume, active seller guilds, approved catalog count, pending approvals queue, and seller performance.
- **Moderation Center (`/admin/approvals`)**: One-click **Approve & Publish** or **Reject** actions directly governing public catalog visibility.
- **Products Ledger (`/admin/products`)**: Centralized inventory tracking across all weavers.
- **Sellers Directory (`/admin/sellers`)**: Management of enrolled artisan cooperatives.
- **Order Dispatches (`/admin/orders`)**: Multi-vendor order items breakdown by allocated guild.
- **Platform Configuration (`/admin/settings`)**: Marketplace commission rate (10%) and payout schedules.

---

## 🗄️ Relational Database & Architecture

The database architecture is designed from first principles as a **multi-vendor marketplace**. Every product and every order item is explicitly tied to an artisan guild:

- `products.seller_id`
- `order_items.seller_id`

Complete SQL DDL and Row Level Security (RLS) policies are provided in:
```
supabase/schema.sql
```

Tables included:
`profiles`, `sellers`, `categories`, `collections`, `products`, `product_images`, `inventory`, `orders`, `order_items`, `cart_items`, `wishlist_items`, `addresses`, `reviews`, `seller_payouts`, `product_approvals`.

---

## 🚀 Quick Start & Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
```bash
npm run build
npm run start
```

---

## 🔑 Demo Access Accounts

THARI includes an interactive **Demo Switcher** in the global navigation bar and `/login` page:

| Role | Email | Experience |
|---|---|---|
| **Patron / Customer** | `demo@thari.local` | Browse, heart to wishlist, add to bag, checkout, view orders |
| **Master Weaver** | `seller@thari.local` | Access Sundaram Silk Guild portal, add sarees, manage loom inventory |
| **Marketplace Admin** | `admin@thari.local` | Review pending weaves, approve/reject, inspect GMV and seller payouts |

---

## ☁️ Vercel Deployment

THARI is ready for instantaneous zero-configuration deployment to **Vercel**:
1. Push repository to GitHub or GitLab.
2. Import project into Vercel.
3. Framework Preset: **Next.js**.
4. Optional Environment Variables (can run in Demo Mode if left blank):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Click **Deploy**.
