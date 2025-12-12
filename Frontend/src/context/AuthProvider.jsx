import React from 'react'

export const AuthContext = React.createContext();
export default function AuthProvider({children}) { // children (app.jsx, navbar.jsx banner.jsx etc) will be wrapped inside AuthProvider
  const initialAuthUser = localStorage.getItem("Users");
  const [authUser, setAuthUser] = React.useState(initialAuthUser ? JSON.parse(initialAuthUser) : undefined);

return(
    <AuthContext.Provider value={[authUser, setAuthUser]}>
        {children}
    </AuthContext.Provider>
);
}
export const useAuth = () => React.useContext(AuthContext);// custom hook to use auth context  
// for acessing user globally in the app we will use this hook