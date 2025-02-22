import React, { useMemo } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import { Bar } from 'react-chartjs-2';
import { useTheme } from '../../hooks/useTheme';
import { CryptoData } from '../../types';

// Регистрируем компоненты Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    zoomPlugin
);

interface CryptoChartProps {
    data: CryptoData | null;
    isLoading: boolean;
    error: string | null;
    timeInterval: string;
}

export const CryptoChart: React.FC<CryptoChartProps> = ({
    data,
    isLoading,
    error,
    timeInterval
}) => {
    const { isDarkMode } = useTheme();

    const chartData = useMemo(() => {
        if (!data) return {
            labels: [],
            datasets: [{
                label: 'Price USD',
                data: [],
                backgroundColor: isDarkMode ? 'rgba(59, 130, 246, 0.5)' : 'rgba(59, 130, 246, 0.8)',
                borderColor: isDarkMode ? 'rgba(59, 130, 246, 0.8)' : 'rgba(59, 130, 246, 1)',
                borderWidth: 1,
            }]
        };

        // Сортируем данные по времени (от старых к новым)
        const sortedData = [...data.prices].sort((a, b) => a[0] - b[0]);
        
        // Группируем данные по дате
        const groupedData = sortedData.reduce((acc, [timestamp, price]) => {
            const date = new Date(timestamp);
            const dateKey = date.toLocaleDateString('ru-RU', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit'
            });
            acc[dateKey] = price;
            return acc;
        }, {} as Record<string, number>);

        // Сортируем даты
        const sortedLabels = Object.keys(groupedData).sort((a, b) => {
            const [dayA, monthA, yearA] = a.split('.');
            const [dayB, monthB, yearB] = b.split('.');
            const dateA = new Date(+`20${yearA}`, +monthA - 1, +dayA);
            const dateB = new Date(+`20${yearB}`, +monthB - 1, +dayB);
            return dateA.getTime() - dateB.getTime();
        });
        
        // Определяем количество дней на основе выбранного интервала
        const daysToShow = parseInt(timeInterval);
        const labels = sortedLabels.slice(-daysToShow);
        const prices = labels.map(label => groupedData[label]);

        return {
            labels,
            datasets: [
                {
                    label: 'Price USD',
                    data: prices,
                    backgroundColor: isDarkMode ? 'rgba(59, 130, 246, 0.5)' : 'rgba(59, 130, 246, 0.8)',
                    borderColor: isDarkMode ? 'rgba(59, 130, 246, 0.8)' : 'rgba(59, 130, 246, 1)',
                    borderWidth: 1,
                },
            ],
        };
    }, [data, isDarkMode, timeInterval]);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: isDarkMode ? '#fff' : '#000',
                },
            },
            title: {
                display: true,
                text: 'Cryptocurrency Price Chart',
                color: isDarkMode ? '#fff' : '#000',
            },
            zoom: {
                pan: {
                    enabled: true,
                    mode: 'x' as const,
                    modifierKey: 'shift' as const,
                },
                zoom: {
                    wheel: {
                        enabled: true,
                    },
                    pinch: {
                        enabled: true,
                    },
                    mode: 'x' as const,
                }
            }
        },
        scales: {
            x: {
                grid: {
                    color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                },
                ticks: {
                    color: isDarkMode ? '#fff' : '#000',
                }
            },
            y: {
                grid: {
                    color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                },
                ticks: {
                    color: isDarkMode ? '#fff' : '#000',
                }
            },
        },
        animation: {
            duration: 750,
        },
    };

    if (isLoading) {
        return (
            <div className="w-full h-[400px] flex justify-center items-center bg-white dark:bg-gray-800 rounded-lg">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full h-[400px] flex justify-center items-center bg-white dark:bg-gray-800 rounded-lg">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    if (!data) {
        return null;
    }

    return (
        <div className="w-full p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <div className="w-full h-[400px]">
                <Bar data={chartData} options={options} />
            </div>
        </div>
    );
};