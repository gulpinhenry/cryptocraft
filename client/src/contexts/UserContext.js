import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [currentuser, setcurrentuser] = useState('Loading...');

  const handleuserchange = (username) => {
    setcurrentuser(username);
  };

  return (
    <UserContext.Provider value={{ currentuser, handleuserchange }}>
      {children}
    </UserContext.Provider>
  );
};
