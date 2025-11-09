"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

export function ImpactAllocation() {
  const allocationData = [
    { name: "Environment", value: 40, color: "#22c55e" },
    { name: "Education", value: 35, color: "#3b82f6" },
    { name: "Dev Tools", value: 25, color: "#a855f7" },
  ]

  return (
    <Card className="border-border/50 bg-gradient-to-br from-card to-background">
      <CardHeader>
        <CardTitle>Impact Distribution</CardTitle>
        <CardDescription>Your yield allocation</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={allocationData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {allocationData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(10, 14, 39, 0.8)",
                border: "1px solid rgba(0, 217, 255, 0.3)",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "#f5f7fa" }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="mt-4 space-y-2">
          {allocationData.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm text-foreground/70">{item.name}</span>
              </div>
              <span className="text-sm font-semibold">{item.value}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
