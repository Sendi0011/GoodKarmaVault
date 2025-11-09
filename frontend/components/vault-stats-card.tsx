"use client"

import type { ReactNode } from "react"

interface VaultStatsCardProps {
  title: string
  value: string
  change: string
  icon: ReactNode
}

export function VaultStatsCard({ title, value, change, icon }: VaultStatsCardProps) {
  return (
    <div className="group bg-gradient-to-b from-card/80 to-background border border-border rounded-lg p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 cursor-pointer">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-foreground/60 text-sm mb-1">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
        </div>
        <div className="opacity-75 group-hover:opacity-100 transition-opacity">{icon}</div>
      </div>
      <p className="text-primary text-sm font-medium">{change}</p>
    </div>
  )
}
