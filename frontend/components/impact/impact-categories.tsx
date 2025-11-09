"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Leaf, BookOpen, Heart, Code } from "lucide-react"
import { useState } from "react"

export function ImpactCategories() {
  const [selectedCategory, setSelectedCategory] = useState("environment")

  const categories = [
    {
      id: "environment",
      name: "Environment",
      description: "Climate action & clean energy initiatives",
      icon: Leaf,
      color: "from-green-500/20 to-green-600/10",
      borderColor: "border-green-500/30",
      projects: 24,
      allocated: "$150,000",
      impact: "5,000 tons CO2 offset",
    },
    {
      id: "education",
      name: "Education",
      description: "Global education and skill development",
      icon: BookOpen,
      color: "from-blue-500/20 to-blue-600/10",
      borderColor: "border-blue-500/30",
      projects: 18,
      allocated: "$120,000",
      impact: "3,500 students supported",
    },
    {
      id: "health",
      name: "Global Health",
      description: "Healthcare access and medical research",
      icon: Heart,
      color: "from-red-500/20 to-red-600/10",
      borderColor: "border-red-500/30",
      projects: 15,
      allocated: "$95,000",
      impact: "10,000 lives touched",
    },
    {
      id: "dev",
      name: "Dev Tools",
      description: "Web3 developer infrastructure",
      icon: Code,
      color: "from-purple-500/20 to-purple-600/10",
      borderColor: "border-purple-500/30",
      projects: 12,
      allocated: "$85,000",
      impact: "2,000 devs enabled",
    },
  ]

  return (
    <div className="space-y-4">
      {categories.map((category) => {
        const Icon = category.icon
        const isSelected = selectedCategory === category.id

        return (
          <Card
            key={category.id}
            className={`border-2 cursor-pointer transition-all duration-300 overflow-hidden ${
              isSelected
                ? `${category.borderColor} bg-gradient-to-br ${category.color}`
                : "border-border/50 hover:border-border"
            }`}
            onClick={() => setSelectedCategory(category.id)}
          >
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-background/50">
                  <Icon size={24} className="text-accent" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-bold">{category.name}</h3>
                      <p className="text-sm text-foreground/60">{category.description}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-border/20">
                    <div>
                      <p className="text-xs text-foreground/60">Active Projects</p>
                      <p className="font-semibold text-primary">{category.projects}</p>
                    </div>
                    <div>
                      <p className="text-xs text-foreground/60">Allocated</p>
                      <p className="font-semibold text-accent">{category.allocated}</p>
                    </div>
                    <div>
                      <p className="text-xs text-foreground/60">Impact</p>
                      <p className="font-semibold text-secondary">{category.impact}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
