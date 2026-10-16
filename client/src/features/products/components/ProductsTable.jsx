import React, { useState } from 'react';
import {
  Cog,
  Cpu,
  Droplet,
  Wrench,
  Ruler,
  Package,
  SearchX,
  Edit2,
  Trash2,
  MoreVertical,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

export function ProductsTable({
  products,
  onStockIn,
  onEditProduct,
  onDeletePrompt,
  onResetFilters,
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  pageSize = 10,
  onPageChange,
  onPageSizeChange
}) {
  const [selectedIds, setSelectedIds] = useState([]);

  const toggleSelectAll = () => {
    if (selectedIds.length === products.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(products.map((p) => p.id));
    }
  };

  const toggleSelectRow = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const getCategoryIcon = (cat) => {
    switch (cat?.toLowerCase()) {
      case 'mechanical':
        return <Cog className="w-4 h-4 text-outline" />;
      case 'electronics':
        return <Cpu className="w-4 h-4 text-outline" />;
      case 'fluids':
        return <Droplet className="w-4 h-4 text-outline" />;
      case 'fasteners':
        return <Wrench className="w-4 h-4 text-outline" />;
      case 'tools':
        return <Ruler className="w-4 h-4 text-outline" />;
      default:
        return <Package className="w-4 h-4 text-outline" />;
    }
  };

  const startIndex = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="bg-surface-container-lowest rounded-lg shadow-xs border border-outline-variant/30 overflow-hidden flex flex-col justify-between">
      <div className="overflow-x-auto w-full">
        <Table className="w-full text-left min-w-[960px]">
          <TableHeader>
            <TableRow className="bg-surface-container-low text-on-surface-variant h-9 border-b border-outline-variant/30">
              <TableHead className="w-10 px-4">
                <input
                  type="checkbox"
                  checked={products.length > 0 && selectedIds.length === products.length}
                  onChange={toggleSelectAll}
                  className="rounded bg-surface-container-lowest text-primary cursor-pointer accent-primary"
                />
              </TableHead>
              <TableHead className="px-4 font-semibold text-[11px] uppercase tracking-wider text-outline">
                Product Name &amp; Spec
              </TableHead>
              <TableHead className="px-4 font-semibold text-[11px] uppercase tracking-wider text-outline">
                SKU Identifier
              </TableHead>
              <TableHead className="px-4 font-semibold text-[11px] uppercase tracking-wider text-outline">
                Category
              </TableHead>
              <TableHead className="px-4 font-semibold text-[11px] uppercase tracking-wider text-outline text-right">
                Current Stock
              </TableHead>
              <TableHead className="px-4 font-semibold text-[11px] uppercase tracking-wider text-outline text-right">
                Min Safe
              </TableHead>
              <TableHead className="px-4 font-semibold text-[11px] uppercase tracking-wider text-outline">
                Unit
              </TableHead>
              <TableHead className="px-4 font-semibold text-[11px] uppercase tracking-wider text-outline">
                Updated
              </TableHead>
              <TableHead className="px-4 font-semibold text-[11px] uppercase tracking-wider text-outline">
                Status
              </TableHead>
              <TableHead className="px-4 font-semibold text-[11px] uppercase tracking-wider text-outline text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} className="p-0">
                  <div className="py-12 px-6 flex flex-col items-center justify-center text-center">
                    <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-outline mb-3">
                      <SearchX className="w-6 h-6" />
                    </div>
                    <h3 className="text-base text-on-surface font-semibold mb-1">
                      No matching SKUs found
                    </h3>
                    <p className="text-xs text-on-surface-variant max-w-sm mb-4">
                      We couldn&apos;t find any products matching your query. Check for typos or reset active status filters.
                    </p>
                    <button
                      type="button"
                      onClick={onResetFilters}
                      className="px-4 py-1.5 bg-surface-container hover:bg-surface-container-high rounded text-on-surface text-xs font-semibold shadow-xs transition-colors"
                    >
                      Reset All Filters
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              products.map((item) => {
                const isSelected = selectedIds.includes(item.id);
                const isOutOfStock = item.status === 'Out of Stock' || item.stock === 0;
                const isCritical = item.status === 'Critical Low';
                const isLow = item.status === 'Low Stock';

                return (
                  <TableRow
                    key={item.id}
                    className={`hover:bg-surface-container-low/50 transition-colors border-b border-outline-variant/20 ${
                      isOutOfStock ? 'bg-error-container/10' : ''
                    }`}
                  >
                    {/* Checkbox */}
                    <TableCell className="px-4 py-2.5">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelectRow(item.id)}
                        className="rounded cursor-pointer accent-primary"
                      />
                    </TableCell>

                    {/* Product Name & Spec */}
                    <TableCell className="px-4 py-2.5">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-8 h-8 rounded flex items-center justify-center flex-shrink-0 ${
                            isOutOfStock
                              ? 'bg-error-container/40 text-error'
                              : 'bg-surface-container text-outline'
                          }`}
                        >
                          {getCategoryIcon(item.category)}
                        </div>
                        <div className="min-w-0">
                          <span className="text-xs font-semibold text-on-surface block truncate max-w-[220px]">
                            {item.name}
                          </span>
                          <span className="text-[11px] text-outline block truncate max-w-[220px]">
                            {item.spec || 'Standard component specification'}
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    {/* SKU Identifier */}
                    <TableCell className="px-4 py-2.5">
                      <span className="font-mono text-xs bg-surface-container-low px-1.5 py-0.5 rounded text-on-surface font-medium border border-outline-variant/40">
                        {item.sku}
                      </span>
                    </TableCell>

                    {/* Category */}
                    <TableCell className="px-4 py-2.5">
                      <span className="px-1.5 py-0.5 rounded bg-surface-container text-on-surface-variant text-[11px] font-medium">
                        {item.category}
                      </span>
                    </TableCell>

                    {/* Current Stock */}
                    <TableCell className="px-4 py-2.5 text-right font-mono text-xs font-semibold">
                      <span
                        className={
                          isOutOfStock
                            ? 'text-error font-bold'
                            : isCritical || isLow
                            ? 'text-secondary'
                            : 'text-tertiary'
                        }
                      >
                        {item.stock}
                      </span>
                    </TableCell>

                    {/* Min Safe */}
                    <TableCell className="px-4 py-2.5 text-right font-mono text-xs text-outline">
                      {item.minStock}
                    </TableCell>

                    {/* Unit */}
                    <TableCell className="px-4 py-2.5 text-on-surface-variant font-mono text-[11px]">
                      {item.unit}
                    </TableCell>

                    {/* Updated */}
                    <TableCell className="px-4 py-2.5 text-outline text-xs whitespace-nowrap">
                      {item.updated}
                    </TableCell>

                    {/* Status Badge */}
                    <TableCell className="px-4 py-2.5">
                      {isCritical ? (
                        <Badge
                          variant="secondary"
                          className="gap-1.5 rounded-full text-[11px] font-semibold"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                          <span>Critical Low</span>
                        </Badge>
                      ) : isLow ? (
                        <Badge
                          variant="secondary"
                          className="gap-1.5 rounded-full text-[11px] font-semibold"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                          <span>Low Stock</span>
                        </Badge>
                      ) : isOutOfStock ? (
                        <Badge
                          variant="destructive"
                          className="gap-1.5 rounded-full text-[11px] font-semibold"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-error" />
                          <span>Out of Stock</span>
                        </Badge>
                      ) : (
                        <Badge
                          variant="tertiary"
                          className="gap-1.5 rounded-full text-[11px] font-semibold"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-tertiary" />
                          <span>In Stock</span>
                        </Badge>
                      )}
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="px-4 py-2.5 text-right">
                      <div className="inline-flex items-center gap-1">
                        {isOutOfStock ? (
                          <button
                            type="button"
                            onClick={() => onStockIn && onStockIn(item)}
                            className="px-2 py-1 rounded bg-error/10 hover:bg-error/20 text-[11px] text-error font-semibold transition-colors"
                          >
                            Restock
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => onStockIn && onStockIn(item)}
                            className="px-2 py-1 rounded hover:bg-surface-container text-[11px] text-primary font-semibold transition-colors"
                          >
                            Stock In
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => onEditProduct && onEditProduct(item)}
                          className="p-1 rounded hover:bg-surface-container text-outline hover:text-on-surface transition-colors"
                          title="Edit SKU"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => onDeletePrompt && onDeletePrompt(item)}
                          className="p-1 rounded hover:bg-error-container/20 text-outline hover:text-error transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          className="p-1 rounded hover:bg-surface-container text-outline hover:text-on-surface transition-colors"
                          title="More Options"
                        >
                          <MoreVertical className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination & Table Footer */}
      <div className="px-4 py-3 bg-surface-container-lowest flex flex-col sm:flex-row items-center justify-between gap-3 text-on-surface-variant border-t border-outline-variant/20 text-xs">
        <div>
          Showing <span className="font-mono font-medium text-on-surface">{startIndex}</span> to{' '}
          <span className="font-mono font-medium text-on-surface">{endIndex}</span> of{' '}
          <span className="font-mono font-medium text-on-surface">{totalItems}</span> entries
        </div>

        <div className="flex items-center gap-4">
          {/* Rows Per Page */}
          <div className="flex items-center gap-1.5 text-xs text-outline">
            <span>Rows per page:</span>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="pl-1.5 pr-4 py-0.5 bg-surface-container-low border border-outline-variant/60 rounded font-mono text-[11px] text-on-surface focus:outline-none cursor-pointer"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>

          {/* Page Buttons */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => onPageChange(currentPage - 1)}
              className="p-1 rounded bg-surface-container-low text-outline hover:text-on-surface disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              title="Previous Page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => {
              const isCurrent = pg === currentPage;
              return (
                <button
                  key={pg}
                  type="button"
                  onClick={() => onPageChange(pg)}
                  className={`w-7 h-7 rounded font-mono text-xs font-semibold flex items-center justify-center transition-colors ${
                    isCurrent
                      ? 'bg-primary text-on-primary shadow-xs'
                      : 'hover:bg-surface-container text-on-surface'
                  }`}
                >
                  {pg}
                </button>
              );
            })}

            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => onPageChange(currentPage + 1)}
              className="p-1 rounded bg-surface-container-low text-on-surface hover:bg-surface-container disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              title="Next Page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

