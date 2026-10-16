import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Wand2, ChevronDown, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { productCategories, productUnits } from '@/data/productsMock';

export function ProductFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  existingSkus = []
}) {
  const isEditing = Boolean(initialData);

  const [name, setName] = useState('');
  const [spec, setSpec] = useState('');
  const [sku, setSku] = useState('');
  const [category, setCategory] = useState('Mechanical');
  const [unit, setUnit] = useState('pcs');
  const [stock, setStock] = useState(100);
  const [minStock, setMinStock] = useState(20);
  const [zone, setZone] = useState('Z-04');
  const [aisle, setAisle] = useState('R-12');
  const [shelf, setShelf] = useState('S-01');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setSpec(initialData.spec || '');
      setSku(initialData.sku || '');
      setCategory(initialData.category || 'Mechanical');
      setUnit(initialData.unit || 'pcs');
      setStock(initialData.stock ?? 0);
      setMinStock(initialData.minStock ?? 10);
      setZone(initialData.zone || 'Z-01');
      setAisle(initialData.aisle || 'R-01');
      setShelf(initialData.shelf || 'S-01');
      setErrors({});
    } else {
      setName('Heavy-Duty Linear Rail 20mm');
      setSpec('Full descriptive specification title for warehouse pick lists.');
      setSku('LNR-RAL-2000');
      setCategory('Mechanical');
      setUnit('pcs');
      setStock(100);
      setMinStock(20);
      setZone('Z-04');
      setAisle('R-12');
      setShelf('S-01');
      setErrors({});
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleAutoSku = () => {
    const prefixes = ['LNR', 'MCH', 'ELE', 'FST', 'TLS', 'BRG', 'HYD'];
    const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    setSku(`${randomPrefix}-SKU-${randomNum}`);
    if (errors.sku) {
      setErrors((prev) => ({ ...prev, sku: null }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!name.trim()) errs.name = 'Product name is required';
    if (!sku.trim()) errs.sku = 'SKU identifier is required';
    else {
      // Check duplicate SKU if new product or changed SKU
      const normalizedSku = sku.trim().toUpperCase();
      const isDuplicate = existingSkus.some(
        (s) => s.toUpperCase() === normalizedSku && (!isEditing || s.toUpperCase() !== initialData?.sku?.toUpperCase())
      );
      if (isDuplicate) errs.sku = 'SKU is already in use by another product';
    }
    if (stock < 0) errs.stock = 'Stock level cannot be negative';
    if (minStock < 1) errs.minStock = 'Minimum alert level must be at least 1';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Determine status
    let status = 'In Stock';
    if (Number(stock) === 0) status = 'Out of Stock';
    else if (Number(stock) <= Number(minStock) / 2) status = 'Critical Low';
    else if (Number(stock) <= Number(minStock)) status = 'Low Stock';

    onSubmit({
      id: initialData?.id || `prod-${Date.now()}`,
      name: name.trim(),
      spec: spec.trim(),
      sku: sku.trim().toUpperCase(),
      category,
      unit,
      stock: Number(stock),
      minStock: Number(minStock),
      updated: 'Just now',
      status,
      zone: zone.trim().toUpperCase(),
      aisle: aisle.trim().toUpperCase(),
      shelf: shelf.trim().toUpperCase()
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/40 backdrop-blur-sm transition-opacity duration-200">
      <div className="bg-surface-container-lowest rounded-xl shadow-xl border border-outline-variant/40 w-full max-w-xl max-h-[90vh] overflow-y-auto flex flex-col relative animate-in fade-in zoom-in-95">
        {/* Modal Header */}
        <div className="px-6 pt-5 pb-3 flex items-start justify-between border-b border-outline-variant/20">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-primary" />
              <h2 className="text-lg text-on-surface font-semibold">
                {isEditing ? 'Edit Product SKU' : 'Add New Product'}
              </h2>
            </div>
            <p className="text-xs text-on-surface-variant mt-0.5">
              {isEditing
                ? 'Update product details and stock threshold margins.'
                : 'Create a new inventory SKU and configure stock thresholds.'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-surface-container text-outline hover:text-on-surface transition-colors"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
          {/* Field 1: Product Name */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-on-surface flex items-center justify-between">
              <span>
                Product Name <span className="text-error">*</span>
              </span>
              {name.trim() && !errors.name && (
                <span className="text-[11px] text-tertiary flex items-center gap-1 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Validated
                </span>
              )}
            </label>
            <Input
              type="text"
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors((prev) => ({ ...prev, name: null }));
              }}
              placeholder="e.g. Heavy-Duty Linear Rail 20mm"
              className="w-full px-3 py-1.5 bg-surface-container-low rounded text-xs text-on-surface"
            />
            {errors.name ? (
              <span className="text-[11px] text-error flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.name}
              </span>
            ) : (
              <span className="text-[11px] text-outline block">
                Full descriptive specification title for warehouse pick lists.
              </span>
            )}
          </div>

          {/* Specification / Description */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-on-surface">
              Technical Specification / Notes
            </label>
            <Input
              type="text"
              value={spec}
              onChange={(e) => setSpec(e.target.value)}
              placeholder="e.g. ABEC-7 deep groove steel shield"
              className="w-full px-3 py-1.5 bg-surface-container-low rounded text-xs text-on-surface"
            />
          </div>

          {/* Field 2: SKU Code with Auto-generate */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-on-surface">
                SKU Identifier <span className="text-error">*</span>
              </label>
              <button
                type="button"
                onClick={handleAutoSku}
                className="text-[11px] text-primary hover:underline flex items-center gap-1 font-semibold"
              >
                <Wand2 className="w-3.5 h-3.5" /> Auto-generate SKU
              </button>
            </div>
            <div className="relative">
              <Input
                type="text"
                required
                value={sku}
                onChange={(e) => {
                  setSku(e.target.value);
                  if (errors.sku) setErrors((prev) => ({ ...prev, sku: null }));
                }}
                className="w-full pl-3 pr-10 py-1.5 font-mono text-xs bg-surface-container-low rounded text-on-surface uppercase"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-tertiary">
                <CheckCircle2 className="w-4 h-4" />
              </span>
            </div>
            <div className="flex items-center justify-between font-mono text-[11px]">
              <span className="text-outline">Format: [AAA-BBB-0000]</span>
              {errors.sku ? (
                <span className="text-error font-medium">{errors.sku}</span>
              ) : (
                <span className="text-secondary font-medium">SKU Available</span>
              )}
            </div>
          </div>

          {/* Two Columns: Category & Measurement Unit */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-on-surface">
                Category <span className="text-error">*</span>
              </label>
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full appearance-none pl-3 pr-8 py-1.5 bg-surface-container-low border border-outline-variant/60 rounded text-xs text-on-surface focus:outline-none focus:bg-surface-container-lowest"
                >
                  {productCategories
                    .filter((c) => c.value !== 'all')
                    .map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-outline w-3.5 h-3.5" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-on-surface">
                Unit of Measurement <span className="text-error">*</span>
              </label>
              <div className="relative">
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="w-full appearance-none pl-3 pr-8 py-1.5 bg-surface-container-low border border-outline-variant/60 rounded text-xs text-on-surface focus:outline-none focus:bg-surface-container-lowest"
                >
                  {productUnits.map((u) => (
                    <option key={u.value} value={u.value}>
                      {u.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-outline w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Two Columns: Initial Stock & Minimum Alert Threshold */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-on-surface">
                Current Stock Level
              </label>
              <Input
                type="number"
                min="0"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="w-full px-3 py-1.5 font-mono text-xs bg-surface-container-low rounded text-on-surface"
              />
              {errors.stock ? (
                <span className="text-[11px] text-error">{errors.stock}</span>
              ) : (
                <span className="text-[11px] text-outline block">
                  Physical units currently in warehouse
                </span>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-on-surface">
                Minimum Alert Level <span className="text-error">*</span>
              </label>
              <Input
                type="number"
                min="1"
                value={minStock}
                onChange={(e) => setMinStock(e.target.value)}
                className="w-full px-3 py-1.5 font-mono text-xs bg-surface-container-low rounded text-on-surface"
              />
              {errors.minStock ? (
                <span className="text-[11px] text-error">{errors.minStock}</span>
              ) : (
                <span className="text-[11px] text-outline block">
                  Triggers automatic low-stock warning
                </span>
              )}
            </div>
          </div>

          {/* Optional Warehouse Bin Locator */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-on-surface">
              Bin / Bay Allocation (Optional)
            </label>
            <div className="grid grid-cols-3 gap-2 font-mono text-xs">
              <Input
                type="text"
                placeholder="Zone (e.g. Z-04)"
                value={zone}
                onChange={(e) => setZone(e.target.value)}
                className="px-3 py-1 bg-surface-container-low rounded text-on-surface uppercase text-center"
              />
              <Input
                type="text"
                placeholder="Aisle (e.g. R-12)"
                value={aisle}
                onChange={(e) => setAisle(e.target.value)}
                className="px-3 py-1 bg-surface-container-low rounded text-on-surface uppercase text-center"
              />
              <Input
                type="text"
                placeholder="Shelf (e.g. S-01)"
                value={shelf}
                onChange={(e) => setShelf(e.target.value)}
                className="px-3 py-1 bg-surface-container-low rounded text-on-surface uppercase text-center"
              />
            </div>
          </div>

          {/* Modal Footer */}
          <div className="pt-4 border-t border-outline-variant/20 flex items-center justify-between">
            <span className="text-[11px] text-outline">
              All fields marked with <span className="text-error">*</span> are required
            </span>
            <div className="flex items-center gap-2">
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
                type="submit"
                size="sm"
                className="bg-primary text-on-primary hover:bg-primary-container text-xs font-semibold"
              >
                {isEditing ? 'Save Changes' : 'Create Product'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

