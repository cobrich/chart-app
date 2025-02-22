import React, { ReactNode, useState } from 'react';
import { ThemeContext } from '../../context/theme';

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleTheme = () => {
        setIsDarkMode(prev => !prev);
    };

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            <div className={`${isDarkMode ? 'dark' : ''}`}>
                {children}
            </div>
        </ThemeContext.Provider>
    );
}; 