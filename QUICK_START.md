# Quick Start Guide

Get your React app running in 5 minutes!

## 🚀 Installation

### 1. Install Dependencies

```bash
npm install
```

This installs all required packages including:
- React & React DOM
- TypeScript
- Axios for API calls
- Testing libraries

### 2. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` with your API settings:

```env
REACT_APP_API_BASE_URL=https://your-api.com
REACT_APP_API_TIMEOUT=10000
```

### 3. Start Development Server

```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure Overview

```
/workspace
├── public/                     # Static files
│   ├── index.html             # HTML template
│   ├── manifest.json          # PWA manifest
│   └── robots.txt
│
├── src/
│   ├── components/            # React components
│   │   ├── common/           # Reusable UI components
│   │   ├── Dashboard/        # Dashboard feature
│   │   └── ProductList/      # Product list feature
│   │
│   ├── hooks/                # Custom React hooks
│   │   ├── useApi.ts         # Manual API execution
│   │   └── useFetch.ts       # Auto data fetching
│   │
│   ├── services/             # API layer
│   │   ├── api.service.ts    # Base API service
│   │   └── data.service.ts   # API endpoints
│   │
│   ├── types/                # TypeScript types
│   │   └── api.types.ts      # API type definitions
│   │
│   ├── App.tsx               # Main app component
│   ├── App.css               # App styles
│   ├── index.tsx             # Entry point
│   └── index.css             # Global styles
│
├── .env.example              # Environment template
├── package.json              # Dependencies
├── tsconfig.json             # TypeScript config
│
└── Documentation/
    ├── README.md                     # Main documentation
    ├── API_INTEGRATION_GUIDE.md      # API integration help
    ├── FIGMA_CUSTOMIZATION_GUIDE.md  # Design customization
    └── QUICK_START.md                # This file
```

## 🎯 What's Included

### Pre-built Components

✅ **Common Components** (in `src/components/common/`)
- `Button` - Multiple variants, sizes, loading states
- `Card` - Container with header, body, footer
- `Input` - Form input with validation
- `Loading` - Loading spinner (inline or fullscreen)
- `ErrorMessage` - Error display with retry

✅ **Feature Components**
- `Dashboard` - Complete dashboard with metrics and activity
- `ProductList` - Product listing with pagination and CRUD
- `MetricsCard` - Display key metrics with trends
- `ProductCard` - Product display card

### API Integration

✅ **Services** (in `src/services/`)
- Centralized API client with interceptors
- Authentication token management
- Error handling
- Type-safe endpoints

✅ **Custom Hooks** (in `src/hooks/`)
- `useFetch` - Auto-fetch data on mount
- `useApi` - Manual API execution

### TypeScript Support

✅ Full type safety throughout
✅ API response types
✅ Component prop types
✅ Custom hook types

## 🔧 First Steps After Installation

### 1. Test the App

The app should run with mock API structure. You'll see:
- Dashboard view with placeholder metrics
- Product list view
- Navigation between views

### 2. Connect Your API

Edit `src/services/data.service.ts`:

```typescript
export const dataService = {
  getUsers: () => {
    return apiService.get<User[]>('/your-endpoint');
  },
};
```

### 3. Update Types

Edit `src/types/api.types.ts` to match your data:

```typescript
export interface YourData {
  id: number;
  name: string;
  // Your fields here
}
```

### 4. Customize Styles

Update component CSS files to match your design:
- Colors
- Spacing
- Border radius
- Shadows
- Typography

## 📝 Common Tasks

### Add a New Page/View

1. Create component: `src/components/MyView/MyView.tsx`
2. Add to navigation in `src/App.tsx`
3. Import and render based on route/state

### Add a New API Endpoint

1. Add type in `src/types/api.types.ts`
2. Add endpoint in `src/services/data.service.ts`
3. Use in component with `useFetch` or `useApi`

### Create a New Component

1. Create file: `src/components/MyComponent/MyComponent.tsx`
2. Create styles: `src/components/MyComponent/MyComponent.css`
3. Export and use in parent component

### Add Authentication

The API service already handles tokens:

```typescript
// After login
localStorage.setItem('authToken', 'your-token');

// Token automatically included in requests
// Authorization: Bearer your-token

// On logout
localStorage.removeItem('authToken');
```

## 🧪 Testing

```bash
# Run tests
npm test

# Build for production
npm run build

# The build outputs to /build directory
```

## 🎨 Customization Priorities

### Priority 1: Branding
1. Update colors in CSS files
2. Change app name in `public/index.html`
3. Update logo in `src/App.tsx`

### Priority 2: API Connection
1. Set API URL in `.env`
2. Update types in `src/types/api.types.ts`
3. Update endpoints in `src/services/data.service.ts`

### Priority 3: Layout
1. Modify grid layouts in component CSS
2. Update spacing and sizing
3. Adjust responsive breakpoints

### Priority 4: Features
1. Add/remove pages in `src/App.tsx`
2. Create new feature components
3. Wire up with API endpoints

## 📚 Learning Resources

### Key Files to Understand

Start with these files to understand the app:

1. **`src/App.tsx`** - Main app structure and navigation
2. **`src/services/api.service.ts`** - How API calls work
3. **`src/hooks/useFetch.ts`** - How data fetching works
4. **`src/components/Dashboard/Dashboard.tsx`** - Example of a complete feature

### Documentation

- **README.md** - Complete project documentation
- **API_INTEGRATION_GUIDE.md** - Detailed API integration instructions
- **FIGMA_CUSTOMIZATION_GUIDE.md** - How to match your Figma design

## 🐛 Troubleshooting

### App won't start?
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm start
```

### API calls failing?
1. Check `.env` has correct API URL
2. Check CORS settings on backend
3. Open browser DevTools Network tab
4. Verify API endpoint URLs

### TypeScript errors?
1. Ensure types match your API responses
2. Add `?` for optional fields
3. Run `npm run build` to see all errors

### Styles not applying?
1. Check CSS file is imported in component
2. Verify class names match between TSX and CSS
3. Check browser DevTools Elements tab

## ✅ Checklist

Before customizing:
- [ ] App runs successfully (`npm start`)
- [ ] Can navigate between Dashboard and Products
- [ ] Understand project structure
- [ ] Know where to add API endpoints
- [ ] Know where to customize styles

Ready to customize:
- [ ] Set environment variables
- [ ] Update API types
- [ ] Connect real API endpoints
- [ ] Customize component styles
- [ ] Test on mobile/tablet/desktop

## 🚢 Deployment

### Build for production:
```bash
npm run build
```

### Deploy to:
- **Vercel**: `vercel --prod`
- **Netlify**: Drag `build/` folder to Netlify
- **GitHub Pages**: Use `gh-pages` package
- **Your server**: Copy `build/` folder contents

## 🆘 Need Help?

1. Check the documentation files in the project root
2. Review existing components for patterns
3. Check browser console for errors
4. Verify API responses in Network tab

---

**You're all set!** Start by exploring the Dashboard and Product List to see the app in action, then begin customizing for your needs.
