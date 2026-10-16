import React, { useState, useEffect } from 'react';
import {
  ArrowLeftRight,
  Calculator,
  ArrowRight,
  AlertCircle,
  Receipt,
  RotateCcw,
  Check,
  Loader2,
  Wrench,
  ChevronDown,
  UserCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function RecordMovementCard({
  products,
  onRecordTransaction,
  activeMovementType = 'IN',
  onTypeChange
}) {
  const [selectedProductId, setSelectedProductId] = useState(products[0]?.id || 'brg');
  const [quantity, setQuantity] = useState(50);
  const [note, setNote] = useState('PO-99412 Delivery from Acme Bearing Supplier - Bay C4');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [syncStatus, setSyncStatus] = useState('READY');

  const selectedProduct = products.find((p) => p.id === selectedProductId) || products[0];
  const currentStock = selectedProduct ? selectedProduct.currentStock : 0;
  const unit = selectedProduct ? selectedProduct.unit : 'pcs';

  const numQty = parseInt(quantity, 10) || 0;
  const isStockIn = activeMovementType === 'IN';
  const afterStock = isStockIn ? currentStock + numQty : currentStock - numQty;
  const isNegativeStock = !isStockIn && afterStock < 0;
  const isInvalidQty = numQty <= 0;

  // Update default notes when movement type changes
  useEffect(() => {
    if (activeMovementType === 'IN') {
      setNote('PO-99412 Delivery from Acme Bearing Supplier - Bay C4');
    } else {
      setNote('WO-402 Assembly Floor 2 dispatch');
    }
  }, [activeMovementType]);

  const handleReset = () => {
    setQuantity(10);
    setNote(isStockIn ? 'Standard inbound intake receipt' : 'Internal warehouse dispatch');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isInvalidQty || isNegativeStock || isSubmitting) return;

    setIsSubmitting(true);
    setSyncStatus('TRANSACTING');

    setTimeout(() => {
      onRecordTransaction({
        productId: selectedProduct.id,
        productName: selectedProduct.name,
        sku: selectedProduct.sku,
        type: activeMovementType,
        quantity: numQty,
        unit: selectedProduct.unit,
        prevStock: currentStock,
        newStock: afterStock,
        note: note.trim() || (isStockIn ? 'Inbound receipt' : 'Outbound dispatch'),
      });

      setIsSubmitting(false);
      setSyncStatus('COMMITTED');

      setTimeout(() => {
        setSyncStatus('READY');
      }, 2000);
    }, 700);
  };

  return (
    <div className="bg-surface-container-lowest rounded-lg shadow-xs border border-outline-variant/30 p-5 flex flex-col justify-between">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Header and Movement Type Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-outline-variant/20">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-primary-fixed rounded text-on-primary-fixed">
              <ArrowLeftRight className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-[15px] text-on-surface font-semibold">
                Record Stock Movement
              </h2>
              <span className="text-xs text-on-surface-variant">
                Update item counts with instant ledger validation
              </span>
            </div>
          </div>

          {/* Movement Type Switcher Pills */}
          <div className="inline-flex p-0.5 rounded-lg bg-surface-container-low select-none">
            <button
              type="button"
              onClick={() => onTypeChange && onTypeChange('IN')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold transition-all ${
                isStockIn
                  ? 'bg-surface-container-lowest shadow-xs text-tertiary font-bold'
                  : 'text-on-surface-variant hover:text-on-surface font-medium'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  isStockIn ? 'bg-tertiary' : 'bg-outline'
                }`}
              />
              <span>Stock In (+ Receive)</span>
            </button>

            <button
              type="button"
              onClick={() => onTypeChange && onTypeChange('OUT')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold transition-all ${
                !isStockIn
                  ? 'bg-surface-container-lowest shadow-xs text-error font-bold'
                  : 'text-on-surface-variant hover:text-on-surface font-medium'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  !isStockIn ? 'bg-error' : 'bg-outline'
                }`}
              />
              <span>Stock Out (- Dispatch)</span>
            </button>
          </div>
        </div>

        {/* Form Inputs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-1">
          {/* Product Selector */}
          <div className="md:col-span-8 flex flex-col gap-1">
            <label className="text-[11px] text-on-surface-variant uppercase tracking-wider font-semibold">
              Product & SKU Selector
            </label>
            <div className="relative">
              <Wrench className="absolute left-2.5 top-2.5 text-outline w-4 h-4 pointer-events-none" />
              <select
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
                className="w-full pl-9 pr-8 py-2 bg-surface-container-low border border-outline-variant/60 rounded text-xs text-on-surface focus:outline-none focus:bg-surface-container-lowest focus:border-primary transition-colors cursor-pointer appearance-none font-medium"
              >
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.sku}) — Balance: {p.currentStock} {p.unit}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-2.5 text-outline w-4 h-4 pointer-events-none" />
            </div>
          </div>

          {/* Quantity Input */}
          <div className="md:col-span-4 flex flex-col gap-1">
            <label className="text-[11px] text-on-surface-variant uppercase tracking-wider font-semibold">
              Quantity to Adjust
            </label>
            <div className="relative">
              <Input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full px-3 py-2 bg-surface-container-low rounded font-mono text-base font-bold text-on-surface focus:bg-surface-container-lowest"
              />
              <span className="absolute right-3 top-2 text-[11px] font-medium text-outline">
                {unit}
              </span>
            </div>
          </div>

          {/* Live Stock Recalculation Bar */}
          <div className="md:col-span-12 bg-surface-container-low rounded-lg p-2.5 border border-outline-variant/30 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs flex-wrap">
              <Calculator className="w-4 h-4 text-primary shrink-0" />
              <span className="text-on-surface-variant font-medium">
                Live Stock Recalculation:
              </span>
              <span className="font-mono bg-surface-container-lowest px-2 py-0.5 rounded border border-outline-variant/40 text-on-surface">
                Current: <strong className="text-on-surface">{currentStock} {unit}</strong>
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-outline shrink-0" />
              <span
                className={`font-mono px-2 py-0.5 rounded font-bold ${
                  isNegativeStock
                    ? 'bg-error-container text-on-error-container'
                    : isStockIn
                    ? 'bg-tertiary-fixed text-on-tertiary-fixed'
                    : 'bg-primary-fixed text-on-primary-fixed'
                }`}
              >
                After Op: {afterStock} {unit}
              </span>
            </div>

            {/* Operator Tag */}
            <div className="flex items-center gap-1.5 text-[11px] text-on-surface-variant">
              <UserCheck className="w-3.5 h-3.5 text-tertiary" />
              <span>Operator:</span>
              <span className="font-semibold text-on-surface">Elena Vance (Lead)</span>
            </div>
          </div>

          {/* Validation Warning Alert (shown only if Stock Out quantity exceeds stock) */}
          {isNegativeStock && (
            <div className="md:col-span-12">
              <div className="bg-error-container/40 border border-error/20 p-2.5 rounded-lg flex items-start gap-2 text-on-error-container">
                <AlertCircle className="w-4 h-4 text-error mt-0.5 shrink-0" />
                <div className="flex flex-col text-xs">
                  <span className="font-semibold text-error">
                    Validation Rejection
                  </span>
                  <span className="text-on-surface-variant">
                    Requested Stock-Out quantity ({numQty} {unit}) exceeds available warehouse balance ({currentStock} {unit}). Cannot dispatch negative inventory.
                  </span>
                </div>
              </div>
            </div>
          )}

          {isInvalidQty && (
            <div className="md:col-span-12">
              <div className="bg-error-container/30 border border-error/20 p-2 rounded-lg flex items-center gap-2 text-on-error-container text-xs">
                <AlertCircle className="w-4 h-4 text-error shrink-0" />
                <span>Quantity must be greater than zero.</span>
              </div>
            </div>
          )}

          {/* Reference / Reason Note */}
          <div className="md:col-span-12 flex flex-col gap-1">
            <label className="text-[11px] text-on-surface-variant uppercase tracking-wider font-semibold">
              PO Reference, Work Order, or Audit Reason
            </label>
            <div className="relative">
              <Receipt className="absolute left-2.5 top-2.5 text-outline w-4 h-4 pointer-events-none" />
              <Input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="e.g. PO-88319 Inbound receipt - Dock A"
                className="w-full pl-9 pr-3 py-2 bg-surface-container-low rounded text-xs text-on-surface focus:bg-surface-container-lowest"
              />
            </div>
          </div>
        </div>

        {/* Footer Actions & Ledger Status */}
        <div className="pt-3 border-t border-outline-variant/20 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-outline font-mono text-[11px]">
            {syncStatus === 'TRANSACTING' ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin text-primary" />
                <span className="text-primary font-medium">Transacting cryptographic block...</span>
              </>
            ) : syncStatus === 'COMMITTED' ? (
              <>
                <Check className="w-3.5 h-3.5 text-tertiary" />
                <span className="text-tertiary font-medium">Ledger committed: VERIFIED</span>
              </>
            ) : (
              <>
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Ledger state: READY</span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="text-xs text-on-surface-variant hover:text-on-surface"
            >
              Reset
            </Button>

            <Button
              type="submit"
              disabled={isNegativeStock || isInvalidQty || isSubmitting}
              className={`h-9 px-5 rounded text-xs font-semibold gap-1.5 shadow-xs transition-all ${
                isStockIn
                  ? 'bg-tertiary hover:bg-tertiary-container text-on-tertiary'
                  : 'bg-error hover:opacity-90 text-on-error'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Recording...</span>
                </>
              ) : isNegativeStock ? (
                <span>Insufficient Stock (Balance: {currentStock})</span>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>
                    Confirm Stock {isStockIn ? 'In' : 'Out'} ({isStockIn ? '+' : '-'}{numQty} {unit})
                  </span>
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

