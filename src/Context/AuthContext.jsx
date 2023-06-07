import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../Firebase/Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [pending, setPending] = useState(true);

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = async (email, password, role) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    user.role = role; // Set the role property for the user
    setUser(user);
  
    // Save the role and user in localStorage
    localStorage.setItem('userRole', role);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const logout = () => {
    // Remove the role and user from localStorage
    localStorage.removeItem('userRole');
    localStorage.removeItem('user');
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setPending(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  if (pending) {
    return <>Loading...</>;
  }

  return (
    <UserContext.Provider value={{ createUser, user, logout, signIn }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
