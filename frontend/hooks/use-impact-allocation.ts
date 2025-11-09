"use client"

import { useState, useEffect } from "react"
import { useAccount, useReadContract, useWriteContract } from "wagmi"

const ALLOCATION_ABI = [
  {
    name: "setAllocationProfile",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "environment", type: "uint256" },
      { name: "education", type: "uint256" },
      { name: "health", type: "uint256" },
      { name: "devTools", type: "uint256" },
    ],
    outputs: [],
  },
  {
    name: "getAllocationProfile",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "user", type: "address" }],
    outputs: [
      { name: "environment", type: "uint256" },
      { name: "education", type: "uint256" },
      { name: "health", type: "uint256" },
      { name: "devTools", type: "uint256" },
    ],
  },
  {
    name: "getAllocatedYield",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "category", type: "string" }],
    outputs: [{ name: "amount", type: "uint256" }],
  },
] as const

const ALLOCATION_ADDRESS = process.env.NEXT_PUBLIC_ALLOCATION_ADDRESS as `0x${string}` | undefined

export interface AllocationProfile {
  environment: number
  education: number
  health: number
  devTools: number
}

export function useImpactAllocation() {
  const { address, isConnected } = useAccount()
  const [profile, setProfile] = useState<AllocationProfile>({
    environment: 40,
    education: 35,
    health: 15,
    devTools: 10,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { data: currentProfile } = useReadContract({
    address: ALLOCATION_ADDRESS,
    abi: ALLOCATION_ABI,
    functionName: "getAllocationProfile",
    args: [address || "0x0"],
    enabled: !!address && isConnected && !!ALLOCATION_ADDRESS,
  })

  const { writeContractAsync: setAllocation } = useWriteContract()

  useEffect(() => {
    if (currentProfile && Array.isArray(currentProfile)) {
      setProfile({
        environment: Number(currentProfile[0]),
        education: Number(currentProfile[1]),
        health: Number(currentProfile[2]),
        devTools: Number(currentProfile[3]),
      })
    }
  }, [currentProfile])

  const handleUpdateAllocation = async (newProfile: AllocationProfile) => {
    if (!address || !ALLOCATION_ADDRESS) {
      setError("Wallet not connected")
      return
    }

    const total = Object.values(newProfile).reduce((a, b) => a + b, 0)
    if (total !== 100) {
      setError("Allocation percentages must total 100%")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      await setAllocation({
        address: ALLOCATION_ADDRESS,
        abi: ALLOCATION_ABI,
        functionName: "setAllocationProfile",
        args: [newProfile.environment, newProfile.education, newProfile.health, newProfile.devTools],
      })

      setProfile(newProfile)
      console.log("[v0] Allocation updated:", newProfile)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to update allocation"
      setError(errorMessage)
      console.error("[v0] Allocation error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    profile,
    isConnected,
    isLoading,
    error,
    updateAllocation: handleUpdateAllocation,
  }
}
