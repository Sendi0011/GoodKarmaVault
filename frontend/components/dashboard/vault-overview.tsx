"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, DollarSign, Target, Zap } from "lucide-react"

export function VaultOverview() {
  const stats = [
    {
      label: "Total Balance",
      value: "$12,450.50",
      change: "+12.5%",
      icon: DollarSign,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      label: "Total Yield (30d)",
      value: "$245.80",
      change: "+8.3%",
      icon: TrendingUp,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      label: "Current APY",
      value: "12.5%",
      change: "Stable",
      icon: Zap,
      color: "text-secondary",
      bgColor: "bg-secondary/20",
    },
    {
      label: "Impact Generated",
      value: "$1,245.00",
      change: "+31 lives touched",
      icon: Target,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
  ]

  return (
    <Card className="border-border/50 bg-gradient-to-br from-card to-background overflow-hidden">
      <CardHeader>
        <CardTitle>Vault Overview</CardTitle>
        <CardDescription>Your earning and impact statistics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon
            return (
              <div
                key={idx}
                className="p-6 rounded-lg bg-card/50 border border-border/30 hover:border-primary/50 transition-all duration-300 group space-y-4"
              >
                <div className="flex items-start justify-between">
                  <div className={`${stat.bgColor} p-3 rounded-lg group-hover:shadow-lg transition-all`}>
                    <Icon className={`${stat.color} transition-colors`} size={20} />
                  </div>
                  <span className="text-xs font-semibold text-accent">{stat.change}</span>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-foreground/60">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
