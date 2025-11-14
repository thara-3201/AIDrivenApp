# Figma Design Customization Guide

This guide helps you adapt the React components to match your specific Figma design.

## 🎨 Understanding the Component Structure

The application is built with a modular component structure that's easy to customize:

```
Components
├── Common (Reusable UI elements)
│   ├── Button
│   ├── Card
│   ├── Input
│   ├── Loading
│   └── ErrorMessage
├── Dashboard (Feature: Dashboard view)
│   ├── Dashboard (Container)
│   ├── MetricsCard
│   └── ActivityList
└── ProductList (Feature: Product listing)
    ├── ProductList (Container)
    └── ProductCard
```

## 🔧 Customization Steps

### Step 1: Extract Design Tokens from Figma

Before coding, extract these values from your Figma design:

**Colors:**
- Primary color
- Secondary color
- Success/Error/Warning colors
- Background colors
- Text colors (heading, body, muted)
- Border colors

**Typography:**
- Font families
- Font sizes (h1-h6, body, small)
- Font weights
- Line heights

**Spacing:**
- Padding values
- Margin values
- Gap values

**Border Radius:**
- Button radius
- Card radius
- Input radius

**Shadows:**
- Card shadows
- Button shadows
- Focus shadows

### Step 2: Create a Design System File

Create `src/styles/design-tokens.css`:

```css
:root {
  /* Colors */
  --color-primary: #2563eb;
  --color-secondary: #6b7280;
  --color-success: #059669;
  --color-error: #dc2626;
  --color-warning: #f59e0b;
  
  /* Backgrounds */
  --color-bg-primary: #ffffff;
  --color-bg-secondary: #f9fafb;
  --color-bg-tertiary: #f3f4f6;
  
  /* Text */
  --color-text-primary: #111827;
  --color-text-secondary: #6b7280;
  --color-text-muted: #9ca3af;
  
  /* Borders */
  --color-border: #e5e7eb;
  --color-border-focus: #2563eb;
  
  /* Typography */
  --font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 2rem;
  
  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  --spacing-2xl: 3rem;
  
  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-full: 9999px;
  
  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
}
```

Import this in `src/index.css`:
```css
@import './styles/design-tokens.css';
```

### Step 3: Update Component Styles

Replace hardcoded values with CSS variables:

**Before:**
```css
.btn-primary {
  background-color: #2563eb;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
}
```

**After:**
```css
.btn-primary {
  background-color: var(--color-primary);
  border-radius: var(--radius-md);
  padding: var(--spacing-md) var(--spacing-lg);
}
```

### Step 4: Adapt Layout from Figma

#### Grid Layouts

Match your Figma's grid system:

```css
/* If Figma shows 3 columns on desktop */
.dashboard-metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-lg);
}

/* If Figma shows 4 columns on wide screens */
@media (min-width: 1280px) {
  .dashboard-metrics {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

#### Component Sizing

Match exact dimensions from Figma:

```css
/* If Figma specifies card height */
.metrics-card {
  min-height: 140px; /* From Figma */
}

/* If Figma specifies specific widths */
.sidebar {
  width: 280px; /* From Figma */
}
```

### Step 5: Typography Customization

Update text styles to match Figma:

```css
/* Heading styles from Figma */
.dashboard-title {
  font-size: var(--font-size-3xl);
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em; /* If specified in Figma */
}

.card-header {
  font-size: var(--font-size-xl);
  font-weight: 600;
  line-height: 1.4;
}
```

### Step 6: Color Scheme

Update colors throughout the app:

1. **Primary Actions (Buttons, Links)**
   ```css
   .btn-primary {
     background-color: var(--color-primary);
   }
   ```

2. **Status Colors**
   ```css
   .status-success {
     color: var(--color-success);
   }
   .status-error {
     color: var(--color-error);
   }
   ```

3. **Background Layers**
   ```css
   .app {
     background-color: var(--color-bg-secondary);
   }
   .card {
     background-color: var(--color-bg-primary);
   }
   ```

## 📋 Component-Specific Customization

### Button Component

Match Figma button styles:

```css
/* src/components/common/Button.css */

/* Update sizes based on Figma specs */
.btn-small {
  padding: 8px 16px;    /* Match Figma height/padding */
  font-size: 14px;       /* Match Figma text size */
  min-height: 32px;      /* Match Figma component height */
}

.btn-medium {
  padding: 12px 24px;
  font-size: 16px;
  min-height: 44px;
}

/* Update border radius */
.btn {
  border-radius: 6px;    /* Match Figma */
}

/* Update hover states */
.btn-primary:hover:not(:disabled) {
  background-color: #1d4ed8; /* Darker shade from Figma */
  transform: translateY(-1px); /* If Figma shows elevation */
}
```

### Card Component

Match Figma card styles:

```css
/* src/components/common/Card.css */

.card {
  background: white;
  border-radius: 16px;              /* Match Figma */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08); /* Match Figma shadow */
  border: 1px solid #f0f0f0;       /* If Figma shows border */
}

