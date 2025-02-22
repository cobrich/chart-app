export interface CryptoData {
    prices: [number, number][];  // [timestamp, price]
    market_caps: [number, number][];
    total_volumes: [number, number][];
}

export type TimeInterval = '7' | '30' | '90' | '365';

export interface CryptoCurrency {
    id: string;
    name: string;
    symbol: string;
}

export interface ThemeContextType {
    isDarkMode: boolean;
    toggleTheme: () => void;
}