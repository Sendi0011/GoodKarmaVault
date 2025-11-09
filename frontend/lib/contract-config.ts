export const CONTRACT_CONFIG = {
  vault: {
    address: process.env.NEXT_PUBLIC_VAULT_ADDRESS || "0x",
    decimals: 18,
    symbol: "gkv",
  },
  allocation: {
    address: process.env.NEXT_PUBLIC_ALLOCATION_ADDRESS || "0x",
    decimals: 0,
    symbol: "ALLOC",
  },
  usdc: {
    address: process.env.NEXT_PUBLIC_USDC_ADDRESS || "0x",
    decimals: 6,
    symbol: "USDC",
  },
} as const

export const CATEGORIES = ["environment", "education", "health", "devTools"] as const
export type ImpactCategory = (typeof CATEGORIES)[number]

export const CATEGORY_CONFIG: Record<ImpactCategory, { name: string; color: string; icon: string }> = {
  environment: { name: "Environment", color: "#22c55e", icon: "Leaf" },
  education: { name: "Education", color: "#3b82f6", icon: "BookOpen" },
  health: { name: "Global Health", color: "#ef4444", icon: "Heart" },
  devTools: { name: "Dev Tools", color: "#a855f7", icon: "Code" },
}