/* Update internal spacing */
.card-body {
  padding: 24px;                    /* Match Figma internal padding */
}
```

### Input Component

Match Figma form styles:

```css
/* src/components/common/Input.css */

.input {
  height: 48px;                     /* Match Figma height */
  padding: 0 16px;                  /* Match Figma horizontal padding */
  border-radius: 8px;               /* Match Figma */
  border: 1.5px solid #e0e0e0;     /* Match Figma border */
  font-size: 16px;                  /* Match Figma text size */
}

/* Update focus state to match Figma */
.input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
}
```

## 🎯 Matching Specific Figma Patterns

### Pattern 1: Metrics/Stats Cards

If your Figma shows metrics cards with icons and values:

```typescript
// Update MetricsCard.tsx to match Figma layout
<div className="metrics-card">
  <div className="metrics-icon">{icon}</div>
  <div className="metrics-content">
    <div className="metrics-value">{value}</div>
    <div className="metrics-label">{label}</div>
  </div>
</div>
```

```css
/* Update MetricsCard.css to match Figma spacing */
.metrics-card {
  display: flex;
  align-items: center;
  gap: 16px; /* From Figma */
}

.metrics-icon {
  width: 48px;     /* From Figma */
  height: 48px;    /* From Figma */
  border-radius: 12px; /* From Figma */
  background: #f0f9ff; /* From Figma */
}
```

### Pattern 2: Navigation/Tabs

If Figma shows a specific tab style:

```css
.app-nav-link {
  position: relative;
  padding: 12px 24px; /* From Figma */
}

/* If Figma shows underline indicator */
.app-nav-link.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--color-primary);
  border-radius: 3px 3px 0 0;
}
```

### Pattern 3: Product Cards

If Figma shows product cards with specific layout:

```css
.product-card {
  /* Match Figma card aspect ratio */
  aspect-ratio: 3/4;
}

.product-card-image {
  /* Match Figma image height ratio */
  height: 60%; /* Adjust based on Figma */
}

.product-card-content {
  /* Match Figma content padding */
  padding: 20px; /* From Figma */
}
```

## 🔄 Responsive Breakpoints

Match Figma's responsive breakpoints:

```css
/* Mobile: 320px - 767px */
@media (max-width: 767px) {
  .dashboard-metrics {
    grid-template-columns: 1fr;
  }
}

/* Tablet: 768px - 1023px */
@media (min-width: 768px) and (max-width: 1023px) {
  .dashboard-metrics {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop: 1024px+ */
@media (min-width: 1024px) {
  .dashboard-metrics {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

## 🎨 Adding Custom Fonts

If your Figma uses custom fonts:

1. **Add font files to `public/fonts/`**

2. **Import in `src/index.css`:**
   ```css
   @font-face {
     font-family: 'YourFont';
     src: url('/fonts/YourFont-Regular.woff2') format('woff2');
     font-weight: 400;
     font-style: normal;
   }

   @font-face {
     font-family: 'YourFont';
     src: url('/fonts/YourFont-Bold.woff2') format('woff2');
     font-weight: 700;
     font-style: normal;
   }

   body {
     font-family: 'YourFont', -apple-system, sans-serif;
   }
   ```

## 📱 Icons

If your Figma uses specific icons:

### Option 1: React Icons
```bash
npm install react-icons
```

```typescript
import { FiUser, FiShoppingCart } from 'react-icons/fi';

<FiUser size={24} color="#2563eb" />
```

### Option 2: Custom SVG Icons
Export from Figma and use as React components:

```typescript
// src/components/icons/UserIcon.tsx
export const UserIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="..." stroke={color} strokeWidth="2" />
  </svg>
);
```

## ✅ Checklist for Figma Adaptation

- [ ] Extract and implement color palette
- [ ] Match typography (fonts, sizes, weights)
- [ ] Update spacing (padding, margins, gaps)
- [ ] Match border radius values
- [ ] Implement shadows correctly
- [ ] Match component dimensions
- [ ] Implement hover/active states
- [ ] Match animation/transition speeds
- [ ] Responsive breakpoints aligned
- [ ] Icons match design
- [ ] Images have correct aspect ratios
- [ ] Forms match input styles
- [ ] Buttons match all variants
- [ ] Cards match layout and spacing
- [ ] Navigation matches design

## 🔍 Testing Your Customization

1. **Side-by-side comparison**: Open Figma and your app side by side
2. **Use browser DevTools**: Inspect elements and compare with Figma specs
3. **Pixel Perfect plugin**: Use browser extensions to overlay Figma designs
4. **Check all breakpoints**: Test mobile, tablet, and desktop views
5. **Verify all states**: Hover, active, disabled, loading, error states

## 💡 Pro Tips

1. **Use Figma's Inspect Panel**: Get exact CSS values (padding, margins, colors)
2. **Export assets at 2x**: For retina displays
3. **Organize components**: Keep Figma component names matching code components
4. **Document variants**: If Figma shows multiple button styles, implement all
5. **Check dark mode**: If Figma has dark mode, implement CSS variables for it

---

Remember: The goal is to match the visual design while maintaining clean, maintainable code!
