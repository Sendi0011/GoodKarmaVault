"use client"

import { useState, useEffect } from "react"
import { useAccount } from "wagmi"
import { useRouter } from "next/navigation"
import { DepositWithdrawForm } from "@/components/deposit-withdraw-form"
import { AllocationSelector } from "@/components/allocation-selector"
import { YieldChart } from "@/components/yield-chart"
import { VaultOverview } from "@/components/dashboard/vault-overview"
import { VaultActions } from "@/components/dashboard/vault-actions"
import { PerformanceChart } from "@/components/dashboard/performance-chart"
import { ImpactAllocation } from "@/components/dashboard/impact-allocation"

export default function Dashboard() {
  const [stats, setStats] = useState({
    balance: "2,450.50",
    unrealizedYield: "124.25",
    totalAllocated: "1,203.75",
    apy: "12.5%",
  })
  const { isConnected } = useAccount()
  const router = useRouter()

  useEffect(() => {
    if (!isConnected) {
      router.push("/")
    }
  }, [isConnected, router])

  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        ...prev,
        unrealizedYield: (Number.parseFloat(prev.unrealizedYield) + Math.random() * 0.5).toFixed(2),
      }))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  if (!isConnected) {
    return null
  }

  return (
    <div className="w-full">
      <main className="w-full min-h-screen pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Dashboard Header */}
          <div className="mb-16 animate-fade-in space-y-3">
            <h1 className="text-4xl md:text-5xl font-bold text-balance">
              Your <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Vault</span>
            </h1>
            <p className="text-foreground/60 text-lg">Track your yield earnings and impact allocation in real-time</p>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Stats */}
            <div className="lg:col-span-2 space-y-8">
              <VaultOverview />
              <PerformanceChart />
              <div className="bg-gradient-to-b from-card to-background border border-border rounded-lg p-8 space-y-6">
                <h2 className="text-xl font-bold">Yield Performance</h2>
                <YieldChart />
              </div>
              <DepositWithdrawForm />
            </div>

            {/* Right Column - Actions & Allocation */}
            <div className="space-y-8">
              <AllocationSelector />
              <VaultActions />
              <ImpactAllocation />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
