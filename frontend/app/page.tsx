"use client"
import { Zap, TrendingUp, Heart } from "lucide-react"
import { GKVLogo3D } from "@/components/3d-gkv-logo"

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="w-full min-h-screen flex items-center justify-center pt-32 pb-32">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8 animate-slide-in-left">
              <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl font-bold leading-tight text-balance">
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Earn Yield
                  </span>
                  <br />
                  <span className="text-foreground">With Purpose</span>
                </h1>
                <p className="text-lg text-foreground/70 max-w-lg leading-relaxed">
                  Good Karma Vault lets you earn competitive yield on your crypto while automatically allocating profits
                  to causes you care about. Transform your wealth into positive impact.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href="/dashboard"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-accent text-background font-bold rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 transform hover:scale-105"
                >
                  Get Started <span>→</span>
                </a>
                <a
                  href="#features"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-primary text-primary font-bold rounded-lg hover:bg-primary/10 transition-all duration-300"
                >
                  Learn More
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-12">
                <div className="bg-card border border-border rounded-lg p-6 space-y-3">
                  <p className="text-accent font-bold text-2xl md:text-3xl">12.5%</p>
                  <p className="text-foreground/60 text-sm">Est. APY</p>
                </div>
                <div className="bg-card border border-border rounded-lg p-6 space-y-3">
                  <p className="text-primary font-bold text-2xl md:text-3xl">$2.3M</p>
                  <p className="text-foreground/60 text-sm">Total Locked</p>
                </div>
                <div className="bg-card border border-border rounded-lg p-6 space-y-3">
                  <p className="text-secondary font-bold text-2xl md:text-3xl">500+</p>
                  <p className="text-foreground/60 text-sm">Users</p>
                </div>
              </div>
            </div>

            {/* Right Content - 3D Logo */}
            <div className="hidden md:flex justify-center items-center animate-slide-in-right">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-2xl opacity-20 blur-3xl"></div>
                <div className="relative bg-gradient-to-b from-card to-background p-12 rounded-2xl border border-border/50 animate-glow">
                  <GKVLogo3D size={300} autoRotate={true} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 space-y-4 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-balance">
              Why Choose{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Good Karma Vault?
              </span>
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed">
              Experience the future of DeFi with transparent, impactful yield generation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-stagger">
            {/* Feature 1 */}
            <div className="group bg-gradient-to-b from-card to-background border border-border rounded-lg p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 space-y-4">
              <div className="bg-primary/20 w-14 h-14 rounded-lg flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                <Zap className="text-primary" size={28} />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold">Maximum Yield</h3>
                <p className="text-foreground/70 leading-relaxed">
                  Leverage Aave's proven infrastructure for consistent, competitive returns on your deposits.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group bg-gradient-to-b from-card to-background border border-border rounded-lg p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 space-y-4">
              <div className="bg-accent/20 w-14 h-14 rounded-lg flex items-center justify-center group-hover:bg-accent/30 transition-colors">
                <TrendingUp className="text-accent" size={28} />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold">Real-Time Impact</h3>
                <p className="text-foreground/70 leading-relaxed">
                  Choose your impact profile and watch your yield automatically allocated to meaningful causes.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group bg-gradient-to-b from-card to-background border border-border rounded-lg p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 space-y-4">
              <div className="bg-secondary/40 w-14 h-14 rounded-lg flex items-center justify-center group-hover:bg-secondary/60 transition-colors">
                <Heart className="text-secondary" size={28} />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold">Secure & Audited</h3>
                <p className="text-foreground/70 leading-relaxed">
                  Built on ERC4626 standards with full transparency and on-chain verification of all allocations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Profiles */}
      <section className="w-full py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-b from-card/30 to-background rounded-2xl p-8 md:p-16 space-y-12">
            <div className="text-center space-y-4 animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-bold text-balance">
                Choose Your{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Impact Profile
                </span>
              </h2>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed">
                Select how your yield is distributed across different social good initiatives
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-stagger">
              {[
                {
                  name: "Environment",
                  desc: "Climate action & green energy",
                  color: "from-green-500/20 to-green-600/10",
                },
                { name: "Education", desc: "Global education initiatives", color: "from-blue-500/20 to-blue-600/10" },
                {
                  name: "Dev Tools",
                  desc: "Web3 developer infrastructure",
                  color: "from-purple-500/20 to-purple-600/10",
                },
              ].map((profile, idx) => (
                <div
                  key={profile.name}
                  className={`bg-gradient-to-br ${profile.color} border border-border rounded-lg p-8 text-center hover:border-primary/50 transition-all cursor-pointer animate-fade-in space-y-3`}
                >
                  <h3 className="text-2xl font-bold">{profile.name}</h3>
                  <p className="text-foreground/70 leading-relaxed">{profile.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
