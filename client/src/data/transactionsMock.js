export const warehouseProducts = [
  {
    id: "brg",
    name: "Precision Ball Bearing 608RS",
    sku: "BRG-608-RS",
    currentStock: 4,
    unit: "pcs",
    minStock: 25,
    bayLocation: "BAY-03-RACK-B"
  },
  {
    id: "lnr",
    name: "Linear Shaft 12mm x 500mm",
    sku: "LNR-SFT-1250",
    currentStock: 55,
    unit: "pcs",
    minStock: 30,
    bayLocation: "BAY-02-RACK-A"
  },
  {
    id: "mtr",
    name: "Stepper Motor NEMA 17",
    sku: "MTR-NEM-1748",
    currentStock: 82,
    unit: "pcs",
    minStock: 40,
    bayLocation: "BAY-01-RACK-D"
  },
  {
    id: "pwr",
    name: "Power Supply 24V 15A",
    sku: "PWR-24V-15A",
    currentStock: 30,
    unit: "units",
    minStock: 15,
    bayLocation: "BAY-04-RACK-C"
  },
  {
    id: "wsh",
    name: "Stainless Washer M6",
    sku: "WSH-SS-M06",
    currentStock: 1050,
    unit: "pcs",
    minStock: 200,
    bayLocation: "BAY-05-BIN-12"
  },
  {
    id: "hyd",
    name: "Hydraulic Fluid ISO VG 46",
    sku: "OIL-HYD-VG46",
    currentStock: 0,
    unit: "cans",
    minStock: 10,
    bayLocation: "BAY-06-DRUM-1"
  },
  {
    id: "clp",
    name: "Digital Caliper 150mm",
    sku: "TLS-CAL-150S",
    currentStock: 35,
    unit: "units",
    minStock: 10,
    bayLocation: "BAY-07-CAB-02"
  }
];

export const initialTransactions = [
  {
    id: "TX-2024-9842",
    date: "Oct 31, 2024",
    time: "14:22:10",
    productId: "lnr",
    productName: "Linear Shaft 12mm x 500mm",
    sku: "LNR-SFT-1250",
    type: "IN",
    quantity: 40,
    unit: "pcs",
    prevStock: 15,
    newStock: 55,
    operator: {
      name: "Elena Vance",
      initials: "EV",
      color: "bg-primary-fixed text-on-primary-fixed"
    },
    note: "PO-88319 Inbound receipt - Dock A",
    iconType: "shipping",
    status: "Completed",
    statusCode: "completed"
  },
  {
    id: "TX-2024-9841",
    date: "Oct 31, 2024",
    time: "13:05:45",
    productId: "mtr",
    productName: "Stepper Motor NEMA 17",
    sku: "MTR-NEM-1748",
    type: "OUT",
    quantity: 12,
    unit: "pcs",
    prevStock: 94,
    newStock: 82,
    operator: {
      name: "Marcus Chen",
      initials: "MC",
      color: "bg-secondary-fixed text-on-secondary-fixed"
    },
    note: "WO-402 Assembly Floor 2 dispatch",
    iconType: "factory",
    status: "Completed",
    statusCode: "completed"
  },
  {
    id: "TX-2024-9840",
    date: "Oct 31, 2024",
    time: "11:40:02",
    productId: "pwr",
    productName: "Power Supply 24V 15A",
    sku: "PWR-24V-15A",
    type: "IN",
    quantity: 25,
    unit: "units",
    prevStock: 5,
    newStock: 30,
    operator: {
      name: "Sarah Connor",
      initials: "SC",
      color: "bg-secondary-fixed text-on-secondary-fixed"
    },
    note: "PO-88290 Inbound replenishment",
    iconType: "shipping",
    status: "Completed",
    statusCode: "completed"
  },
  {
    id: "TX-2024-9839",
    date: "Oct 31, 2024",
    time: "09:15:33",
    productId: "wsh",
    productName: "Stainless Washer M6",
    sku: "WSH-SS-M06",
    type: "OUT",
    quantity: 150,
    unit: "pcs",
    prevStock: 1200,
    newStock: 1050,
    operator: {
      name: "David Miller",
      initials: "DM",
      color: "bg-secondary-fixed text-on-secondary-fixed"
    },
    note: "Standard work pack consumption",
    iconType: "assignment",
    status: "Completed",
    statusCode: "completed"
  },
  {
    id: "TX-2024-9838",
    date: "Oct 30, 2024",
    time: "16:50:18",
    productId: "brg",
    productName: "Precision Ball Bearing 608RS",
    sku: "BRG-608-RS",
    type: "OUT",
    quantity: 20,
    unit: "pcs",
    prevStock: 24,
    newStock: 4,
    operator: {
      name: "Marcus Chen",
      initials: "MC",
      color: "bg-secondary-fixed text-on-secondary-fixed"
    },
    note: "Batch production job #902",
    iconType: "manufacturing",
    status: "Low Stock Alert",
    statusCode: "low_stock"
  },
  {
    id: "TX-2024-9837",
    date: "Oct 30, 2024",
    time: "10:12:00",
    productId: "hyd",
    productName: "Hydraulic Fluid ISO VG 46",
    sku: "OIL-HYD-VG46",
    type: "OUT",
    quantity: 8,
    unit: "cans",
    prevStock: 8,
    newStock: 0,
    operator: {
      name: "Elena Vance",
      initials: "EV",
      color: "bg-primary-fixed text-on-primary-fixed"
    },
    note: "Maintenance scheduled flush",
    iconType: "wrench",
    status: "Out of Stock",
    statusCode: "out_of_stock"
  },
  {
    id: "TX-2024-9836",
    date: "Oct 29, 2024",
    time: "15:30:22",
    productId: "clp",
    productName: "Digital Caliper 150mm",
    sku: "TLS-CAL-150S",
    type: "ADJUSTMENT",
    quantity: 5,
    unit: "units",
    prevStock: 30,
    newStock: 35,
    operator: {
      name: "Elena Vance",
      initials: "EV",
      color: "bg-primary-fixed text-on-primary-fixed"
    },
    note: "Cycle count reconciliation",
    iconType: "inventory",
    status: "Reconciled",
    statusCode: "reconciled"
  }
];

export const initialStats = {
  inboundUnitsToday: 342,
  inboundReceiptsToday: 12,
  inboundPacing: "+18.4% vs ystd",
  inboundProgress: 72,

  outboundUnitsToday: 188,
  outboundDispatchesToday: 19,
  outboundPacing: "Normal pacing",
  outboundProgress: 48,

  pendingOrders: 4,
  pendingNote: "Dock 2 • Next wave in 24m",

  ledgerCycle30d: 892,
  auditHash: "ed70...4a19"
};

