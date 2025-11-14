# AIDrivenApp

A modern React application built with TypeScript, designed with a component structure that supports seamless REST API integration.

> **⚡ Quick Start**: New to the project? Check out [QUICK_START.md](QUICK_START.md) to get running in 5 minutes!

## 📖 Documentation

- **[QUICK_START.md](QUICK_START.md)** - Get up and running quickly
- **[API_INTEGRATION_GUIDE.md](API_INTEGRATION_GUIDE.md)** - Complete API integration instructions
- **[FIGMA_CUSTOMIZATION_GUIDE.md](FIGMA_CUSTOMIZATION_GUIDE.md)** - Adapt components to your Figma design
- **[README.md](README.md)** - This file (comprehensive overview)

## 🚀 Features

- **TypeScript Support**: Full type safety throughout the application
- **REST API Integration**: Built-in API service layer with axios
- **Custom Hooks**: `useApi` and `useFetch` hooks for efficient data fetching
- **Reusable Components**: Modern, styled components ready for use
- **Error Handling**: Comprehensive error handling and loading states
- **Responsive Design**: Mobile-first responsive layout
- **Modular Architecture**: Clean separation of concerns

## 📁 Project Structure

```
/workspace
├── public/                 # Static files
├── src/
│   ├── components/        # React components
│   │   ├── common/       # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Loading.tsx
│   │   │   └── ErrorMessage.tsx
│   │   ├── Dashboard/    # Dashboard feature components
│   │   │   ├── Dashboard.tsx
│   │   │   ├── MetricsCard.tsx
│   │   │   └── ActivityList.tsx
│   │   └── ProductList/  # Product list feature components
│   │       ├── ProductList.tsx
│   │       └── ProductCard.tsx
│   ├── hooks/            # Custom React hooks
│   │   ├── useApi.ts     # Hook for API calls with manual execution
│   │   └── useFetch.ts   # Hook for automatic data fetching
│   ├── services/         # API service layer
│   │   ├── api.service.ts    # Base API service with interceptors
│   │   └── data.service.ts   # Data-specific API endpoints
│   ├── types/            # TypeScript type definitions
│   │   └── api.types.ts  # API-related types
│   ├── App.tsx           # Main application component
│   ├── App.css           # Application styles
│   ├── index.tsx         # Application entry point
│   └── index.css         # Global styles
├── .env.example          # Environment variables example
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── README.md            # This file
```

## 🛠️ Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` with your API configuration:
   ```
   REACT_APP_API_BASE_URL=https://your-api.com
   REACT_APP_API_TIMEOUT=10000
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔌 API Integration

### API Service Layer

The application uses a centralized API service (`src/services/api.service.ts`) that provides:

- Automatic token injection from localStorage
- Request/response interceptors
- Centralized error handling
- Type-safe HTTP methods (GET, POST, PUT, PATCH, DELETE)

### Using the API Service

**Example 1: Using `useFetch` for automatic data loading:**

```typescript
import { useFetch } from '../hooks/useFetch';
import { dataService } from '../services/data.service';

function MyComponent() {
  const { data, loading, error, refetch } = useFetch(
    () => dataService.getProducts({ page: 1, limit: 10 }),
    [] // dependencies
  );

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error.message} />;
  
  return <div>{/* render data */}</div>;
}
```

**Example 2: Using `useApi` for manual execution:**

```typescript
import { useApi } from '../hooks/useApi';
import { dataService } from '../services/data.service';

function CreateProductForm() {
  const { execute, loading, error } = useApi(
    (productData) => dataService.createProduct(productData)
  );

  const handleSubmit = async (formData) => {
    try {
      const result = await execute(formData);
      console.log('Product created:', result);
    } catch (err) {
      console.error('Failed to create product:', err);
    }
  };

  return <form onSubmit={handleSubmit}>{/* form fields */}</form>;
}
```

### Adding New API Endpoints

1. **Define types in `src/types/api.types.ts`:**
   ```typescript
   export interface MyData {
     id: number;
     name: string;
   }
   ```

2. **Add endpoint in `src/services/data.service.ts`:**
   ```typescript
   export const dataService = {
     getMyData: () => {
       return apiService.get<MyData[]>('/my-data');
     },
   };
   ```

3. **Use in component:**
   ```typescript
   const { data, loading, error } = useFetch(
     () => dataService.getMyData(),
     []
   );
   ```

## 🎨 Components

### Common Components

- **Button**: Versatile button with multiple variants and sizes
- **Card**: Container component with header, body, and footer sections
- **Input**: Form input with label, validation, and error handling
- **Loading**: Loading spinner with optional full-screen mode
- **ErrorMessage**: Error display with retry functionality

### Feature Components

- **Dashboard**: Main dashboard with metrics and activity feed
- **ProductList**: Paginated product list with CRUD operations
- **MetricsCard**: Display key metrics with trends
- **ActivityList**: Show recent activities

## 🔧 Customization

### Adapting to Your Figma Design

1. **Update Color Scheme**: Modify CSS files in each component directory
2. **Adjust Layout**: Modify grid layouts in Dashboard and ProductList components
3. **Add New Components**: Follow the existing structure in `src/components/`
4. **Update API Types**: Modify `src/types/api.types.ts` to match your backend
5. **Configure API Endpoints**: Update `src/services/data.service.ts` with your endpoints

### Styling

The application uses vanilla CSS with CSS modules. Each component has its own CSS file:

- Global styles: `src/index.css`
- App-level styles: `src/App.css`
- Component styles: `src/components/[ComponentName]/[ComponentName].css`

## 📦 Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App (one-way operation)

## 🔐 Authentication

The API service automatically includes authentication tokens from localStorage:

```typescript
// Store token after login
localStorage.setItem('authToken', 'your-token-here');

// Token is automatically included in all requests
// Remove token on logout
localStorage.removeItem('authToken');
```

## 🚢 Production Build

```bash
npm run build
```

This creates an optimized production build in the `build/` directory.

## 📝 Type Safety

The application is fully typed with TypeScript:

- API responses are typed
- Component props are typed
- Hook return values are typed
- Service methods are typed

## 🤝 Contributing

1. Create a new branch for your feature
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

This project is created for demonstration purposes.

## 🆘 Support

For questions or issues:
1. Check the inline code comments
2. Review the TypeScript types for API structure
3. Refer to component examples in `src/components/`

---

**Note**: This application structure is designed to be easily adapted to your specific Figma design. Simply update the components, styles, and API endpoints to match your requirements.
