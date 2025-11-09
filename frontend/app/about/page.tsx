"use client"

import { Globe, BookOpen, Code2 } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="space-y-16 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-4 pt-12">
        <h1 className="text-5xl md:text-6xl font-bold">
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Good Karma Vault
          </span>
        </h1>
        <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
          Merging financial growth with social impact through transparent, on-chain yield allocation
        </p>
      </div>

      {/* Mission */}
      <div className="max-w-4xl mx-auto bg-gradient-to-b from-card/50 to-background border border-border rounded-lg p-12">
        <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
        <p className="text-lg text-foreground/80 leading-relaxed">
          Good Karma Vault reimagines DeFi by proving that yield farming and social good are not mutually exclusive. We
          believe every investor should be able to earn competitive returns while supporting causes that matter to them.
          Our protocol automatically allocates a portion of your yield to pre-selected public goods initiatives,
          creating a sustainable model where financial success drives real-world impact.
        </p>
      </div>

      {/* Impact Categories */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Impact Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Environment */}
          <div className="bg-gradient-to-b from-green-500/10 to-background border border-green-500/30 rounded-lg p-8 space-y-4">
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
              <Globe className="text-green-400" size={24} />
            </div>
            <h3 className="text-2xl font-bold">Environment</h3>
            <p className="text-foreground/70">
              Supporting climate action, renewable energy projects, and environmental conservation initiatives
              worldwide.
            </p>
            <div className="pt-4 border-t border-green-500/20">
              <p className="text-sm text-foreground/60">Partners: GiveWell, The Nature Conservancy</p>
            </div>
          </div>

          {/* Education */}
          <div className="bg-gradient-to-b from-blue-500/10 to-background border border-blue-500/30 rounded-lg p-8 space-y-4">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <BookOpen className="text-blue-400" size={24} />
            </div>
            <h3 className="text-2xl font-bold">Education</h3>
            <p className="text-foreground/70">
              Providing educational opportunities and skill development programs to underserved communities globally.
            </p>
            <div className="pt-4 border-t border-blue-500/20">
              <p className="text-sm text-foreground/60">Partners: Room to Read, Code.org</p>
            </div>
          </div>

          {/* Dev Tools */}
          <div className="bg-gradient-to-b from-purple-500/10 to-background border border-purple-500/30 rounded-lg p-8 space-y-4">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Code2 className="text-purple-400" size={24} />
            </div>
            <h3 className="text-2xl font-bold">Dev Tools</h3>
            <p className="text-foreground/70">
              Funding open-source Web3 infrastructure and developer tools that power the next generation of
              decentralized applications.
            </p>
            <div className="pt-4 border-t border-purple-500/20">
              <p className="text-sm text-foreground/60">Partners: Ethereum Foundation, Protocol Labs</p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
        <div className="space-y-6">
          {[
            {
              step: "1",
              title: "Deposit Assets",
              desc: "Connect your wallet and deposit ERC20 tokens (USDC, ETH, etc.)",
            },
            {
              step: "2",
              title: "Choose Impact Profile",
              desc: "Select how your yield should be distributed across causes",
            },
            { step: "3", title: "Earn Yield", desc: "Your assets are deployed to Aave and earn competitive returns" },
            {
              step: "4",
              title: "Automatic Allocation",
              desc: "Yields are harvested and distributed to your chosen impact initiatives",
            },
            { step: "5", title: "Track Impact", desc: "Monitor your contributions and see real-world impact metrics" },
          ].map((item, idx) => (
            <div
              key={item.step}
              className="flex gap-6 items-start animate-fade-in"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center font-bold text-background">
                {item.step}
              </div>
              <div className="pt-2">
                <h4 className="text-lg font-bold">{item.title}</h4>
                <p className="text-foreground/70">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            {
              q: "Is my deposit secure?",
              a: "Yes. Your deposits are secured through Aave with full ERC4626 compliance and regular security audits.",
            },
            {
              q: "Can I change my impact profile?",
              a: "Absolutely. You can change your allocation preferences anytime without penalties.",
            },
            {
              q: "What are the fees?",
              a: "We charge a small 1% performance fee on yield harvested, which goes toward platform operations.",
            },
            {
              q: "How often are yields distributed?",
              a: "Yields can be harvested manually or automatically on a weekly schedule.",
            },
          ].map((item, idx) => (
            <div key={idx} className="bg-gradient-to-b from-card to-background border border-border rounded-lg p-6">
              <h4 className="text-lg font-bold mb-2">{item.q}</h4>
              <p className="text-foreground/70">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
