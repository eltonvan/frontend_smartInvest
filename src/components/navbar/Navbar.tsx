import "./navbar.scss";
import { useState } from 'react';
import LoginForm from "../loginForm/LoginForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // Import QueryClientProvider

const Navbar = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);

  const openLoginForm = () => {
    setShowLoginForm(true);
  };

  // const queryClient = new QueryClient();


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
        {/* <QueryClientProvider client={queryClient}> */}
        <div className="user" onClick={openLoginForm}>
          
            {/* // </QueryClientProvider> */}
          
            <>
              <img
                src="https://images.pexels.com/photos/11038549/pexels-photo-11038549.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
                alt=""
              />
              <span>Sign in</span>
            </>
          
        </div>
        {showLoginForm && <LoginForm slug="Sign In" setOpen={setShowLoginForm} />}
        <img src="/settings.svg" alt="" className="icon" />
      </div>
    </div>
  );
};

export default Navbar;
