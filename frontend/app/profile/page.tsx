"use client"

import { useEffect } from "react"
import { useAccount } from "wagmi"
import { useRouter } from "next/navigation"
import { ProfileHeader } from "@/components/profile/profile-header"
import { ProfileStats } from "@/components/profile/profile-stats"
import { ImpactHistory } from "@/components/profile/impact-history"
import { PreferencesPanel } from "@/components/profile/preferences-panel"

export default function ProfilePage() {
  const { isConnected, address } = useAccount()
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
    <main className="min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="mb-16 animate-fade-in">
          <ProfileHeader />
        </div>

        {/* Stats & Preferences Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Stats & Impact */}
          <div className="lg:col-span-2 space-y-8">
            <ProfileStats />
            <ImpactHistory />
          </div>

          {/* Right Column - Preferences */}
          <div className="space-y-8">
            <PreferencesPanel />
          </div>
        </div>
      </div>
    </main>
  )
}
