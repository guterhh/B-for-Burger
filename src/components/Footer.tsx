import React from 'react';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

export default function Footer() {
  return (
    <footer className="border-t border-border py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo + Brand */}
        <div className="flex items-center gap-3">
          <AppLogo
            src="/assets/images/453443215_1522892728317109_6297073676447441462_n-1778165106505.jpg"
            size={32}
            className="rounded-md overflow-hidden"
          />
          <span className="text-sm font-semibold text-foreground">
            B <span className="text-primary">For</span> Burger
          </span>
        </div>

        {/* Links */}
        <nav className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <a href="#menu" className="hover:text-foreground transition-colors">Menu</a>
          <a href="#why-us" className="hover:text-foreground transition-colors">Why Us</a>
          <a href="#social" className="hover:text-foreground transition-colors">Find Us</a>
          <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
          <a href="#" className="hover:text-foreground transition-colors">Terms</a>
        </nav>

        {/* Social + Copyright */}
        <div className="flex items-center gap-4 text-muted-foreground">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
            aria-label="Instagram"
          >
            <Icon name="HeartIcon" size={18} />
          </a>
          <span className="text-xs text-muted-foreground">© 2026 B For Burger</span>
        </div>
      </div>
    </footer>
  );
}