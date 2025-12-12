import React from 'react';
import { useAuth } from "../context/AuthProvider"; 
import { toast } from 'react-hot-toast';

function Logout() {
  const [authUser, setAuthUser] = useAuth();

  const handleLogout = () => {
    try {
      setAuthUser(null);           // Clear user from context
      localStorage.removeItem("Users");
      toast.success("Logout Successful");
            setTimeout(() => {
                window.location.reload();
              },3000);
    } catch (error) {
      toast.error("Logout Failed: " + error);
      setTimeout(() => {},2000);
    }
  };

  return (
    <div>
      <button 
        className="px-3 py-2 bg-black text-white rounded-md cursor-pointer"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

export default Logout;
