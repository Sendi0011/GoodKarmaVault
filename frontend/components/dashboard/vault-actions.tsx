"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Minus } from "lucide-react"

export function VaultActions() {
  const [activeTab, setActiveTab] = useState<"deposit" | "withdraw">("deposit")

  const handleDeposit = () => {
    console.log("[v0] Deposit action triggered")
  }

  const handleWithdraw = () => {
    console.log("[v0] Withdraw action triggered")
  }

  return (
    <Card className="border-border/50 bg-gradient-to-br from-card to-background">
      <CardHeader>
        <CardTitle>Vault Actions</CardTitle>
        <CardDescription>Manage your vault balance</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Tab Selection */}
        <div className="flex gap-2 bg-background/50 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab("deposit")}
            className={`flex-1 px-4 py-2 rounded-md font-semibold transition-all ${
              activeTab === "deposit"
                ? "bg-primary text-background shadow-lg shadow-primary/50"
                : "text-foreground/60 hover:text-foreground"
            }`}
          >
            Deposit
          </button>
          <button
            onClick={() => setActiveTab("withdraw")}
            className={`flex-1 px-4 py-2 rounded-md font-semibold transition-all ${
              activeTab === "withdraw"
                ? "bg-accent text-background shadow-lg shadow-accent/50"
                : "text-foreground/60 hover:text-foreground"
            }`}
          >
            Withdraw
          </button>
        </div>

        {/* Action Form */}
        <div className="space-y-3">
          <div>
            <label className="text-sm font-semibold text-foreground/70 mb-2 block">Amount (USDC)</label>
            <input
              type="number"
              placeholder="0.00"
              className="w-full px-4 py-3 bg-background/50 border border-border rounded-lg text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <Button
            onClick={activeTab === "deposit" ? handleDeposit : handleWithdraw}
            className="w-full py-6 text-base font-bold rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            {activeTab === "deposit" ? (
              <>
                <Plus size={18} className="mr-2" />
                Deposit Now
              </>
            ) : (
              <>
                <Minus size={18} className="mr-2" />
                Withdraw
              </>
            )}
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2 pt-2">
          {[100, 500, 1000].map((amount) => (
            <button
              key={amount}
              className="flex-1 px-3 py-2 text-sm font-semibold bg-card/50 border border-border hover:border-primary/50 rounded-lg transition-all"
            >
              ${amount}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
