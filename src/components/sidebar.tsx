"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, CreditCard, Layers, LayoutDashboard, Settings, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "BIN Query", href: "/tools/bin-query", icon: Search },
  { label: "Card Check", href: "/tools/card-check", icon: CreditCard },
  { label: "Classify", href: "/tools/classify", icon: Layers },
  { label: "Settings", href: "/settings", icon: Settings },
  { label: "Help", href: "/help", icon: HelpCircle },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="glass-panel fixed left-0 top-16 bottom-0 w-60 z-40 hidden lg:block overflow-y-auto">
      <nav className="p-4 space-y-1">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-colors",
                isActive
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
