"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Copy, CreditCard, Building2, Globe, Layers, Shield, CheckCircle } from "lucide-react";
import { lookupBin, formatCardNumber, maskCardNumber } from "@/lib/card-utils";

export default function BinQueryPage() {
  const [bin, setBin] = useState("");
  const [result, setResult] = useState<ReturnType<typeof lookupBin>>(null);
  const [searched, setSearched] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSearch = () => {
    const cleanBin = bin.replace(/\D/g, "");
    if (cleanBin.length >= 6) {
      const data = lookupBin(cleanBin);
      setResult(data);
    } else {
      setResult(null);
    }
    setSearched(true);
  };

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(JSON.stringify(result, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="gradient-bg min-h-screen">
      <Header />
      <Sidebar />

      <main className="pt-16 lg:pl-60">
        <div className="p-6 lg:p-8 max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <div className="bg-indigo-500/10 p-2 rounded-xl">
                <Search className="h-6 w-6 text-indigo-500" />
              </div>
              BIN Query
            </h1>
            <p className="text-muted-foreground mt-2">
              Enter the first 6-8 digits of a card number to identify the issuing bank, country, and card details.
            </p>
          </div>

          {/* Search Card */}
          <Card className="glass-card mb-8">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <Input
                  placeholder="Enter BIN (e.g., 453201)"
                  value={bin}
                  onChange={(e) => setBin(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="text-lg h-12 font-mono"
                  maxLength={8}
                />
                <Button onClick={handleSearch} size="lg" className="gap-2 px-8">
                  <Search className="h-4 w-4" />
                  Lookup
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          {searched && result && (
            <div className="space-y-6 animate-fade-in-up">
              <Card className="glass-card">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      BIN Result
                      <Badge variant="secondary">{result.bin}</Badge>
                    </CardTitle>
                    <CardDescription>Detailed information for this BIN</CardDescription>
                  </div>
                  <Button variant="ghost" size="icon" onClick={handleCopy}>
                    {copied ? <CheckCircle className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InfoRow icon={Building2} label="Bank" value={result.bank} />
                    <InfoRow icon={Globe} label="Country" value={`${result.country} (${result.countryCode})`} />
                    <InfoRow icon={CreditCard} label="Network" value={result.network} />
                    <InfoRow icon={Layers} label="Type" value={result.type} />
                    <InfoRow icon={Shield} label="Level" value={result.level} />
                    <InfoRow icon={CreditCard} label="Brand" value={result.brand} />
                  </div>
                </CardContent>
              </Card>

              {/* Masked Preview */}
              <Card className="glass-card">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground mb-2">Card Preview</div>
                    <div className="font-mono text-2xl tracking-wider">
                      <span className="text-primary font-bold">{result.bin}</span>
                      <span className="text-muted-foreground">{" *".repeat(4)}</span>
                      <span className="text-muted-foreground">{" *".repeat(4)}</span>
                      <span className="text-muted-foreground"> XXXX</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {searched && !result && (
            <Card className="glass-card">
              <CardContent className="pt-6 text-center py-12">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Results Found</h3>
                <p className="text-muted-foreground">
                  The BIN you entered was not found in our database. Try a different BIN.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Info Section */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="glass-card">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">What is a BIN?</h3>
                <p className="text-sm text-muted-foreground">
                  A Bank Identification Number (BIN) is the first 6-8 digits of a card number. It identifies the issuing bank and card network.
                </p>
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">How it works</h3>
                <p className="text-sm text-muted-foreground">
                  Our database maps BIN ranges to bank names, countries, card types, and networks. Results are instant and accurate.
                </p>
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Privacy</h3>
                <p className="text-sm text-muted-foreground">
                  All queries are processed locally. No card data is stored or transmitted to any third-party servers.
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
