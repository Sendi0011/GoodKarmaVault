"use client"

import { useAccount, useConnect, useDisconnect } from "wagmi"
import { useState, useEffect } from "react"
import { Wallet, LogOut, Copy, Check } from "lucide-react"

export function WalletConnectButton() {
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()
  const [copied, setCopied] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button className="px-6 py-2 bg-primary text-background font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 invisible">
        Connect Wallet
      </button>
    )
  }

  const handleCopyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-2">
        <button
          onClick={handleCopyAddress}
          className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 border border-primary rounded-lg transition-all duration-300 group"
          title="Click to copy address"
        >
          <span className="text-sm font-semibold text-primary">
            {address.slice(0, 6)}...{address.slice(-4)}
          </span>
          {copied ? (
            <Check size={16} className="text-accent" />
          ) : (
            <Copy size={16} className="text-primary group-hover:text-accent transition-colors" />
          )}
        </button>
        <button
          onClick={() => disconnect()}
          className="flex items-center gap-2 px-4 py-2 bg-destructive/10 hover:bg-destructive/20 border border-destructive rounded-lg transition-all duration-300 group"
        >
          <LogOut size={16} className="text-destructive" />
          <span className="text-sm font-semibold text-destructive group-hover:text-accent transition-colors hidden sm:inline">
            Disconnect
          </span>
        </button>
      </div>
    )
  }

  const walletConnectConnector = connectors.find((c) => c.id === "walletConnect")

  return (
    <button
      onClick={() => {
        if (walletConnectConnector) {
          connect({ connector: walletConnectConnector })
        }
      }}
      className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-primary to-accent text-background font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 transform hover:scale-105"
    >
      <Wallet size={18} />
      <span className="hidden sm:inline">Connect Wallet</span>
      <span className="sm:hidden">Connect</span>
    </button>
  )
}
