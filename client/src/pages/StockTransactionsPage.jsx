import React, { useState, useMemo } from 'react';
import {
  ArrowDownLeft,
  ArrowUpRight,
  Download,
  CheckCircle2,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { warehouseProducts, initialTransactions, initialStats } from '@/data/transactionsMock';
import { TransactionsKpiBar } from '@/features/stock-transactions/components/TransactionsKpiBar';
import { RecordMovementCard } from '@/features/stock-transactions/components/RecordMovementCard';
import { ScannerHudPanel } from '@/features/stock-transactions/components/ScannerHudPanel';
import { TransactionsFilterToolbar } from '@/features/stock-transactions/components/TransactionsFilterToolbar';
import { TransactionsTable } from '@/features/stock-transactions/components/TransactionsTable';

export function StockTransactionsPage() {
  const [products, setProducts] = useState(warehouseProducts);
  const [transactions, setTransactions] = useState(initialTransactions);
  const [stats, setStats] = useState(initialStats);
  const [activeMovementType, setActiveMovementType] = useState('IN');

  // Filter and Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [staffFilter, setStaffFilter] = useState('all');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 7;

  // Toast notification state
  const [toastMessage, setToastMessage] = useState({
    visible: true,
    txId: 'TX-2024-9842',
    text: 'Stock transaction recorded successfully. In-memory balances recalculated.',
    time: 'Synced 4s ago'
  });

  // Handler for new transaction submission
  const handleRecordTransaction = (txData) => {
    const txId = `TX-2024-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];
    const dateStr = now.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });

    // Determine audit status code
    let statusCode = 'completed';
    let status = 'Completed';
    if (txData.newStock === 0) {
      statusCode = 'out_of_stock';
      status = 'Out of Stock';
    } else if (txData.newStock < 10) {
      statusCode = 'low_stock';
      status = 'Low Stock Alert';
    }

    const newTx = {
      id: txId,
      date: dateStr,
      time: timeStr,
      productId: txData.productId,
      productName: txData.productName,
      sku: txData.sku,
      type: txData.type,
      quantity: txData.quantity,
      unit: txData.unit,
      prevStock: txData.prevStock,
      newStock: txData.newStock,
      operator: {
        name: 'Elena Vance',
        initials: 'EV',
        color: 'bg-primary-fixed text-on-primary-fixed'
      },
      note: txData.note,
      iconType: txData.type === 'IN' ? 'shipping' : 'factory',
      status: status,
      statusCode: statusCode
    };

    // 1. Update product list stock in memory
    setProducts((prev) =>
      prev.map((p) =>
        p.id === txData.productId ? { ...p, currentStock: txData.newStock } : p
      )
    );

    // 2. Prepend transaction to ledger history
    setTransactions((prev) => [newTx, ...prev]);

    // 3. Update summary metrics
    setStats((prev) => {
      if (txData.type === 'IN') {
        const newInbound = prev.inboundUnitsToday + txData.quantity;
        return {
          ...prev,
          inboundUnitsToday: newInbound,
          inboundReceiptsToday: prev.inboundReceiptsToday + 1,
          inboundProgress: Math.min(Math.round((newInbound / 500) * 100), 100),
          ledgerCycle30d: prev.ledgerCycle30d + 1
        };
      } else {
        const newOutbound = prev.outboundUnitsToday + txData.quantity;
        return {
          ...prev,
          outboundUnitsToday: newOutbound,
          outboundDispatchesToday: prev.outboundDispatchesToday + 1,
          outboundProgress: Math.min(Math.round((newOutbound / 400) * 100), 100),
          ledgerCycle30d: prev.ledgerCycle30d + 1
        };
      }
    });

    // 4. Show success toast notification
    setToastMessage({
      visible: true,
      txId: txId,
      text: `Stock transaction recorded for ${txData.productName}. New balance: ${txData.newStock} ${txData.unit}.`,
      time: 'Synced just now'
    });

    // Reset pagination to first page so the new row is immediately visible
    setCurrentPage(1);
  };

  // Export CSV simulation
  const handleExportCSV = () => {
    const headers = 'ID,Date,Time,Product,SKU,Type,Quantity,Unit,PrevStock,NewStock,Operator,Note,Status\n';
    const rows = transactions
      .map(
        (t) =>
          `"${t.id}","${t.date}","${t.time}","${t.productName}","${t.sku}","${t.type}",${t.quantity},"${t.unit}",${t.prevStock},${t.newStock},"${t.operator.name}","${t.note}","${t.status}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `StockFlow_Transactions_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setTypeFilter('all');
    setDateFilter('all');
    setStaffFilter('all');
    setCurrentPage(1);
  };

  // Filtered transactions computation
  const filteredTransactions = useMemo(() => {
    return transactions.filter((item) => {
      // Search query (product, SKU, note, id)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match =
          item.productName.toLowerCase().includes(q) ||
          item.sku.toLowerCase().includes(q) ||
          item.note.toLowerCase().includes(q) ||
          item.id.toLowerCase().includes(q);
        if (!match) return false;
      }

      // Type filter
      if (typeFilter !== 'all' && item.type !== typeFilter) {
        return false;
      }

      // Staff filter
      if (staffFilter !== 'all' && item.operator.name !== staffFilter) {
        return false;
      }

      return true;
    });
  }, [transactions, searchQuery, typeFilter, staffFilter]);

  // Paginated items
  const totalPages = Math.ceil(filteredTransactions.length / pageSize) || 1;
  const paginatedTransactions = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredTransactions.slice(start, start + pageSize);
  }, [filteredTransactions, currentPage, pageSize]);

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
                Ledger Updated:
              </span>
              <span className="text-xs text-on-surface-variant truncate">
                Stock transaction{' '}
                <span className="font-mono text-primary font-semibold">
                  {toastMessage.txId}
                </span>{' '}
                {toastMessage.text}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="font-mono text-[11px] text-outline hidden sm:inline">
                {toastMessage.time}
              </span>
              <button
                type="button"
                onClick={() => setToastMessage((prev) => ({ ...prev, visible: false }))}
                className="text-outline hover:text-on-surface p-1 rounded hover:bg-surface-container transition-colors"
                title="Dismiss"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header Area */}
      <div className="px-4 lg:px-6 pt-5 pb-2 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-[11px] uppercase tracking-wider text-outline font-semibold">
              Warehouse Operations
            </span>
            <span className="text-outline-variant">•</span>
            <span className="font-mono text-[11px] text-tertiary font-semibold">
              Station #04 Live
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl text-on-surface font-bold tracking-tight mt-0.5">
            Stock Transactions
          </h1>
          <p className="text-xs text-on-surface-variant mt-0.5">
            Log inbound deliveries, outbound dispatches, adjustments, and trace warehouse audit records.
          </p>
        </div>

        {/* Action Buttons Toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          <Button
            size="sm"
            onClick={() => setActiveMovementType('IN')}
            className="bg-tertiary text-on-tertiary hover:bg-tertiary-container h-8 px-3 rounded text-xs gap-1.5 shadow-xs font-semibold transition-all"
          >
            <ArrowDownLeft className="w-4 h-4" />
            <span>Stock In (Receiving)</span>
          </Button>

          <Button
            size="sm"
            onClick={() => setActiveMovementType('OUT')}
            className="bg-error text-on-error hover:opacity-90 h-8 px-3 rounded text-xs gap-1.5 shadow-xs font-semibold transition-all"
          >
            <ArrowUpRight className="w-4 h-4" />
            <span>Stock Out (Dispatch)</span>
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={handleExportCSV}
            className="h-8 px-3 text-xs gap-1.5 shadow-xs bg-surface-container-lowest hover:bg-surface-container font-medium"
          >
            <Download className="w-4 h-4 text-outline" />
            <span>Export CSV</span>
          </Button>
        </div>
      </div>

      {/* Top Quick Stats / KPI Summary Bar */}
      <div className="px-4 lg:px-6 py-2">
        <TransactionsKpiBar stats={stats} />
      </div>

      {/* Interactive Action & Execution Grid */}
      <div className="px-4 lg:px-6 py-2 grid grid-cols-1 xl:grid-cols-12 gap-4">
        {/* Left/Main: Record Stock Movement Interactive Card */}
        <div className="xl:col-span-8">
          <RecordMovementCard
            products={products}
            activeMovementType={activeMovementType}
            onTypeChange={setActiveMovementType}
            onRecordTransaction={handleRecordTransaction}
          />
        </div>

        {/* Right: Operational Scan HUD & Context Panel */}
        <div className="xl:col-span-4">
          <ScannerHudPanel />
        </div>
      </div>

      {/* Filter & Audit Toolbar */}
      <div className="px-4 lg:px-6 pt-4 pb-2">
        <TransactionsFilterToolbar
          searchQuery={searchQuery}
          onSearchChange={(q) => {
            setSearchQuery(q);
            setCurrentPage(1);
          }}
          typeFilter={typeFilter}
          onTypeFilterChange={(t) => {
            setTypeFilter(t);
            setCurrentPage(1);
          }}
          dateFilter={dateFilter}
          onDateFilterChange={(d) => {
            setDateFilter(d);
            setCurrentPage(1);
          }}
          staffFilter={staffFilter}
          onStaffFilterChange={(s) => {
            setStaffFilter(s);
            setCurrentPage(1);
          }}
          onResetFilters={handleResetFilters}
          totalFiltered={filteredTransactions.length}
          totalOverall={transactions.length}
        />
      </div>

      {/* Comprehensive Ledger Audit Table */}
      <div className="px-4 lg:px-6 py-2">
        <TransactionsTable
          transactions={paginatedTransactions}
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredTransactions.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}

