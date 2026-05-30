// Card utility functions

// Luhn algorithm for card validation
export function luhnCheck(cardNumber: string): boolean {
  const digits = cardNumber.replace(/\D/g, "");
  if (digits.length < 13 || digits.length > 19) return false;

  let sum = 0;
  let isSecond = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i], 10);

    if (isSecond) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    isSecond = !isSecond;
  }

  return sum % 10 === 0;
}

// Detect card network from number
export function detectNetwork(cardNumber: string): string {
  const num = cardNumber.replace(/\D/g, "");

  if (/^4/.test(num)) return "Visa";
  if (/^5[1-5]/.test(num) || /^2[2-7]/.test(num)) return "Mastercard";
  if (/^3[47]/.test(num)) return "American Express";
  if (/^6(?:011|5)/.test(num)) return "Discover";
  if (/^35(?:2[89]|[3-8])/.test(num)) return "JCB";
  if (/^3(?:0[0-5]|[68])/.test(num)) return "Diners Club";
  if (/^62/.test(num)) return "UnionPay";
  if (/^8600/.test(num)) return "UzCard";
  if (/^9860/.test(num)) return "Humo";
  if (/^5610/.test(num)) return "Maestro";

  return "Unknown";
}

// Detect card type (debit/credit/prepaid)
export function detectCardType(cardNumber: string): string {
  const num = cardNumber.replace(/\D/g, "");
  const prefix = parseInt(num.substring(0, 6), 10);

  // Common credit card BIN ranges
  const creditRanges = [
    [400000, 499999], // Visa credit
    [510000, 559999], // Mastercard credit
    [340000, 349999], // Amex
    [360000, 369999], // Diners
    [601100, 601199], // Discover
  ];

  // Common debit card BIN ranges
  const debitRanges = [
    [400000, 499999], // Visa debit (overlap with credit)
    [510000, 559999], // Mastercard debit (overlap)
  ];

  // For demo purposes, use a simple heuristic
  if (prefix >= 400000 && prefix <= 499999) {
    return parseInt(num[6] || "0", 10) % 2 === 0 ? "Credit" : "Debit";
  }

  return "Unknown";
}

// Get card level
export function detectCardLevel(cardNumber: string): string {
  const num = cardNumber.replace(/\D/g, "");
  const prefix6 = num.substring(0, 6);

  // Classic BIN ranges (simplified)
  const premium = ["453201", "542523", "374245", "453999"];
  const gold = ["453202", "542524", "374246"];
  const platinum = ["453203", "542525", "374247"];
  const infinite = ["453204", "542526"];

  if (infinite.includes(prefix6)) return "Infinite";
  if (platinum.includes(prefix6)) return "Platinum";
  if (gold.includes(prefix6)) return "Gold";
  return "Classic";
}

// BIN database (sample data for demo)
export interface BinInfo {
  bin: string;
  bank: string;
  country: string;
  countryCode: string;
  network: string;
  type: string;
  level: string;
  brand: string;
}

const binDatabase: Record<string, Omit<BinInfo, "bin">> = {
  "453201": { bank: "JPMorgan Chase", country: "United States", countryCode: "US", network: "Visa", type: "Credit", level: "Classic", brand: "Visa Classic" },
  "453999": { bank: "Citibank", country: "United States", countryCode: "US", network: "Visa", type: "Credit", level: "Gold", brand: "Visa Gold" },
  "542523": { bank: "Bank of America", country: "United States", countryCode: "US", network: "Mastercard", type: "Credit", level: "Gold", brand: "Mastercard Gold" },
  "374245": { bank: "American Express", country: "United States", countryCode: "US", network: "Amex", type: "Credit", level: "Green", brand: "Amex Green" },
  "400000": { bank: "Capital One", country: "United States", countryCode: "US", network: "Visa", type: "Debit", level: "Classic", brand: "Visa Debit" },
  "510000": { bank: "Chase", country: "United States", countryCode: "US", network: "Mastercard", type: "Debit", level: "Standard", brand: "Mastercard Debit" },
  "601100": { bank: "Discover Financial", country: "United States", countryCode: "US", network: "Discover", type: "Credit", level: "Standard", brand: "Discover" },
  "352800": { bank: "JCB International", country: "Japan", countryCode: "JP", network: "JCB", type: "Credit", level: "Standard", brand: "JCB" },
  "620000": { bank: "UnionPay", country: "China", countryCode: "CN", network: "UnionPay", type: "Debit", level: "Standard", brand: "UnionPay" },
  "457100": { bank: "Sberbank", country: "Russia", countryCode: "RU", network: "Visa", type: "Debit", level: "Classic", brand: "Visa Classic" },
  "427601": { bank: "Sberbank", country: "Russia", countryCode: "RU", network: "Visa", type: "Credit", level: "Gold", brand: "Visa Gold" },
  "548900": { bank: "Tinkoff Bank", country: "Russia", countryCode: "RU", network: "Mastercard", type: "Credit", level: "Platinum", brand: "Mastercard Platinum" },
  "416900": { bank: "DBS Bank", country: "Singapore", countryCode: "SG", network: "Visa", type: "Credit", level: "Platinum", brand: "Visa Platinum" },
  "491700": { bank: "Barclays", country: "United Kingdom", countryCode: "GB", network: "Visa", type: "Debit", level: "Classic", brand: "Visa Debit" },
  "540000": { bank: "HSBC", country: "United Kingdom", countryCode: "GB", network: "Mastercard", type: "Credit", level: "Standard", brand: "Mastercard Standard" },
  "455600": { bank: "Vietcombank", country: "Vietnam", countryCode: "VN", network: "Visa", type: "Credit", level: "Gold", brand: "Visa Gold" },
  "530000": { bank: "Techcombank", country: "Vietnam", countryCode: "VN", network: "Mastercard", type: "Credit", level: "Platinum", brand: "Mastercard Platinum" },
};

export function lookupBin(bin: string): BinInfo | null {
  const cleanBin = bin.replace(/\D/g, "").substring(0, 6);
  if (cleanBin.length < 6) return null;

  // Check exact match first
  if (binDatabase[cleanBin]) {
    return { bin: cleanBin, ...binDatabase[cleanBin] };
  }

  // Check prefix match (first 4 digits)
  const prefix4 = cleanBin.substring(0, 4);
  for (const [key, value] of Object.entries(binDatabase)) {
    if (key.startsWith(prefix4)) {
      return { bin: cleanBin, ...value };
    }
  }

  // Fallback: detect network from number
  const network = detectNetwork(cleanBin);
  if (network !== "Unknown") {
    return {
      bin: cleanBin,
      bank: "Unknown Bank",
      country: "Unknown",
      countryCode: "XX",
      network,
      type: "Unknown",
      level: "Unknown",
      brand: network,
    };
  }

  return null;
}

// Format card number with spaces
export function formatCardNumber(value: string): string {
  const num = value.replace(/\D/g, "");
  const groups = num.match(/.{1,4}/g);
  return groups ? groups.join(" ") : num;
}

// Mask card number
export function maskCardNumber(cardNumber: string): string {
  const num = cardNumber.replace(/\D/g, "");
  if (num.length <= 6) return num;
  return num.substring(0, 6) + "*".repeat(num.length - 10) + num.substring(num.length - 4);
}
