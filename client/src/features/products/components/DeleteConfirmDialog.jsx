import React from 'react';
import { AlertTriangle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function DeleteConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  product
}) {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest rounded-xl shadow-xl border border-outline-variant/40 w-full max-w-md p-6 flex flex-col space-y-4 animate-in zoom-in-95">
        <div className="w-12 h-12 rounded-full bg-error-container/40 text-error flex items-center justify-center">
          <AlertTriangle className="w-6 h-6" />
        </div>

        <div>
          <h3 className="text-base text-on-surface font-semibold">
            Delete Product Confirmation
          </h3>
          <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">
            Are you sure you want to delete <span className="font-semibold text-on-surface">&ldquo;{product.name}&rdquo;</span>? This action cannot be undone and will permanently archive historical audit entries.
          </p>
        </div>

        <div className="p-2.5 rounded bg-surface-container-low font-mono text-[11px] text-error flex items-center gap-2 border border-outline-variant/30">
          <Info className="w-4 h-4 shrink-0" />
          <span>
            SKU {product.sku} has {product.stock} {product.unit} current stock.
          </span>
        </div>

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-outline-variant/20">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClose}
            className="text-xs font-normal"
          >
            Cancel
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={() => onConfirm(product.id)}
            className="bg-error text-on-error hover:bg-error/90 text-xs font-semibold shadow-xs"
          >
            Delete Permanently
          </Button>
        </div>
      </div>
    </div>
  );
}

