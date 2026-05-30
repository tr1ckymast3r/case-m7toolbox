import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, CreditCard, Layers, Shield, Zap, Globe, ArrowRight, CheckCircle } from "lucide-react";

const features = [
  {
    icon: Search,
    title: "BIN Query",
    description: "Instantly identify card issuer, country, card type, and bank details from BIN/IIN numbers.",
    href: "/tools/bin-query",
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
  },
  {
    icon: CreditCard,
    title: "Card Validation",
    description: "Verify card numbers using Luhn algorithm. Check format, length, and basic validity instantly.",
    href: "/tools/card-check",
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  {
    icon: Layers,
    title: "Card Classification",
    description: "Classify cards by type: debit, credit, prepaid, or premium. Identify card networks and levels.",
    href: "/tools/classify",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "All queries are processed locally. No data is stored or transmitted to third parties.",
    href: "#",
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Get instant results with our optimized BIN database and validation algorithms.",
    href: "#",
    color: "text-rose-500",
    bgColor: "bg-rose-500/10",
  },
  {
    icon: Globe,
    title: "Global Coverage",
    description: "Comprehensive BIN database covering card issuers from over 200 countries worldwide.",
    href: "#",
    color: "text-sky-500",
    bgColor: "bg-sky-500/10",
  },
];

const stats = [
  { label: "BINs Database", value: "500K+", color: "stat-card-indigo" },
  { label: "Countries", value: "200+", color: "stat-card-violet" },
  { label: "Card Networks", value: "50+", color: "stat-card-emerald" },
  { label: "Daily Queries", value: "1M+", color: "stat-card-amber" },
];

const benefits = [
  "Real-time BIN lookup with detailed card information",
  "Luhn algorithm validation for instant verification",
  "Automatic card type and network detection",
  "Bulk processing support for enterprise users",
  "REST API access for developers",
  "No registration required for basic queries",
];

export default function HomePage() {
  return (
    <div className="gradient-bg min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Decorative orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute top-40 right-10 w-60 h-60 bg-violet-500/15 rounded-full blur-3xl animate-float-slower" />
        <div className="absolute bottom-10 left-1/3 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl animate-float-slow" />

        <div className="relative mx-auto max-w-4xl text-center">
          <div className="animate-fade-in-up">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20 mb-6">
              <Zap className="h-3.5 w-3.5" />
              Professional Card Tools
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight animate-fade-in-up-delay-1">
            <span className="bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 bg-clip-text text-transparent">
              M7 Toolbox
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up-delay-2">
            BIN query, card validation, classification and payment assistant.
            Professional card tools in one simple toolbox.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up-delay-3">
            <Link href="/tools/bin-query">
              <Button size="lg" className="gap-2 animate-cta-glow">
                Start Querying <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="#features">
              <Button size="lg" variant="outline" className="gap-2">
                Explore Tools
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className={`${stat.color} rounded-xl border p-6 text-center animate-card-hover`}
              >
                <div className="text-2xl sm:text-3xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold">Powerful Card Tools</h2>
            <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
              Everything you need to query, validate, and classify payment cards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Link key={feature.title} href={feature.href}>
                <Card className="glass-card h-full animate-card-hover cursor-pointer group">
                  <CardHeader>
                    <div className={`${feature.bgColor} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
                      <feature.icon className={`h-6 w-6 ${feature.color}`} />
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {feature.title}
                    </CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Why Choose M7 Toolbox?
              </h2>
              <p className="text-muted-foreground mb-8">
                Built for professionals who need fast, reliable card data at their fingertips.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 shrink-0" />
                    <span className="text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl" />
              <div className="relative">
                <div className="text-sm text-muted-foreground mb-2">Sample BIN Query</div>
                <div className="font-mono text-lg mb-4">
                  <span className="text-primary">453201</span>
                  <span className="text-muted-foreground">XXXX XXXX XXXX</span>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Bank</span>
                    <span className="font-medium">JPMorgan Chase</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Country</span>
                    <span className="font-medium">United States</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Type</span>
                    <span className="font-medium">Credit</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Network</span>
                    <span className="font-medium">Visa</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Level</span>
                    <span className="font-medium">Classic</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="glass-card rounded-2xl p-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-500/5 to-violet-500/5" />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                Access professional card tools instantly. No registration required for basic queries.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/tools/bin-query">
                  <Button size="lg" className="gap-2 animate-cta-glow">
                    Try BIN Query <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button size="lg" variant="outline">
                    Create Account
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
