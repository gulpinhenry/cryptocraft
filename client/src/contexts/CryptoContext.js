import React, { createContext, useContext, useState } from 'react';

const CryptoContext = createContext();

export const useCryptoContext = () => useContext(CryptoContext);

export const CryptoProvider = ({ children }) => { //'children' is missing in props validation         react/prop-types
  const [currentticker, setCurrentTicker] = useState('btc');

  const handletickerchange = (ticker) => {
    setCurrentTicker(ticker);
  };

  return (
    <CryptoContext.Provider value={{ currentticker, handletickerchange }}>
      {children}
    </CryptoContext.Provider>
  );
};
