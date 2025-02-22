import axios from 'axios';
import { CryptoData } from '../types';

const BASE_URL = 'https://api.coingecko.com/api/v3';

export const getCryptoData = async (
    cryptoId: string,
    days: string,
    currency: string = 'usd'
): Promise<CryptoData> => {
    try {
        const response = await axios.get(
            `${BASE_URL}/coins/${cryptoId}/market_chart`,
            {
                params: {
                    vs_currency: currency,
                    days: days,
                }
            }
        );
        return response.data;
    } catch {
        throw new Error('Failed to fetch crypto data');
    }
};
