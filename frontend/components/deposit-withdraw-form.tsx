"use client"

import type React from "react"

import { useState } from "react"
import { useVault } from "@/hooks/use-vault"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Minus, AlertCircle } from "lucide-react"

export function DepositWithdrawForm() {
  const [activeTab, setActiveTab] = useState<"deposit" | "withdraw">("deposit")
  const [amount, setAmount] = useState("")
  const { deposit, withdraw, isLoading, error, balance } = useVault()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!amount) return

    if (activeTab === "deposit") {
      await deposit(amount)
    } else {
      await withdraw(amount)
    }
    setAmount("")
  }

  return (
    <Card className="border-border/50 bg-gradient-to-br from-card to-background overflow-hidden hover-lift">
      <CardHeader>
        <CardTitle>Manage Vault</CardTitle>
        <CardDescription>Deposit or withdraw from your vault</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Tab Selection */}
          <div className="flex gap-2 bg-background/50 p-1 rounded-lg transition-smooth">
            <button
              type="button"
              onClick={() => setActiveTab("deposit")}
              className={`flex-1 px-4 py-2 rounded-md font-semibold transition-all duration-300 ${
                activeTab === "deposit"
                  ? "bg-gradient-to-r from-primary to-accent text-background shadow-lg shadow-primary/50"
                  : "text-foreground/60 hover:text-foreground"
              }`}
            >
              Deposit
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("withdraw")}
              className={`flex-1 px-4 py-2 rounded-md font-semibold transition-all duration-300 ${
                activeTab === "withdraw"
                  ? "bg-gradient-to-r from-accent to-primary text-background shadow-lg shadow-accent/50"
                  : "text-foreground/60 hover:text-foreground"
              }`}
            >
              Withdraw
            </button>
          </div>

          {/* Amount Input */}
          <div className="space-y-2 animate-fade-in">
            <label className="text-sm font-semibold text-foreground/70">Amount (USDC)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              step="0.01"
              min="0"
              className="w-full px-4 py-3 bg-background/50 border border-border rounded-lg text-foreground placeholder:text-foreground/30 focus-ring transition-smooth"
            />
            <p className="text-xs text-foreground/50">Available: {balance} USDC</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30 flex items-center gap-2 animate-slide-in-up">
              <AlertCircle size={16} className="text-destructive" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading || !amount}
            className="w-full py-6 text-base font-bold rounded-lg transition-all duration-300 transform hover-scale disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading && <span className="animate-spin mr-2">⟳</span>}
            {activeTab === "deposit" ? (
              <>
                <Plus size={18} className="mr-2" />
                Deposit
              </>
            ) : (
              <>
                <Minus size={18} className="mr-2" />
                Withdraw
              </>
            )}
          </Button>

          {/* Quick Preset Buttons */}
          <div className="grid grid-cols-3 gap-2 pt-2 animate-stagger">
            {[100, 500, 1000].map((presetAmount) => (
              <button
                key={presetAmount}
                type="button"
                onClick={() => setAmount(presetAmount.toString())}
                className="px-3 py-2 text-sm font-semibold bg-card/50 border border-border hover:border-primary/50 rounded-lg transition-smooth hover-glow"
              >
                ${presetAmount}
              </button>
            ))}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
