import React, {useState, useEffect}  from 'react';
import { objectIsEmpty } from '../utils';

const userContext = React.createContext();

function useUser() {
  const [
      user, 
      setUser
  ] = useState(() => 
    JSON.parse(localStorage.getItem('user')) || {}
  );

  const onLogin = (userEvent) => setUser(userEvent);

  const onLogout = () => setUser({});

  useEffect(
    () => {
      if (objectIsEmpty(user)) {
        localStorage.removeItem('user');
      } else {
        localStorage.setItem('user', JSON.stringify(user));
      }
      
    },
    [user],
  )
  return {
    user,
    onLogin,
    onLogout
  };
}

const UserProvider = ({ children }) => {

  const {
    user,
    onLogin,
    onLogout
  } = useUser();

    return (
      <userContext.Provider
        value={{
          user,
          onLogin,
          onLogout
        }}
      >
        {children}
      </userContext.Provider>
    );
}

const UserConsumer = userContext.Consumer;

export { UserProvider,  UserConsumer, userContext };
