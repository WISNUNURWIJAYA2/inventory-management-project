import React from 'react';
import {
  Package,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { lowStockProducts } from '@/data/mockData';

export function LowStockTable({ isHealthyState = false, onStockIn }) {
  return (
    <div className="bg-surface-container-lowest rounded shadow-xs border border-outline-variant/30 flex flex-col justify-between overflow-hidden">
      <div>
        {/* Table Header */}
        <div className="p-4 flex items-center justify-between border-b border-outline-variant/20">
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-secondary" />
            <h3 className="text-[15px] text-on-surface font-semibold">
              Low Stock Products
            </h3>
            <Badge variant="secondary" className="rounded-full text-[11px] font-semibold">
              {isHealthyState ? '0 items' : '24 items'}
            </Badge>
          </div>

          <button
            type="button"
            className="text-xs text-primary hover:underline flex items-center gap-1 font-semibold"
          >
            <span>View all products</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Content Area */}
        {isHealthyState ? (
          <div className="p-8 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-full bg-tertiary-fixed flex items-center justify-center text-tertiary mb-3">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-[15px] text-on-surface font-semibold">
              All Stock Levels Healthy
            </h4>
            <p className="text-xs text-secondary mt-1 max-w-sm">
              No items currently below configured safety margins. Next automatic inventory audit scheduled for 18:00.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-surface-container-low h-9 text-secondary font-semibold text-xs uppercase tracking-wider">
                  <TableHead className="px-4">Product</TableHead>
                  <TableHead className="px-3">SKU</TableHead>
                  <TableHead className="px-3 text-right">Current Stock</TableHead>
                  <TableHead className="px-3 text-right">Min Stock</TableHead>
                  <TableHead className="px-3">Status</TableHead>
                  <TableHead className="px-4 text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lowStockProducts.map((item) => (
                  <TableRow key={item.id} className="h-11 hover:bg-surface-container-low transition-colors">
                    <TableCell className="px-4 font-medium text-on-surface py-2 text-xs">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                            item.isCritical ? 'bg-error' : 'bg-secondary'
                          }`}
                        />
                        <span className="truncate max-w-[180px]">{item.name}</span>
                      </div>
                    </TableCell>

                    <TableCell className="px-3 font-mono text-xs text-secondary">
                      {item.sku}
                    </TableCell>

                    <TableCell
                      className={`px-3 font-mono text-xs text-right font-semibold ${
                        item.isCritical ? 'text-error' : 'text-secondary'
                      }`}
                    >
                      {item.stock} units
                    </TableCell>

                    <TableCell className="px-3 font-mono text-xs text-right text-secondary">
                      {item.minStock} units
                    </TableCell>

                    <TableCell className="px-3">
                      {item.isCritical ? (
                        <Badge variant="destructive" className="gap-1 rounded-full text-[11px] font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-error" />
                          <span>Critical Low</span>
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="gap-1 rounded-full text-[11px] font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                          <span>Low Stock</span>
                        </Badge>
                      )}
                    </TableCell>

                    <TableCell className="px-4 text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onStockIn && onStockIn(item)}
                        className="h-7 px-2.5 bg-surface-container-lowest hover:bg-surface-container text-primary text-xs rounded shadow-xs"
                      >
                        Stock In
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="px-4 py-2 bg-surface-container-low flex items-center justify-between text-outline font-mono text-[11px] border-t border-outline-variant/20">
        <span>Showing {isHealthyState ? '0' : '4'} of {isHealthyState ? '0' : '24'} critical threshold SKUs</span>
        <span>Reorder algorithm v2.1 active</span>
      </div>
    </div>
  );
}

