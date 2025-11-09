"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Globe, Users, DollarSign, TrendingUp } from "lucide-react"

export function GlobalImpactStats() {
  const stats = [
    {
      label: "Global Yield Allocated",
      value: "$2.5M",
      icon: DollarSign,
      color: "text-primary",
    },
    {
      label: "Lives Touched",
      value: "50K+",
      icon: Users,
      color: "text-accent",
    },
    {
      label: "CO2 Offset (tons)",
      value: "5K+",
      icon: Globe,
      color: "text-secondary",
    },
    {
      label: "Projects Active",
      value: "69",
      icon: TrendingUp,
      color: "text-accent",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, idx) => {
        const Icon = stat.icon
        return (
          <Card key={idx} className="border-border/50 bg-gradient-to-br from-card to-background overflow-hidden">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground/60 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <Icon className={`${stat.color} opacity-50`} size={32} />
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
