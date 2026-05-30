"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, CheckCircle, XCircle, Shield, Zap } from "lucide-react";
import { luhnCheck, detectNetwork, formatCardNumber } from "@/lib/card-utils";

export default function CardCheckPage() {
  const [cardNumber, setCardNumber] = useState("");
  const [result, setResult] = useState<{
    valid: boolean;
    network: string;
    length: number;
    formatted: string;
  } | null>(null);
  const [checked, setChecked] = useState(false);

  const handleCheck = () => {
    const clean = cardNumber.replace(/\D/g, "");
    if (clean.length >= 13) {
      setResult({
        valid: luhnCheck(clean),
        network: detectNetwork(clean),
        length: clean.length,
        formatted: formatCardNumber(clean),
      });
    } else {
      setResult(null);
    }
    setChecked(true);
  };

  return (
    <div className="gradient-bg min-h-screen">
      <Header />
      <Sidebar />

      <main className="pt-16 lg:pl-60">
        <div className="p-6 lg:p-8 max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <div className="bg-violet-500/10 p-2 rounded-xl">
                <CreditCard className="h-6 w-6 text-violet-500" />
              </div>
              Card Validation
            </h1>
            <p className="text-muted-foreground mt-2">
              Verify card numbers using the Luhn algorithm. Check format, length, and basic validity instantly.
            </p>
          </div>

          {/* Search Card */}
          <Card className="glass-card mb-8">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <Input
                  placeholder="Enter card number (e.g., 4532012345678901)"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleCheck()}
                  className="text-lg h-12 font-mono"
                  maxLength={23}
                />
                <Button onClick={handleCheck} size="lg" className="gap-2 px-8">
                  <Shield className="h-4 w-4" />
                  Validate
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          {checked && result && (
            <div className="space-y-6 animate-fade-in-up">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    Validation Result
                    {result.valid ? (
                      <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
                        <CheckCircle className="h-3.5 w-3.5 mr-1" />
                        Valid
                      </Badge>
                    ) : (
                      <Badge variant="destructive">
                        <XCircle className="h-3.5 w-3.5 mr-1" />
                        Invalid
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription>
                    {result.valid
                      ? "This card number passes the Luhn algorithm check."
                      : "This card number fails the Luhn algorithm check."}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="font-mono text-xl mb-6 p-4 bg-muted/30 rounded-lg text-center tracking-wider">
                    {result.formatted}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg bg-muted/30 text-center">
                      <div className="text-sm text-muted-foreground mb-1">Luhn Check</div>
                      <div className={`font-semibold ${result.valid ? "text-emerald-500" : "text-red-500"}`}>
                        {result.valid ? "Pass ✓" : "Fail ✗"}
                      </div>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/30 text-center">
                      <div className="text-sm text-muted-foreground mb-1">Network</div>
                      <div className="font-semibold">{result.network}</div>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/30 text-center">
                      <div className="text-sm text-muted-foreground mb-1">Length</div>
                      <div className="font-semibold">{result.length} digits</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Steps */}
              <Card className="glass-card">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-4">How Luhn Algorithm Works</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <span className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0">1</span>
                      <p>Starting from the rightmost digit, double every second digit.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0">2</span>
                      <p>If doubling results in a number greater than 9, subtract 9.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0">3</span>
                      <p>Sum all digits. If the total modulo 10 equals 0, the number is valid.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {checked && !result && (
            <Card className="glass-card">
              <CardContent className="pt-6 text-center py-12">
                <XCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Invalid Input</h3>
                <p className="text-muted-foreground">
                  Please enter a valid card number (at least 13 digits).
                </p>
              </CardContent>
            </Card>
          )}

          {/* Info */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="glass-card">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Zap className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-1">Instant Validation</h3>
                    <p className="text-sm text-muted-foreground">
                      Card validation is performed locally using the Luhn algorithm. No data is sent to any server.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-1">Privacy First</h3>
                    <p className="text-sm text-muted-foreground">
                      We never store or transmit card numbers. All processing happens in your browser.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
