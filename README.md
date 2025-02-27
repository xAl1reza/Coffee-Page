# E-Commerce Store (Tailwind CSS v3)

Modern responsive e-commerce interface with dark/light theme and cart management.

## Key Features
- 🌓 **Theme System**: Built-in dark/light mode toggle
- 🛒 **Cart Functionality**: Add/remove items, quantity adjustment, real-time price calculation
- 📦 **Product API**: Internal API serving products from local JSON file
- 📱 **Responsive Design**: Optimized for all screen sizes

## Installation
```bash
git clone <repo-name>
cd project-folder
npm install
```

## Data Management
- Product data stored in: `public/js/db.json`
- To add new products:
  1. Edit `public/js/db.json` 
  2. Add new product objects following existing format
  3. Products will auto-load in the application

## API Endpoint
```js
// Fetch all products
fetch('js/db.json')
  .then(res => res.json())
  .then(data => /* handle data */)
```

## Build
```bash
npm run build
# Deploy /dist folder
```

---

🛠️ Custom JSON API | 🎨 Tailwind CSS 3 | 🔄 Real-time Updates