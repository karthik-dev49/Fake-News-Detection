import { createContext, useContext, useState } from 'react';
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const storedUserName = sessionStorage.getItem('userName') || '';
  const storedLogState = sessionStorage.getItem('logState') || 'login';

  const [userName, setUserName] = useState(storedUserName);
  const [logState, setLogState] = useState(storedLogState);

  const login = (user) => {
    setUserName(user);
    setLogState('Logout');
    // You may set session storage here if needed
    sessionStorage.setItem('userName', user);
    sessionStorage.setItem('logState', 'Logout');
  };

  const logout = () => {
    setUserName('');
    setLogState('Login');
    // Clear session storage on logout
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('logState');
    // You may add additional logout logic here
  };

  return (
    <UserContext.Provider value={{ userName, setUserName, login, logout, logState }}>
      {children}
    </UserContext.Provider>
  );
};


export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
