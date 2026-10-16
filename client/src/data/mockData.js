export const currentUser = {
  name: "Elena Vance",
  role: "Operations Lead",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80",
  warehouse: "Main Warehouse - Branch #01"
};

// inventory overview
export const kpiMetrics = [
  {
    id: "total-products",
    title: "Total Products",
    value: "1,428",
    subtitle: "42 active categories",
    badgeText: "+18 this mo",
    badgeType: "tertiary",
    iconName: "Package",
    borderColor: "bg-primary-container",
    iconBg: "bg-surface-container-low",
    iconColor: "text-primary",
  },
  {
    id: "low-stock",
    title: "Low Stock Items",
    value: "24",
    subtitle: "Needs reorder ≤ 7 days",
    badgeText: "Attention req.",
    badgeType: "secondary",
    iconName: "AlertTriangle",
    borderColor: "bg-secondary",
    iconBg: "bg-secondary-container/50",
    iconColor: "text-secondary",
  },
  {
    id: "out-of-stock",
    title: "Out of Stock",
    value: "6",
    subtitle: "0 units in rack inventory",
    badgeText: "-2 vs last wk",
    badgeType: "destructive",
    iconName: "XCircle",
    borderColor: "bg-error",
    iconBg: "bg-error-container/40",
    iconColor: "text-error",
    valueColor: "text-error"
  },
  {
    id: "stock-movements",
    title: "Stock Movements",
    value: "892",
    subtitle: "542 In / 350 Out",
    badgeText: "98.4% fill rate",
    badgeType: "neutral",
    iconName: "ArrowLeftRight",
    borderColor: "bg-tertiary",
    iconBg: "bg-tertiary-fixed/30",
    iconColor: "text-tertiary",
  }
];

export const liveHudData = {
  barcode: "SCAN_OCT24_#9021",
  matchedProduct: 'Linear Shaft 12mm',
  bayLocation: "Bay B-04",
  status: "Scanner Sync Ready",
  shortcut: "Ctrl + B to force scan"
};

export const chartSummary = {
  stockInTotal: "12,450",
  stockOutTotal: "9,820",
  netDelta: "+2,630",
  netDeltaPercentage: "↑ 26.7%",
  callout: "Stock inbound velocity surpassed outbound pace by 21.4% during peak mid-month delivery windows."
};

export const chartBars = [
  { date: "Oct 02", inbound: 120, outbound: 85, balanceY: 88, inY: 70, outY: 105 },
  { date: "Oct 06", inbound: 135, outbound: 100, balanceY: 72, inY: 55, outY: 90 },
  { date: "Oct 10", inbound: 90, outbound: 130, balanceY: 80, inY: 100, outY: 60 },
  { date: "Oct 14", inbound: 152, outbound: 110, balanceY: 59, inY: 38, outY: 80 },
  { date: "Oct 18", inbound: 100, outbound: 65, balanceY: 107, inY: 90, outY: 125 },
  { date: "Oct 22", inbound: 145, outbound: 120, balanceY: 58, inY: 45, outY: 70 },
  { date: "Oct 25", inbound: 70, outbound: 105, balanceY: 102, inY: 120, outY: 85 },
  { date: "Oct 28", inbound: 130, outbound: 95, balanceY: 78, inY: 60, outY: 95 },
  { date: "Oct 30", inbound: 160, outbound: 125, balanceY: 47, inY: 30, outY: 65, active: true },
  { date: "Oct 31", inbound: 115, outbound: 80, balanceY: 92, inY: 75, outY: 110 }
];

export const criticalAlerts = [
  {
    id: 1,
    name: "Hydraulic Fluid ISO 46",
    left: 0,
    unit: "gal",
    minReq: 10,
    isImmediate: true
  },
  {
    id: 2,
    name: "Industrial Bearing 6205",
    left: 2,
    unit: "pcs",
    minReq: 15,
    isImmediate: false
  },
  {
    id: 3,
    name: "Micro Limit Switch V-15",
    left: 5,
    unit: "pcs",
    minReq: 25,
    isImmediate: false
  }
];

export const lowStockProducts = [
  {
    id: 1,
    name: "Precision Ball Bearing 608RS",
    sku: "BRG-608-RS",
    stock: 4,
    minStock: 25,
    status: "Critical Low",
    isCritical: true
  },
  {
    id: 2,
    name: "Hex Flange Bolt M8x25",
    sku: "BLT-HEX-0825",
    stock: 18,
    minStock: 50,
    status: "Low Stock",
    isCritical: false
  },
  {
    id: 3,
    name: "Silicone O-Ring Seal Kit",
    sku: "ORG-SL-KIT",
    stock: 2,
    minStock: 12,
    status: "Critical Low",
    isCritical: true
  },
  {
    id: 4,
    name: "LED Indicator Lamp 24V",
    sku: "ELC-LED-024",
    stock: 7,
    minStock: 20,
    status: "Low Stock",
    isCritical: false
  }
];

export const recentTransactions = [
  {
    id: 1,
    time: "Today, 14:22",
    product: "Linear Shaft 12mm x 500mm",
    type: "IN",
    quantity: "+40",
    user: "Elena Vance"
  },
  {
    id: 2,
    time: "Today, 13:05",
    product: "Stepper Motor NEMA 17",
    type: "OUT",
    quantity: "-12",
    user: "Marcus Chen"
  },
  {
    id: 3,
    time: "Today, 11:40",
    product: "Power Supply 24V 15A",
    type: "IN",
    quantity: "+25",
    user: "Sarah Connor"
  },
  {
    id: 4,
    time: "Today, 09:15",
    product: "Stainless Washer M6",
    type: "OUT",
    quantity: "-150",
    user: "David Miller"
  }
];

