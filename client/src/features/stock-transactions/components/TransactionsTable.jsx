import React from 'react';
import {
  ArrowDownLeft,
  ArrowUpRight,
  SlidersHorizontal,
  Truck,
  Factory,
  ClipboardList,
  Wrench,
  Package,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  FileQuestion
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

export function TransactionsTable({
  transactions,
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  pageSize = 7,
  onPageChange
}) {
  const getNoteIcon = (type) => {
    switch (type) {
      case 'shipping':
        return <Truck className="w-3.5 h-3.5 text-outline shrink-0" />;
      case 'factory':
        return <Factory className="w-3.5 h-3.5 text-outline shrink-0" />;
      case 'assignment':
        return <ClipboardList className="w-3.5 h-3.5 text-outline shrink-0" />;
      case 'wrench':
        return <Wrench className="w-3.5 h-3.5 text-outline shrink-0" />;
      default:
        return <Package className="w-3.5 h-3.5 text-outline shrink-0" />;
    }
  };

  const startIndex = (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="bg-surface-container-lowest rounded-lg shadow-xs border border-outline-variant/30 overflow-hidden flex flex-col justify-between">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-surface-container-low text-on-surface-variant h-10 border-b border-outline-variant/30">
              <TableHead className="py-2.5 px-4 font-semibold text-[11px] uppercase tracking-wider text-secondary">
                Date &amp; Timestamp
              </TableHead>
              <TableHead className="py-2.5 px-4 font-semibold text-[11px] uppercase tracking-wider text-secondary">
                Product &amp; SKU
              </TableHead>
              <TableHead className="py-2.5 px-4 font-semibold text-[11px] uppercase tracking-wider text-secondary text-center">
                Type
              </TableHead>
              <TableHead className="py-2.5 px-4 font-semibold text-[11px] uppercase tracking-wider text-secondary text-right">
                Quantity
              </TableHead>
              <TableHead className="py-2.5 px-4 font-semibold text-[11px] uppercase tracking-wider text-secondary text-right">
                Prev → New
              </TableHead>
              <TableHead className="py-2.5 px-4 font-semibold text-[11px] uppercase tracking-wider text-secondary">
                Operator
              </TableHead>
              <TableHead className="py-2.5 px-4 font-semibold text-[11px] uppercase tracking-wider text-secondary">
                Notes &amp; PO Ref
              </TableHead>
              <TableHead className="py-2.5 px-4 font-semibold text-[11px] uppercase tracking-wider text-secondary text-center">
                Audit Status
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {transactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-12 text-secondary">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <FileQuestion className="w-8 h-8 text-outline" />
                    <span className="font-medium text-sm text-on-surface">No transactions found</span>
                    <span className="text-xs text-outline max-w-sm">
                      Try adjusting your search keywords, transaction type filters, or date range.
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              transactions.map((tx) => {
                const isStockIn = tx.type === 'IN';
                const isAdjustment = tx.type === 'ADJUSTMENT';

                return (
                  <TableRow
                    key={tx.id}
                    className="hover:bg-surface-container-low transition-colors group border-b border-outline-variant/20"
                  >
                    {/* 1. Date & Time */}
                    <TableCell className="py-3 px-4 font-mono text-[11px] text-on-surface-variant whitespace-nowrap">
                      {tx.date} <span className="text-outline">{tx.time}</span>
                    </TableCell>

                    {/* 2. Product & SKU */}
                    <TableCell className="py-3 px-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-on-surface">
                          {tx.productName}
                        </span>
                        <span className="font-mono text-[11px] text-outline">
                          {tx.sku}
                        </span>
                      </div>
                    </TableCell>

                    {/* 3. Type Pill */}
                    <TableCell className="py-3 px-4 text-center whitespace-nowrap">
                      {isStockIn ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed">
                          <ArrowDownLeft className="w-3 h-3" />
                          <span>Stock In</span>
                        </span>
                      ) : isAdjustment ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container">
                          <SlidersHorizontal className="w-3 h-3" />
                          <span>Adjustment</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-error-container text-on-error-container">
                          <ArrowUpRight className="w-3 h-3" />
                          <span>Stock Out</span>
                        </span>
                      )}
                    </TableCell>

                    {/* 4. Quantity */}
                    <TableCell
                      className={`py-3 px-4 font-mono text-sm text-right font-bold whitespace-nowrap ${
                        isStockIn
                          ? 'text-tertiary'
                          : isAdjustment
                          ? 'text-primary'
                          : 'text-error'
                      }`}
                    >
                      {isStockIn ? '+' : isAdjustment ? '+' : '-'}{tx.quantity} {tx.unit}
                    </TableCell>

                    {/* 5. Prev -> New */}
                    <TableCell className="py-3 px-4 font-mono text-[11px] text-right text-on-surface-variant whitespace-nowrap">
                      {tx.prevStock} <span className="text-outline">→</span>{' '}
                      <span
                        className={`font-semibold ${
                          tx.newStock === 0
                            ? 'text-error font-extrabold'
                            : tx.newStock < 10
                            ? 'text-error font-bold'
                            : 'text-on-surface'
                        }`}
                      >
                        {tx.newStock} {tx.unit}
                      </span>
                    </TableCell>

                    {/* 6. Operator */}
                    <TableCell className="py-3 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <div
                          className={`w-5 h-5 rounded-full ${tx.operator.color} flex items-center justify-center font-mono text-[10px] font-bold`}
                        >
                          {tx.operator.initials}
                        </div>
                        <span className="text-xs text-on-surface">
                          {tx.operator.name}
                        </span>
                      </div>
                    </TableCell>

                    {/* 7. Notes & PO Ref */}
                    <TableCell className="py-3 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 max-w-[240px]">
                        {getNoteIcon(tx.iconType)}
                        <span className="text-xs text-on-surface-variant truncate">
                          {tx.note}
                        </span>
                      </div>
                    </TableCell>

                    {/* 8. Audit Status */}
                    <TableCell className="py-3 px-4 text-center whitespace-nowrap">
                      {tx.statusCode === 'low_stock' ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                          <span>Low Stock Alert</span>
                        </span>
                      ) : tx.statusCode === 'out_of_stock' ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded bg-error-container text-on-error-container">
                          <span className="w-1.5 h-1.5 rounded-full bg-error" />
                          <span>Out of Stock</span>
                        </span>
                      ) : tx.statusCode === 'reconciled' ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded bg-surface-container text-on-surface">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                          <span>Reconciled</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded bg-surface-container text-on-surface">
                          <span className="w-1.5 h-1.5 rounded-full bg-tertiary" />
                          <span>Completed</span>
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Footer */}
      {totalItems > 0 && (
        <div className="p-3 bg-surface-container-lowest flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-outline-variant/20 text-xs">
          <span className="text-on-surface-variant">
            Showing <span className="font-semibold text-on-surface">{startIndex}</span> to{' '}
            <span className="font-semibold text-on-surface">{endIndex}</span> of{' '}
            <span className="font-semibold text-on-surface">{totalItems}</span> transactions
          </span>

          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => onPageChange(1)}
              className="p-1 rounded bg-surface-container text-outline hover:text-on-surface disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              title="First Page"
            >
              <ChevronsLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => onPageChange(currentPage - 1)}
              className="p-1 rounded bg-surface-container text-outline hover:text-on-surface disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              title="Previous Page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="px-3 font-mono text-[11px] text-on-surface font-semibold">
              Page {currentPage} of {Math.max(totalPages, 1)}
            </span>

            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => onPageChange(currentPage + 1)}
              className="p-1 rounded bg-surface-container text-outline hover:text-on-surface disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              title="Next Page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => onPageChange(totalPages)}
              className="p-1 rounded bg-surface-container text-outline hover:text-on-surface disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              title="Last Page"
            >
              <ChevronsRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

