"use client"

import { useState, useEffect } from "react"
import { useAccount, useReadContract, useWriteContract } from "wagmi"

const VAULT_ABI = [
  {
    name: "deposit",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "assets", type: "uint256" }],
    outputs: [{ name: "shares", type: "uint256" }],
  },
  {
    name: "withdraw",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "assets", type: "uint256" },
      { name: "receiver", type: "address" },
      { name: "owner", type: "address" },
    ],
    outputs: [{ name: "shares", type: "uint256" }],
  },
  {
    name: "balanceOf",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "account", type: "address" }],
    outputs: [{ name: "balance", type: "uint256" }],
  },
  {
    name: "previewDeposit",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "assets", type: "uint256" }],
    outputs: [{ name: "shares", type: "uint256" }],
  },
  {
    name: "convertToAssets",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "shares", type: "uint256" }],
    outputs: [{ name: "assets", type: "uint256" }],
  },
] as const

const VAULT_ADDRESS = process.env.NEXT_PUBLIC_VAULT_ADDRESS as `0x${string}` | undefined

export function useVault() {
  const { address, isConnected } = useAccount()
  const [balance, setBalance] = useState("0")
  const [shares, setShares] = useState("0")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    data: vaultBalance,
    isLoading: isBalanceLoading,
    error: balanceError,
  } = useReadContract({
    address: VAULT_ADDRESS,
    abi: VAULT_ABI,
    functionName: "balanceOf",
    args: [address || "0x0"],
    enabled: !!address && isConnected && !!VAULT_ADDRESS,
  })

  const { writeContractAsync: deposit, isPending: isDepositPending } = useWriteContract()

  const { writeContractAsync: withdraw, isPending: isWithdrawPending } = useWriteContract()

  useEffect(() => {
    if (vaultBalance) {
      setBalance((Number(vaultBalance) / 10 ** 18).toFixed(2))
    }
  }, [vaultBalance])

  useEffect(() => {
    if (balanceError) {
      setError("Failed to fetch vault balance")
      console.error("[v0] Balance fetch error:", balanceError)
    }
  }, [balanceError])

  const handleDeposit = async (amount: string) => {
    if (!address || !VAULT_ADDRESS) {
      setError("Wallet not connected")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const amountInWei = BigInt(Math.floor(Number.parseFloat(amount) * 10 ** 18))

      await deposit({
        address: VAULT_ADDRESS,
        abi: VAULT_ABI,
        functionName: "deposit",
        args: [amountInWei],
      })

      console.log("[v0] Deposit successful")
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Deposit failed"
      setError(errorMessage)
      console.error("[v0] Deposit error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleWithdraw = async (amount: string) => {
    if (!address || !VAULT_ADDRESS) {
      setError("Wallet not connected")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const amountInWei = BigInt(Math.floor(Number.parseFloat(amount) * 10 ** 18))

      await withdraw({
        address: VAULT_ADDRESS,
        abi: VAULT_ABI,
        functionName: "withdraw",
        args: [amountInWei, address, address],
      })

      console.log("[v0] Withdrawal successful")
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Withdrawal failed"
      setError(errorMessage)
      console.error("[v0] Withdrawal error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    balance,
    shares,
    isConnected,
    isLoading: isLoading || isBalanceLoading || isDepositPending || isWithdrawPending,
    error,
    deposit: handleDeposit,
    withdraw: handleWithdraw,
  }
}
