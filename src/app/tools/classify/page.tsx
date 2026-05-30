"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Layers, CreditCard, Building2, Globe, Shield, Tag } from "lucide-react";
import { lookupBin, detectNetwork, detectCardType, detectCardLevel, formatCardNumber } from "@/lib/card-utils";

interface ClassificationResult {
  network: string;
  type: string;
  level: string;
  bank: string;
  country: string;
  brand: string;
  formatted: string;
}

export default function ClassifyPage() {
  const [cardNumber, setCardNumber] = useState("");
  const [result, setResult] = useState<ClassificationResult | null>(null);
  const [classified, setClassified] = useState(false);

  const handleClassify = () => {
    const clean = cardNumber.replace(/\D/g, "");
    if (clean.length >= 6) {
      const binInfo = lookupBin(clean);
      setResult({
        network: binInfo?.network || detectNetwork(clean),
        type: binInfo?.type || detectCardType(clean),
        level: binInfo?.level || detectCardLevel(clean),
        bank: binInfo?.bank || "Unknown",
        country: binInfo?.country || "Unknown",
        brand: binInfo?.brand || detectNetwork(clean),
        formatted: formatCardNumber(clean),
      });
    } else {
      setResult(null);
    }
    setClassified(true);
  };

  const networkColors: Record<string, string> = {
    Visa: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    Mastercard: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    "American Express": "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
    Discover: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    JCB: "bg-red-500/10 text-red-500 border-red-500/20",
    "Diners Club": "bg-gray-500/10 text-gray-500 border-gray-500/20",
    UnionPay: "bg-red-500/10 text-red-500 border-red-500/20",
  };

  const typeColors: Record<string, string> = {
    Credit: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    Debit: "bg-sky-500/10 text-sky-500 border-sky-500/20",
    Prepaid: "bg-violet-500/10 text-violet-500 border-violet-500/20",
  };

  const levelColors: Record<string, string> = {
    Classic: "bg-gray-500/10 text-gray-500 border-gray-500/20",
    Standard: "bg-gray-500/10 text-gray-500 border-gray-500/20",
    Gold: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    Platinum: "bg-slate-500/10 text-slate-400 border-slate-500/20",
    Infinite: "bg-violet-500/10 text-violet-500 border-violet-500/20",
    Green: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  };

  return (
    <div className="gradient-bg min-h-screen">
      <Header />
      <Sidebar />

      <main className="pt-16 lg:pl-60">
        <div className="p-6 lg:p-8 max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <div className="bg-emerald-500/10 p-2 rounded-xl">
                <Layers className="h-6 w-6 text-emerald-500" />
              </div>
              Card Classification
            </h1>
            <p className="text-muted-foreground mt-2">
              Classify cards by type (debit, credit, prepaid), network, and level. Enter the first 6+ digits.
            </p>
          </div>

          {/* Search Card */}
          <Card className="glass-card mb-8">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <Input
                  placeholder="Enter card number (e.g., 453201)"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleClassify()}
                  className="text-lg h-12 font-mono"
                  maxLength={23}
                />
                <Button onClick={handleClassify} size="lg" className="gap-2 px-8">
                  <Layers className="h-4 w-4" />
                  Classify
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          {classified && result && (
            <div className="space-y-6 animate-fade-in-up">
              {/* Classification Badges */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Classification Result</CardTitle>
                  <CardDescription>Card classification for the provided number</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3 mb-6">
                    <Badge variant="outline" className={networkColors[result.network] || ""}>
                      <CreditCard className="h-3.5 w-3.5 mr-1" />
                      {result.network}
                    </Badge>
                    <Badge variant="outline" className={typeColors[result.type] || ""}>
                      <Tag className="h-3.5 w-3.5 mr-1" />
                      {result.type}
                    </Badge>
                    <Badge variant="outline" className={levelColors[result.level] || ""}>
                      <Shield className="h-3.5 w-3.5 mr-1" />
                      {result.level}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InfoRow icon={Building2} label="Bank" value={result.bank} />
                    <InfoRow icon={Globe} label="Country" value={result.country} />
                    <InfoRow icon={CreditCard} label="Network" value={result.network} />
                    <InfoRow icon={Tag} label="Type" value={result.type} />
                    <InfoRow icon={Shield} label="Level" value={result.level} />
                    <InfoRow icon={Layers} label="Brand" value={result.brand} />
                  </div>
                </CardContent>
              </Card>

              {/* Network Guide */}
              <Card className="glass-card">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-4">Card Network Guide</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {["Visa", "Mastercard", "Amex", "Discover"].map((net) => (
                      <div key={net} className="p-3 rounded-lg bg-muted/30 text-center">
                        <div className="text-sm font-medium">{net}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {classified && !result && (
            <Card className="glass-card">
              <CardContent className="pt-6 text-center py-12">
                <Layers className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Classification Available</h3>
                <p className="text-muted-foreground">
                  Please enter at least 6 digits to classify a card.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Info */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="glass-card">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Card Types</h3>
                <p className="text-sm text-muted-foreground">
                  Cards are classified as Credit (borrowed funds), Debit (bank account), or Prepaid (pre-loaded balance).
                </p>
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Card Levels</h3>
                <p className="text-sm text-muted-foreground">
                  Card levels indicate the tier: Classic, Gold, Platinum, or Infinite. Higher tiers offer more benefits.
                </p>
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Networks</h3>
                <p className="text-sm text-muted-foreground">
                  The payment network (Visa, Mastercard, Amex, etc.) processes the transaction between banks.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
      <Icon className="h-5 w-5 text-muted-foreground shrink-0" />
      <div className="flex-1">
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="font-medium">{value}</div>
      </div>
    </div>
  );
}
