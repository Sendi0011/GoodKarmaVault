"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function ImpactAllocationForm() {
  const [allocation, setAllocation] = useState({
    environment: 40,
    education: 35,
    health: 15,
    dev: 10,
  })

  const total = Object.values(allocation).reduce((a, b) => a + b, 0)

  const handleChange = (category: string, value: number) => {
    setAllocation((prev) => ({
      ...prev,
      [category]: Math.max(0, Math.min(100, value)),
    }))
  }

  const handleSubmit = () => {
    console.log("[v0] Impact allocation submitted:", allocation)
  }

  return (
    <Card className="border-border/50 bg-gradient-to-br from-card to-background sticky top-24">
      <CardHeader>
        <CardTitle>Your Allocation</CardTitle>
        <CardDescription>Set your custom impact split</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {Object.entries(allocation).map(([category, percentage]) => (
          <div key={category} className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold capitalize">{category}</label>
              <span className="text-lg font-bold text-primary">{percentage}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={percentage}
              onChange={(e) => handleChange(category, Number.parseInt(e.target.value))}
              className="w-full h-2 bg-background rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>
        ))}

        <div className="pt-4 border-t border-border/30">
          <div className="flex items-center justify-between">
            <span className="font-semibold">Total</span>
            <span className={`text-lg font-bold ${total === 100 ? "text-accent" : "text-destructive"}`}>{total}%</span>
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={total !== 100}
          className="w-full py-6 font-bold text-base rounded-lg transition-all"
        >
          {total === 100 ? "Save Allocation" : "Adjust to 100%"}
        </Button>

        <div className="p-3 rounded-lg bg-primary/10 border border-primary/30">
          <p className="text-xs text-foreground/70">
            Your yield will be automatically allocated to your chosen causes based on this distribution.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
