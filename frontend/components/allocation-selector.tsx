"use client"

import { useImpactAllocation } from "@/hooks/use-impact-allocation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function AllocationSelector() {
  const { profile, updateAllocation, isLoading, error } = useImpactAllocation()
  const [tempProfile, setTempProfile] = useState(profile)

  const total = Object.values(tempProfile).reduce((a, b) => a + b, 0)
  const isValid = total === 100

  const handleChange = (category: string, value: number) => {
    setTempProfile((prev) => ({
      ...prev,
      [category]: Math.max(0, Math.min(100, value)),
    }))
  }

  const handleSave = async () => {
    if (isValid) {
      await updateAllocation(tempProfile)
    }
  }

  return (
    <Card className="border-border/50 bg-gradient-to-br from-card to-background overflow-hidden hover-lift">
      <CardHeader>
        <CardTitle>Allocation Settings</CardTitle>
        <CardDescription>Customize your impact distribution</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {Object.entries(tempProfile).map(([category, percentage]) => (
          <div key={category} className="space-y-2 animate-fade-in transition-smooth">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold capitalize text-foreground/80">
                {category === "devTools" ? "Dev Tools" : category}
              </label>
              <span
                className={`text-lg font-bold transition-colors ${percentage > 0 ? "text-primary" : "text-foreground/40"}`}
              >
                {percentage}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={percentage}
              onChange={(e) => handleChange(category, Number.parseInt(e.target.value))}
              className="w-full h-2 bg-background rounded-lg appearance-none cursor-pointer accent-primary hover:accent-accent transition-smooth"
            />
            <div className="w-full bg-background rounded-full h-1 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        ))}

        {/* Total Status */}
        <div className="pt-4 border-t border-border/30 space-y-2 animate-bounce-in">
          <div className="flex items-center justify-between">
            <span className="font-semibold">Total</span>
            <span
              className={`text-lg font-bold transition-colors duration-300 ${
                isValid ? "text-accent" : "text-destructive"
              }`}
            >
              {total}%
            </span>
          </div>
          <div className="w-full bg-background rounded-full h-1 overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${isValid ? "bg-accent" : "bg-destructive"}`}
              style={{ width: `${Math.min(total, 100)}%` }}
            />
          </div>
        </div>

        {/* Save Button */}
        <Button
          onClick={handleSave}
          disabled={!isValid || isLoading}
          className="w-full py-6 font-bold rounded-lg transition-all duration-300"
        >
          {isLoading && <span className="animate-spin mr-2">⟳</span>}
          {isValid ? "Save Allocation" : "Must Total 100%"}
        </Button>

        {error && (
          <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30 animate-slide-in-up">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
