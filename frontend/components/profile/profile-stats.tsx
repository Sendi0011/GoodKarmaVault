"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, Target, DollarSign, Award } from "lucide-react"

export function ProfileStats() {
  const stats = [
    {
      title: "Total Deposited",
      value: "$25,450.00",
      change: "All time",
      icon: DollarSign,
      color: "text-primary",
    },
    {
      title: "Total Yield Earned",
      value: "$3,245.80",
      change: "+15.2% YTD",
      icon: Zap,
      color: "text-accent",
    },
    {
      title: "Impact Generated",
      value: "$2,850.00",
      change: "Lives touched: 150+",
      icon: Target,
      color: "text-secondary",
    },
    {
      title: "Vault Tier",
      value: "Gold",
      change: "$100K+ contributed",
      icon: Award,
      color: "text-accent",
    },
  ]

  return (
    <Card className="border-border/50 bg-gradient-to-br from-card to-background">
      <CardHeader>
        <CardTitle>Your Statistics</CardTitle>
        <CardDescription>Comprehensive overview of your activity</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon
            return (
              <div
                key={idx}
                className="p-4 rounded-lg bg-background/50 border border-border/30 hover:border-primary/50 transition-all group"
              >
                <div className="flex items-start justify-between mb-2">
                  <Icon className={`${stat.color} group-hover:scale-110 transition-transform`} size={24} />
                </div>
                <p className="text-sm text-foreground/60 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold mb-1">{stat.value}</p>
                <p className="text-xs text-foreground/50">{stat.change}</p>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
