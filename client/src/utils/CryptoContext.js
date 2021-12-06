import React, { createContext, useContext, useState } from 'react';

// Initialize new context for students
const CryptoContext = createContext();

// We create a custom hook to provide immediate usage of the student context value (students) in other components
export const useCryptoContext = () => useContext(CryptoContext);

// The provider is responsible for holding our state, updating the state, and persisting values to the children
export const CryptoProvider = ({ children }) => {
    const [currentTicker, setCurrentTicker] = useState('btc');

  // Function to add a student
  const handleTickerChange = (ticker) => {
      // console.log("here " + ticker);
    setCurrentTicker(ticker);
}
    

  // The value prop expects an initial state object
  return (
    <CryptoContext.Provider
      value={{ currentTicker, handleTickerChange }}
    >
      {/* We render children in our component so that any descendent can access the value from the provider */}
      {children}
    </CryptoContext.Provider>
  );
};
