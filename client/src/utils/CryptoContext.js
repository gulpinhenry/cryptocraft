import React, { createContext, useContext, useState } from 'react';

const CryptoContext = createContext();

export const useCryptoContext = () => useContext(CryptoContext);

export const CryptoProvider = ({ children }) => { //'children' is missing in props validation         react/prop-types
  const [currentticker, setCurrentTicker] = useState('btc');

  const handletickerchange = (ticker) => {
    setCurrentTicker(ticker);
  };

  return (
    <CryptoContext.Provider
      value={{ currentticker, handletickerchange }} //The object passed as the value prop to the Context provider (at line 16) changes every render. To fix this consider wrapping it in a useMemo hook  react/jsx-no-constructed-context-values
    >
      {children}
    </CryptoContext.Provider>
  );
};
