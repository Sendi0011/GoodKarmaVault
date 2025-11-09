"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export function YieldChart() {
  const data = [
    { day: "Mon", yield: 35 },
    { day: "Tue", yield: 42 },
    { day: "Wed", yield: 38 },
    { day: "Thu", yield: 45 },
    { day: "Fri", yield: 52 },
    { day: "Sat", yield: 48 },
    { day: "Sun", yield: 55 },
  ]

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data} className="animate-fade-in">
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
        <XAxis dataKey="day" stroke="rgba(255,255,255,0.5)" />
        <YAxis stroke="rgba(255,255,255,0.5)" />
        <Tooltip
          contentStyle={{
            backgroundColor: "rgba(10, 14, 39, 0.9)",
            border: "2px solid rgba(0, 217, 255, 0.3)",
            borderRadius: "8px",
            boxShadow: "0 8px 32px rgba(0, 217, 255, 0.2)",
          }}
          labelStyle={{ color: "#f5f7fa", fontWeight: "bold" }}
          cursor={{ fill: "rgba(0, 217, 255, 0.1)" }}
        />
        <Bar
          dataKey="yield"
          fill="#00d9ff"
          name="Daily Yield ($)"
          radius={[8, 8, 0, 0]}
          animationDuration={800}
          className="hover-glow"
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
