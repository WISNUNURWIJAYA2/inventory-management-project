import React, { useState, useMemo } from 'react';
import {
  Download,
  Sliders,
  Plus,
  CheckCircle2,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { initialProducts } from '@/data/productsMock';
import { ProductTelemetryTicker } from '@/features/products/components/ProductTelemetryTicker';
import { ProductsFilterToolbar } from '@/features/products/components/ProductsFilterToolbar';
import { ProductsTable } from '@/features/products/components/ProductsTable';
import { ProductFormModal } from '@/features/products/components/ProductFormModal';
import { DeleteConfirmDialog } from '@/features/products/components/DeleteConfirmDialog';

export function ProductsPage({ onNavigateToStockIn }) {
  const [products, setProducts] = useState(initialProducts);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('lowstock'); // default low stock & depleted as in stitch mockup

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Modals state
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState({
    visible: false,
    text: ''
  });

  const showToast = (text) => {
    setToastMessage({ visible: true, text });
    setTimeout(() => {
      setToastMessage((prev) => ({ ...prev, visible: false }));
    }, 4000);
  };

  // Filtered products calculation
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // Search by name, SKU, or spec
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match =
          item.name.toLowerCase().includes(q) ||
          item.sku.toLowerCase().includes(q) ||
          (item.spec && item.spec.toLowerCase().includes(q));
        if (!match) return false;
      }

      // Category filter
      if (categoryFilter !== 'all') {
        if (item.category.toLowerCase() !== categoryFilter.toLowerCase()) {
          return false;
        }
      }

      // Status filter
      if (statusFilter !== 'all') {
        if (statusFilter === 'instock' && item.status !== 'In Stock') return false;
        if (statusFilter === 'critical' && item.status !== 'Critical Low') return false;
        if (statusFilter === 'depleted' && item.status !== 'Out of Stock') return false;
        if (statusFilter === 'lowstock') {
          if (item.status !== 'Low Stock' && item.status !== 'Critical Low' && item.status !== 'Out of Stock') {
            return false;
          }
        }
      }

      return true;
    });
  }, [products, searchQuery, categoryFilter, statusFilter]);

  // Paginated products calculation
  const totalPages = Math.ceil(filteredProducts.length / pageSize) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredProducts.slice(start, start + pageSize);
  }, [filteredProducts, currentPage, pageSize]);

  // CRUD Actions
  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (product) => {
    setEditingProduct(product);
    setIsFormModalOpen(true);
  };

  const handleSaveProduct = (productData) => {
    if (editingProduct) {
      // Update existing
      setProducts((prev) =>
        prev.map((p) => (p.id === productData.id ? { ...p, ...productData } : p))
      );
      showToast(`Product "${productData.name}" (${productData.sku}) updated successfully.`);
    } else {
      // Create new
      setProducts((prev) => [productData, ...prev]);
      showToast(`New product "${productData.name}" (${productData.sku}) added to catalog.`);
    }
  };

  const handleOpenDeleteModal = (product) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = (id) => {
    const prod = products.find((p) => p.id === id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setIsDeleteModalOpen(false);
    setProductToDelete(null);
    showToast(`Product "${prod?.name || id}" permanently removed.`);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setCategoryFilter('all');
    setStatusFilter('all');
    setCurrentPage(1);
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = 'ID,Name,SKU,Category,CurrentStock,MinStock,Unit,Updated,Status,Zone,Aisle,Shelf\n';
    const rows = products
      .map(
        (p) =>
          `"${p.id}","${p.name}","${p.sku}","${p.category}",${p.stock},${p.minStock},"${p.unit}","${p.updated}","${p.status}","${p.zone || ''}","${p.aisle || ''}","${p.shelf || ''}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `StockFlow_Products_Catalog_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const existingSkus = useMemo(() => products.map((p) => p.sku), [products]);

  return (
    <div className="flex flex-col w-full pb-8">
      {/* Toast Notification Alert */}
      {toastMessage.visible && (
        <div className="px-4 lg:px-6 pt-4">
          <div className="flex items-center justify-between bg-surface-container-lowest shadow-xs border border-outline-variant/30 rounded-lg p-2.5 pl-3 text-on-surface">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-tertiary-fixed text-on-tertiary-fixed shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </span>
              <span className="text-xs font-semibold text-on-surface shrink-0">
                Catalog Updated:
              </span>
              <span className="text-xs text-on-surface-variant truncate">
                {toastMessage.text}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setToastMessage({ visible: false, text: '' })}
              className="text-outline hover:text-on-surface p-1 rounded hover:bg-surface-container transition-colors ml-2 shrink-0"
              title="Dismiss"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Dynamic Top Bar & Page Summary */}
      <div className="px-4 lg:px-6 pt-5 pb-3 flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5 mb-1">
              <h1 className="text-xl sm:text-2xl text-on-surface font-bold tracking-tight">
                Products
              </h1>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-mono text-[11px] font-semibold">
                {products.length} active SKUs
              </span>
            </div>
            <p className="text-xs text-on-surface-variant max-w-2xl">
              Catalog inventory, SKU specifications, stock threshold levels, and real-time availability.
            </p>
          </div>

          {/* Action Cluster Buttons */}
          <div className="flex items-center gap-2 self-start md:self-auto flex-wrap">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleExportCSV}
              className="h-8 px-3 text-xs gap-1.5 shadow-xs bg-surface-container hover:bg-surface-container-high border-outline-variant/60"
            >
              <Download className="w-3.5 h-3.5 text-outline" />
              <span>Export CSV</span>
            </Button>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => alert('Bulk Stock Adjust modal')}
              className="h-8 px-3 text-xs gap-1.5 shadow-xs bg-surface-container hover:bg-surface-container-high border-outline-variant/60"
            >
              <Sliders className="w-3.5 h-3.5 text-outline" />
              <span>Bulk Adjust</span>
            </Button>

            <Button
              type="button"
              size="sm"
              onClick={handleOpenAddModal}
              className="h-8 px-3.5 rounded text-xs gap-1.5 bg-primary text-on-primary hover:bg-primary-container shadow-xs font-semibold transition-all active:translate-y-0.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add Product</span>
            </Button>
          </div>
        </div>

        {/* Quick Telemetry Ticker (4 KPI) */}
        <ProductTelemetryTicker products={products} />
      </div>

      {/* Main Functional Work Area */}
      <div className="px-4 lg:px-6 space-y-4">
        {/* Filter & Search SaaS Bar */}
        <ProductsFilterToolbar
          searchQuery={searchQuery}
          onSearchChange={(q) => {
            setSearchQuery(q);
            setCurrentPage(1);
          }}
          categoryFilter={categoryFilter}
          onCategoryFilterChange={(c) => {
            setCategoryFilter(c);
            setCurrentPage(1);
          }}
          statusFilter={statusFilter}
          onStatusFilterChange={(s) => {
            setStatusFilter(s);
            setCurrentPage(1);
          }}
          onResetFilters={handleResetFilters}
          totalFiltered={filteredProducts.length}
          totalProducts={products.length}
          onOpenScanner={() => alert('Barcode HUD Listener Activated')}
        />

        {/* Main High-Density Table Card */}
        <ProductsTable
          products={paginatedProducts}
          onStockIn={(p) => {
            if (onNavigateToStockIn) onNavigateToStockIn(p);
            else alert(`Initiate Stock In for ${p.name} (${p.sku})`);
          }}
          onEditProduct={handleOpenEditModal}
          onDeletePrompt={handleOpenDeleteModal}
          onResetFilters={handleResetFilters}
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredProducts.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={(sz) => {
            setPageSize(sz);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* Add / Edit Product Modal */}
      <ProductFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSubmit={handleSaveProduct}
        initialData={editingProduct}
        existingSkus={existingSkus}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setProductToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        product={productToDelete}
      />
    </div>
  );
}

