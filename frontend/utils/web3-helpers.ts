export const formatAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export const formatBalance = (balance: string, decimals = 2) => {
  const num = Number.parseFloat(balance)
  if (num >= 1000000) {
    return `$${(num / 1000000).toFixed(decimals)}M`
  }
  if (num >= 1000) {
    return `$${(num / 1000).toFixed(decimals)}K`
  }
  return `$${num.toFixed(decimals)}`
}

export const parseWei = (wei: bigint, decimals = 18) => {
  return Number(wei) / 10 ** decimals
}

export const toWei = (amount: string, decimals = 18) => {
  return BigInt(Math.floor(Number.parseFloat(amount) * 10 ** decimals))
}

export const isValidAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address)
}
