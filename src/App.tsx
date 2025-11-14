import React, { useState } from 'react';
import { Dashboard } from './components/Dashboard/Dashboard';
import { ProductList } from './components/ProductList/ProductList';
import { Button } from './components/common';
import './App.css';

type View = 'dashboard' | 'products';

function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');

  return (
    <div className="app">
      <nav className="app-nav">
        <div className="app-nav-content">
          <h1 className="app-logo">AIDrivenApp</h1>
          <div className="app-nav-links">
            <button
              className={`app-nav-link ${currentView === 'dashboard' ? 'active' : ''}`}
              onClick={() => setCurrentView('dashboard')}
            >
              Dashboard
            </button>
            <button
              className={`app-nav-link ${currentView === 'products' ? 'active' : ''}`}
              onClick={() => setCurrentView('products')}
            >
              Products
            </button>
          </div>
        </div>
      </nav>

      <main className="app-main">
        {currentView === 'dashboard' && <Dashboard />}
        {currentView === 'products' && <ProductList />}
      </main>

      <footer className="app-footer">
        <p>&copy; 2024 AIDrivenApp. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
