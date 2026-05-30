"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useSession, signOut } from "next-auth/react";
import { Moon, Sun, Menu, X, CreditCard, Search, Shield, Layers, User, LogIn, LogOut, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const navItems = [
  { label: "BIN Query", href: "/tools/bin-query", icon: Search },
  { label: "Card Check", href: "/tools/card-check", icon: CreditCard },
  { label: "Classify", href: "/tools/classify", icon: Layers },
];

export function Header() {
  const { theme, setTheme } = useTheme();
  const { data: session, status } = useSession();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <header className="glass-header fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
              M7
            </div>
            <span className="font-semibold text-lg hidden sm:inline">M7 Toolbox</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="h-9 w-9"
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
                <span className="sr-only">Toggle theme</span>
              </Button>
            )}

            {status === "loading" && (
              <div className="h-9 w-20 bg-muted animate-pulse rounded-md hidden sm:block" />
            )}

            {status === "authenticated" && session?.user ? (
              <>
                <Link href="/dashboard">
                  <Button variant="ghost" size="sm" className="hidden sm:flex gap-2">
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Button>
                </Link>
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-muted/50 rounded-lg">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{session.user.name || session.user.email}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hidden sm:flex gap-2"
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : status === "unauthenticated" ? (
              <>
                <Link href="/auth/login">
                  <Button variant="ghost" size="sm" className="hidden sm:flex gap-2">
                    <LogIn className="h-4 w-4" />
                    Login
                  </Button>
                </Link>

                <Link href="/auth/register">
                  <Button size="sm" className="hidden sm:flex">
                    Get Started
                  </Button>
                </Link>
              </>
            ) : null}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-9 w-9"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-lg">
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-border flex gap-2">
              {status === "authenticated" && session?.user ? (
                <>
                  <Link href="/dashboard" className="flex-1">
                    <Button variant="outline" className="w-full" size="sm" onClick={() => setMobileOpen(false)}>
                      Dashboard
                    </Button>
                  </Link>
                  <Button
                    className="flex-1"
                    size="sm"
                    onClick={() => {
                      setMobileOpen(false);
                      signOut({ callbackUrl: "/" });
                    }}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" className="flex-1">
                    <Button variant="outline" className="w-full" size="sm" onClick={() => setMobileOpen(false)}>Login</Button>
                  </Link>
                  <Link href="/auth/register" className="flex-1">
                    <Button className="w-full" size="sm" onClick={() => setMobileOpen(false)}>Get Started</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
