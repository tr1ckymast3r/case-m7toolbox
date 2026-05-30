import Link from "next/link";
import { CreditCard, Github, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background/50 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
                M7
              </div>
              <span className="font-semibold text-lg">M7 Toolbox</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Professional card tools in one simple toolbox. BIN query, validation, and classification.
            </p>
          </div>

          {/* Tools */}
          <div>
            <h4 className="font-semibold text-sm mb-4">Tools</h4>
            <ul className="space-y-2">
              <li><Link href="/tools/bin-query" className="text-sm text-muted-foreground hover:text-foreground transition-colors">BIN Query</Link></li>
              <li><Link href="/tools/card-check" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Card Validation</Link></li>
              <li><Link href="/tools/classify" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Classification</Link></li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="font-semibold text-sm mb-4">Account</h4>
            <ul className="space-y-2">
              <li><Link href="/auth/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Login</Link></li>
              <li><Link href="/auth/register" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Register</Link></li>
              <li><Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Dashboard</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-sm mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} M7 Toolbox. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Github className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
