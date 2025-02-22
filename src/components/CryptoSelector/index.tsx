import React from 'react';
import { CryptoCurrency } from '../../types';
import { useTheme } from '../../hooks/useTheme';

interface CryptoSelectorProps {
    selectedCrypto: string;
    onSelectCrypto: (cryptoId: string) => void;
}

const cryptocurrencies: CryptoCurrency[] = [
    { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC' },
    { id: 'ethereum', name: 'Ethereum', symbol: 'ETH' },
    { id: 'dogecoin', name: 'Dogecoin', symbol: 'DOGE' },
    { id: 'ripple', name: 'Ripple', symbol: 'XRP' },
];

export const CryptoSelector: React.FC<CryptoSelectorProps> = ({
    selectedCrypto,
    onSelectCrypto,
}) => {
    const { isDarkMode } = useTheme();

    return (
        <div className={`p-4 ${isDarkMode ? 'dark:bg-gray-800' : 'bg-white'}`}>
            <select
                value={selectedCrypto}
                onChange={(e) => onSelectCrypto(e.target.value)}
                className={`
                    w-full p-2 rounded-lg border
                    ${isDarkMode 
                        ? 'dark:bg-gray-700 dark:text-white dark:border-gray-600' 
                        : 'bg-white text-gray-900 border-gray-300'}
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                `}
            >
                {cryptocurrencies.map((crypto) => (
                    <option key={crypto.id} value={crypto.id}>
                        {crypto.name} ({crypto.symbol})
                    </option>
                ))}
            </select>
        </div>
    );
};