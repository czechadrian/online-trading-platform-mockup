import React, { createContext, useContext, useState } from 'react';

interface PortfolioContextType {
    balance: number;
    setBalance: (val: number) => void;
    portfolio: Array<{name: string, quantity: number}>;
    setPortfolio: (portfolio: Array<{name: string, quantity: number}>) => void;
}

export const PortfolioContext = createContext<PortfolioContextType | null>(null);

export const usePortfolio = () => {
    const context = useContext(PortfolioContext);
    if (!context) {
        throw new Error('usePortfolio must be used within a PortfolioProvider');
    }
    return context;
};

export const PortfolioProvider: React.FC = ({ children }) => {
    // 100k $ as initial given amount for buying/selling assets
    const [balance, setBalance] = useState(100000);
    const [portfolio, setPortfolio] = useState<Array<{name: string, quantity: number}>>([]);

    return (
        <PortfolioContext.Provider value={{ balance, setBalance, portfolio, setPortfolio }}>
            {children}
        </PortfolioContext.Provider>
    );
};