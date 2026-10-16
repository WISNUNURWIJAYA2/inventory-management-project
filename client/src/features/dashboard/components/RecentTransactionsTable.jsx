import React from 'react';
import {
  ArrowLeftRight,
  ArrowRight,
  ArrowDown,
  ArrowUp
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
import { recentTransactions } from '@/data/mockData';

export function RecentTransactionsTable() {
  return (
    <div className="bg-surface-container-lowest rounded shadow-xs border border-outline-variant/30 flex flex-col justify-between overflow-hidden">
      <div>
        {/* Table Header */}
        <div className="p-4 flex items-center justify-between border-b border-outline-variant/20">
          <div className="flex items-center gap-2">
            <ArrowLeftRight className="w-4 h-4 text-tertiary" />
            <h3 className="text-[15px] text-on-surface font-semibold">
              Recent Transactions
            </h3>
            <Badge variant="neutral" className="rounded-full text-[11px] font-semibold">
              Today&apos;s Log (18)
            </Badge>
          </div>

          <button
            type="button"
            className="text-xs text-primary hover:underline flex items-center gap-1 font-semibold"
          >
            <span>View all</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* High Density Activity Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-surface-container-low h-9 text-secondary font-semibold text-xs uppercase tracking-wider">
                <TableHead className="px-4">Time</TableHead>
                <TableHead className="px-3">Product</TableHead>
                <TableHead className="px-3">Type</TableHead>
                <TableHead className="px-3 text-right">Qty</TableHead>
                <TableHead className="px-4">User</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentTransactions.map((tx) => {
                const isIn = tx.type === 'IN';
                return (
                  <TableRow key={tx.id} className="h-11 hover:bg-surface-container-low transition-colors">
                    <TableCell className="px-4 font-mono text-[11px] text-outline whitespace-nowrap">
                      {tx.time}
                    </TableCell>

                    <TableCell className="px-3 font-medium text-xs text-on-surface truncate max-w-[140px]">
                      {tx.product}
                    </TableCell>

                    <TableCell className="px-3">
                      {isIn ? (
                        <Badge variant="tertiary" className="gap-0.5 rounded text-[11px] font-semibold">
                          <ArrowDown className="w-3 h-3" />
                          <span>In</span>
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="gap-0.5 rounded text-[11px] font-semibold">
                          <ArrowUp className="w-3 h-3" />
                          <span>Out</span>
                        </Badge>
                      )}
                    </TableCell>

                    <TableCell
                      className={`px-3 font-mono text-xs text-right font-bold ${
                        isIn ? 'text-tertiary' : 'text-primary'
                      }`}
                    >
                      {tx.quantity}
                    </TableCell>

                    <TableCell className="px-4 text-xs text-secondary truncate max-w-[110px]">
                      {tx.user}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Footer Info */}
      <div className="px-4 py-2 bg-surface-container-low flex items-center justify-between text-outline font-mono text-[11px] border-t border-outline-variant/20">
        <span>Ledger sync: 100% committed</span>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-tertiary" />
          <span>Auto-archive on</span>
        </span>
      </div>
    </div>
  );
}

