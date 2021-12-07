import React, { createContext, useContext, useState } from 'react';

const CryptoContext = createContext();

export const useCryptoContext = () => useContext(CryptoContext);

export const CryptoProvider = ({ children }) => {
    const [currentTicker, setCurrentTicker] = useState('btc');

  const handleTickerChange = (ticker) => {
    setCurrentTicker(ticker);
}

  return (
    <CryptoContext.Provider
      value={{ currentTicker, handleTickerChange }}
    >
      {children}
    </CryptoContext.Provider>
  );
};
