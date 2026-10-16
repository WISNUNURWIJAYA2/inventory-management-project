import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DashboardPage } from '@/pages/DashboardPage';
import { StockTransactionsPage } from '@/pages/StockTransactionsPage';
import { ProductsPage } from '@/pages/ProductsPage';

export default function App() {
  const [currentTab, setCurrentTab] = useState('products');

  return (
    <DashboardLayout currentTab={currentTab} onNavigate={setCurrentTab}>
      {currentTab === 'dashboard' && (
        <DashboardPage
          onNavigateToTransactions={() => setCurrentTab('stock-transactions')}
          onNavigateToProducts={() => setCurrentTab('products')}
        />
      )}

      {currentTab === 'products' && (
        <ProductsPage
          onNavigateToStockIn={(product) => {
            setCurrentTab('stock-transactions');
          }}
        />
      )}

      {currentTab === 'stock-transactions' && <StockTransactionsPage />}
    </DashboardLayout>
  );
}
