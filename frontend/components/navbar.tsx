"use client"

import Link from "next/link"
import { useState } from "react"
import { WalletConnectButton } from "./wallet-connect-button"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center font-bold text-sm text-background group-hover:shadow-lg group-hover:shadow-primary/50 transition-all">
              GKV
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Good Karma
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/dashboard" className="text-foreground/70 hover:text-primary transition-colors">
              Dashboard
            </Link>
            <Link href="/profile" className="text-foreground/70 hover:text-primary transition-colors">
              Profile
            </Link>
            <Link href="/about" className="text-foreground/70 hover:text-primary transition-colors">
              About
            </Link>
            <WalletConnectButton />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-card rounded-lg transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 animate-fade-in">
            <Link href="/dashboard" className="block px-4 py-2 hover:bg-card rounded-lg transition-colors">
              Dashboard
            </Link>
            <Link href="/profile" className="block px-4 py-2 hover:bg-card rounded-lg transition-colors">
              Profile
            </Link>
            <Link href="/about" className="block px-4 py-2 hover:bg-card rounded-lg transition-colors">
              About
            </Link>
            <div className="px-4 pt-2">
              <WalletConnectButton />
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
