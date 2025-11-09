"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Leaf, BookOpen } from "lucide-react"

export function ImpactHistory() {
  const impacts = [
    {
      date: "Nov 15, 2024",
      category: "Environment",
      amount: "$450.00",
      icon: Leaf,
      color: "text-green-500",
      description: "Contributed to solar panel installation in rural areas",
    },
    {
      date: "Nov 8, 2024",
      category: "Education",
      amount: "$320.00",
      icon: BookOpen,
      color: "text-blue-500",
      description: "Supported scholarship programs for underserved students",
    },
    {
      date: "Oct 28, 2024",
      category: "Global Health",
      amount: "$280.00",
      icon: Heart,
      color: "text-red-500",
      description: "Funded medical supplies for remote communities",
    },
  ]

  return (
    <Card className="border-border/50 bg-gradient-to-br from-card to-background">
      <CardHeader>
        <CardTitle>Impact History</CardTitle>
        <CardDescription>Recent allocation and donation records</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {impacts.map((impact, idx) => {
            const Icon = impact.icon
            return (
              <div key={idx} className="flex items-start gap-4 pb-4 border-b border-border/30 last:border-0 last:pb-0">
                <div className="mt-1">
                  <Icon className={`${impact.color}`} size={24} />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <p className="font-semibold text-foreground">{impact.category}</p>
                      <p className="text-sm text-foreground/60 mt-1">{impact.description}</p>
                    </div>
                    <span className="text-lg font-bold text-accent">{impact.amount}</span>
                  </div>
                  <p className="text-xs text-foreground/40">{impact.date}</p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
