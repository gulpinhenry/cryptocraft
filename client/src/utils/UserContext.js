import React, { createContext, useContext, useState } from 'react';

// export const UserContext = createContext();

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [currentuser, setcurrentuser] = useState('test');

  const handleuserchange = (username) => {
    setcurrentuser(username);
  }

  // this.state = {
  //   currentUser: null,
  // };

  return (
    <UserContext.Provider
    value={{ currentuser, handleuserchange }}
    >
      {children}
    </UserContext.Provider>
  );
};

