import React, { useState, createContext, useContext, useEffect } from 'react';
import axios from 'axios';
// Create context
const userContext = createContext();

// AuthContextProvider component with login/logout logic
const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading,setLoading] = useState(true)
  useEffect(() =>{
     const verifyUser = async () =>{
           try{
            const token = localStorage.getItem('token')
            if(token){
             const response = await axios.get('http://localhost:5000/api/auth/verify',{
               headers: {
                "Authorization" : `Bearer ${token}`
               }
             }) 
             console.log(response)
             if(response.data.success){
                setUser(response.data.user)
             }
            } else{
                setUser(null)
                setLoading(false)
            }
           }catch(error){
            console.log(error)
            if(error.response && !error.response.data.error){
                setUser(null)
               }
           }finally{
                setLoading(false)
           }
     }
      verifyUser()
  },[])

  const login = (userInfo) => {
    setUser(userInfo);
    localStorage.setItem("token", "user"); // Example: storing token
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <userContext.Provider value={{ user, login, logout,loading }}>
      {children}
    </userContext.Provider>
  );
};

// Custom hook to access context
const useAuth = () => {
  const context = useContext(userContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
};

// Export both the provider and the custom hook
export default AuthContext;
export {useAuth};
