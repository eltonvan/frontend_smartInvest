import "./navbar.scss";
import { useState } from 'react';
import UserForm from '../userForm/UserForm';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // Import QueryClientProvider

const Navbar = () => {
  const [showUserForm, setShowUserForm] = useState(false);

  const openUserForm = () => {
    setShowUserForm(true);
  };

  const queryClient = new QueryClient();


  return (
    <div className="navbar">
      <div className="logo">
        <img src="logoSI.svg" alt="" />
        <span>Smart Invest</span>
      </div>
      <div className="icons">
        <img src="/search.svg" alt="" className="icon" />
        <img src="/app.svg" alt="" className="icon" />
        <img src="/expand.svg" alt="" className="icon" />
        <div className="notification">
          <img src="/notifications.svg" alt="" />
          <span>1</span>
        </div>
        <div className="user" onClick={openUserForm}>
          {showUserForm ? (
            <QueryClientProvider client={queryClient}>
            <UserForm
              slug="signup" // Or any appropriate value for slug
              setOpen={setShowUserForm}
            />
            </QueryClientProvider>
          ) : (
            <>
              <img
                src="https://images.pexels.com/photos/11038549/pexels-photo-11038549.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
                alt=""
              />
              <span>Sign up/Sign in</span>
            </>
          )}
        </div>
        <img src="/settings.svg" alt="" className="icon" />
      </div>
    </div>
  );
};

export default Navbar;
