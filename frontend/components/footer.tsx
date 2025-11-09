export function Footer() {
  return (
    <footer className="border-t border-border bg-background/50 py-16 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-3">
            <h3 className="text-lg font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Good Karma Vault
            </h3>
            <p className="text-foreground/60 text-sm leading-relaxed">
              Earn yield while making a positive impact on the world.
            </p>
          </div>
          <div className="space-y-3">
            <h4 className="text-foreground font-semibold mb-4">Product</h4>
            <ul className="space-y-3 text-foreground/60 text-sm">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Vaults
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Analytics
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-foreground font-semibold mb-4">Resources</h4>
            <ul className="space-y-3 text-foreground/60 text-sm">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Guides
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-foreground font-semibold mb-4">Community</h4>
            <ul className="space-y-3 text-foreground/60 text-sm">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Discord
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-8">
          <p className="text-center text-foreground/60 text-sm">© 2025 Good Karma Vault. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
