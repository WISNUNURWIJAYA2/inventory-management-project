export const initialProducts = [
  {
    id: "prod-1",
    name: "Precision Ball Bearing 608RS",
    spec: "ABEC-7 deep groove steel shield",
    sku: "BRG-608-RS",
    category: "Mechanical",
    stock: 4,
    minStock: 25,
    unit: "pcs",
    updated: "12 mins ago",
    status: "Critical Low",
    zone: "Z-04",
    aisle: "R-12",
    shelf: "S-01"
  },
  {
    id: "prod-2",
    name: "Stepper Motor NEMA 17 48mm",
    spec: "1.8 deg, 2A bipolar 4-wire",
    sku: "MTR-NEM-1748",
    category: "Electronics",
    stock: 82,
    minStock: 15,
    unit: "pcs",
    updated: "1 hour ago",
    status: "In Stock",
    zone: "Z-02",
    aisle: "R-08",
    shelf: "S-04"
  },
  {
    id: "prod-3",
    name: "Hydraulic Fluid ISO VG 46 (20L)",
    spec: "Anti-wear zinc formulation",
    sku: "FLD-HYD-4620",
    category: "Fluids",
    stock: 0,
    minStock: 8,
    unit: "cans",
    updated: "Yesterday",
    status: "Out of Stock",
    zone: "Z-06",
    aisle: "D-01",
    shelf: "S-00"
  },
  {
    id: "prod-4",
    name: "Hex Flange Bolt M8x25 Zinc",
    spec: "Grade 8.8 DIN 6921",
    sku: "BLT-HEX-0825",
    category: "Fasteners",
    stock: 18,
    minStock: 50,
    unit: "boxes",
    updated: "2 hours ago",
    status: "Low Stock",
    zone: "Z-05",
    aisle: "B-12",
    shelf: "S-03"
  },
  {
    id: "prod-5",
    name: "Digital Caliper 150mm Stainless",
    spec: "Resolution 0.01mm LCD screen",
    sku: "TLS-CAL-150S",
    category: "Tools",
    stock: 35,
    minStock: 5,
    unit: "units",
    updated: "Oct 28, 2024",
    status: "In Stock",
    zone: "Z-07",
    aisle: "C-02",
    shelf: "S-02"
  },
  {
    id: "prod-6",
    name: "Thermal Paste Arctic MX-4 4g",
    spec: "Carbon-based thermal compound",
    sku: "ELC-THM-MX4",
    category: "Electronics",
    stock: 0,
    minStock: 20,
    unit: "tubes",
    updated: "Oct 27, 2024",
    status: "Out of Stock",
    zone: "Z-02",
    aisle: "R-09",
    shelf: "S-01"
  },
  {
    id: "prod-7",
    name: "Timing Belt GT2 6mm Rubber (5m)",
    spec: "Fiberglass reinforced pitch 2mm",
    sku: "BEL-GT2-0605",
    category: "Mechanical",
    stock: 14,
    minStock: 10,
    unit: "rolls",
    updated: "Oct 26, 2024",
    status: "In Stock",
    zone: "Z-04",
    aisle: "R-15",
    shelf: "S-05"
  },
  {
    id: "prod-8",
    name: "Silicone O-Ring Seal Kit 419pcs",
    spec: "NBR industrial oil resistant metric",
    sku: "ORG-SL-KIT",
    category: "Mechanical",
    stock: 2,
    minStock: 12,
    unit: "kits",
    updated: "3 hours ago",
    status: "Critical Low",
    zone: "Z-04",
    aisle: "R-14",
    shelf: "S-02"
  }
];

export const productCategories = [
  { value: "all", label: "All Categories" },
  { value: "Mechanical", label: "Mechanical" },
  { value: "Electronics", label: "Electronics" },
  { value: "Fluids", label: "Fluids" },
  { value: "Fasteners", label: "Fasteners" },
  { value: "Tools", label: "Tools" }
];

export const productUnits = [
  { value: "pcs", label: "pcs (Individual items)" },
  { value: "boxes", label: "boxes (Package box)" },
  { value: "cans", label: "cans (Fluid container)" },
  { value: "meters", label: "meters (Linear length)" },
  { value: "kits", label: "kits (Pre-packaged assembly)" },
  { value: "tubes", label: "tubes (Chemical paste tube)" },
  { value: "rolls", label: "rolls (Continuous spool)" },
  { value: "units", label: "units (Standard piece)" }
];

