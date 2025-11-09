"use client"

import { useAccount } from "wagmi"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { ImpactCategories } from "@/components/impact/impact-categories"
import { ImpactAllocationForm } from "@/components/impact/impact-allocation-form"
import { GlobalImpactStats } from "@/components/impact/global-impact-stats"

export default function ImpactPage() {
  const { isConnected } = useAccount()
  const router = useRouter()

  useEffect(() => {
    if (!isConnected) {
      router.push("/")
    }
  }, [isConnected, router])

  if (!isConnected) {
    return null
  }

  return (
    <main className="min-h-screen pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            Choose Your{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Impact</span>
          </h1>
          <p className="text-foreground/60">Allocate your yield to causes that matter to you</p>
        </div>

        {/* Global Impact Stats */}
        <GlobalImpactStats />

        {/* Impact Categories & Allocation */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <div className="lg:col-span-2">
            <ImpactCategories />
          </div>
          <div>
            <ImpactAllocationForm />
          </div>
        </div>
      </div>
    </main>
  )
}
