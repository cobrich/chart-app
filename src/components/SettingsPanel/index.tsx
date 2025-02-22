import React from 'react';
import { TimeInterval } from '../../types';
import { useTheme } from '../../hooks/useTheme';

interface SettingsPanelProps {
    timeInterval: TimeInterval;
    setTimeInterval: (interval: TimeInterval) => void;
    autoUpdate: boolean;
    setAutoUpdate: (auto: boolean) => void;
}

const timeIntervals: { value: TimeInterval; label: string }[] = [
    { value: '7', label: '7 Days' },
    { value: '30', label: '30 Days' },
    { value: '90', label: '90 Days' },
    { value: '365', label: '1 Year' },
];

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
    timeInterval,
    setTimeInterval,
    autoUpdate,
    setAutoUpdate,
}) => {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <div className={`p-4 rounded-lg ${isDarkMode ? 'dark:bg-gray-800' : 'bg-white'} shadow-md`}>
            <div className="flex flex-wrap gap-4 items-center">
                {/* Time Interval Selector */}
                <div className="flex-1">
                    <label className="block text-sm font-medium mb-2 dark:text-white">
                        Time Interval
                    </label>
                    <select
                        value={timeInterval}
                        onChange={(e) => setTimeInterval(e.target.value as TimeInterval)}
                        className={`w-full p-2 rounded-lg border
                            ${isDarkMode 
                                ? 'dark:bg-gray-700 dark:text-white dark:border-gray-600' 
                                : 'bg-white text-gray-900 border-gray-300'}
                            focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    >
                        {timeIntervals.map((interval) => (
                            <option key={interval.value} value={interval.value}>
                                {interval.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Auto Update Toggle */}
                <div className="flex items-center gap-2">
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={autoUpdate}
                            onChange={(e) => setAutoUpdate(e.target.checked)}
                            className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 
                            peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer 
                            dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white 
                            after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white 
                            after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 
                            after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        <span className="ml-3 text-sm font-medium dark:text-white text-gray-900">
                            Auto Update
                        </span>
                    </label>
                </div>

                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    className={`p-2 rounded-lg ${
                        isDarkMode 
                            ? 'bg-gray-700 text-white hover:bg-gray-600' 
                            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    }`}
                >
                    {isDarkMode ? '☀️ Light' : '🌙 Dark'}
                </button>
            </div>
        </div>
    );
};