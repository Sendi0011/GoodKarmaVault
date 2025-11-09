"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

export function PerformanceChart() {
  const data = [
    { date: "Day 1", balance: 10000, yield: 0 },
    { date: "Day 5", balance: 10205, yield: 205 },
    { date: "Day 10", balance: 10420, yield: 420 },
    { date: "Day 15", balance: 10648, yield: 648 },
    { date: "Day 20", balance: 10889, yield: 889 },
    { date: "Day 25", balance: 11245, yield: 1245 },
    { date: "Day 30", balance: 11450, yield: 1450 },
  ]

  return (
    <Card className="border-border/50 bg-gradient-to-br from-card to-background overflow-hidden">
      <CardHeader>
        <CardTitle>Performance (30 Days)</CardTitle>
        <CardDescription>Your balance and yield growth over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="date" stroke="rgba(255,255,255,0.5)" />
            <YAxis stroke="rgba(255,255,255,0.5)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(10, 14, 39, 0.8)",
                border: "1px solid rgba(0, 217, 255, 0.3)",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "#f5f7fa" }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="balance"
              stroke="#00d9ff"
              strokeWidth={2}
              dot={{ fill: "#00d9ff", r: 4 }}
              name="Total Balance ($)"
            />
            <Line
              type="monotone"
              dataKey="yield"
              stroke="#ffd700"
              strokeWidth={2}
              dot={{ fill: "#ffd700", r: 4 }}
              name="Earned Yield ($)"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
