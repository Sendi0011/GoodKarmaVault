"use client"

import { useAccount } from "wagmi"
import { Card, CardContent } from "@/components/ui/card"
import { Copy, ExternalLink } from "lucide-react"
import { useState } from "react"

export function ProfileHeader() {
  const { address } = useAccount()
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    if (address) {
      navigator.clipboard.writeText(address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <Card className="border-border/50 bg-gradient-to-br from-card to-background overflow-hidden">
      <CardContent className="pt-10 pb-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-4xl font-bold text-background flex-shrink-0">
            {address?.slice(2, 4).toUpperCase() || ""}
          </div>

          {/* Info */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold mb-3">Your Wallet Profile</h1>
            <p className="text-foreground/60 mb-6">Member since November 2024 • Active Contributor</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleCopy}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-primary/10 hover:bg-primary/20 border border-primary rounded-lg transition-all font-medium text-sm"
              >
                <span className="font-mono text-sm">
                  {address?.slice(0, 10)}...{address?.slice(-8)}
                </span>
                <Copy size={16} />
              </button>
              <a
                href={`https://etherscan.io/address/${address}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-accent/10 hover:bg-accent/20 border border-accent rounded-lg transition-all text-accent font-medium text-sm"
              >
                View on Etherscan
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
