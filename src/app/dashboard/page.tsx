"use client";

import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, CreditCard, Layers, Activity, TrendingUp, Clock } from "lucide-react";

const recentQueries = [
  { bin: "453201", type: "BIN Query", result: "Visa - JPMorgan Chase", time: "2 min ago" },
  { bin: "542523", type: "Card Check", result: "Valid - Mastercard", time: "5 min ago" },
  { bin: "374245", type: "Classify", result: "Amex Credit - Platinum", time: "12 min ago" },
  { bin: "400000", type: "BIN Query", result: "Visa - Capital One", time: "1 hour ago" },
  { bin: "601100", type: "Card Check", result: "Valid - Discover", time: "2 hours ago" },
];

export default function DashboardPage() {
  return (
    <div className="gradient-bg min-h-screen">
      <Header />
      <Sidebar />

      <main className="pt-16 lg:pl-60">
        <div className="p-6 lg:p-8 max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Welcome back! Here&apos;s an overview of your recent activity.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="glass-card stat-card-indigo animate-card-hover">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Queries</p>
                    <p className="text-2xl font-bold">1,234</p>
                  </div>
                  <Search className="h-8 w-8 text-indigo-500 opacity-50" />
                </div>
              </CardContent>
            </Card>
            <Card className="glass-card stat-card-violet animate-card-hover">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Cards Validated</p>
                    <p className="text-2xl font-bold">856</p>
                  </div>
                  <CreditCard className="h-8 w-8 text-violet-500 opacity-50" />
                </div>
              </CardContent>
            </Card>
            <Card className="glass-card stat-card-emerald animate-card-hover">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Classified</p>
                    <p className="text-2xl font-bold">567</p>
                  </div>
                  <Layers className="h-8 w-8 text-emerald-500 opacity-50" />
                </div>
              </CardContent>
            </Card>
            <Card className="glass-card stat-card-amber animate-card-hover">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">API Calls</p>
                    <p className="text-2xl font-bold">12.5K</p>
                  </div>
                  <Activity className="h-8 w-8 text-amber-500 opacity-50" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your latest queries and results</CardDescription>
                </div>
                <Badge variant="secondary" className="gap-1">
                  <Clock className="h-3 w-3" />
                  Today
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentQueries.map((query, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className="font-mono text-sm text-primary font-bold w-16">{query.bin}</div>
                    <Badge variant="outline" className="text-xs">{query.type}</Badge>
                    <div className="flex-1 text-sm">{query.result}</div>
                    <div className="text-xs text-muted-foreground">{query.time}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="glass-card animate-card-hover cursor-pointer">
              <CardContent className="pt-6 text-center">
                <Search className="h-8 w-8 text-indigo-500 mx-auto mb-3" />
                <h3 className="font-semibold">BIN Query</h3>
                <p className="text-sm text-muted-foreground mt-1">Look up card BIN details</p>
              </CardContent>
            </Card>
            <Card className="glass-card animate-card-hover cursor-pointer">
              <CardContent className="pt-6 text-center">
                <CreditCard className="h-8 w-8 text-violet-500 mx-auto mb-3" />
                <h3 className="font-semibold">Card Validation</h3>
                <p className="text-sm text-muted-foreground mt-1">Verify card number validity</p>
              </CardContent>
            </Card>
            <Card className="glass-card animate-card-hover cursor-pointer">
              <CardContent className="pt-6 text-center">
                <Layers className="h-8 w-8 text-emerald-500 mx-auto mb-3" />
                <h3 className="font-semibold">Classification</h3>
                <p className="text-sm text-muted-foreground mt-1">Classify card type and level</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
