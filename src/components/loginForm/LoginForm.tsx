import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import './loginForm.scss';
import Cookies from 'js-cookie'; // Import Cookies from 'js-cookie'


type LoginFormData = {
    username: string;
    password: string;
    //  email: string; 
  };

type LoginFormProps = {
  slug: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const LoginForm: React.FC<LoginFormProps> = (props) => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    password: '',
    // email: '',
  });
  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/dj-rest-auth/login/`, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: formData.username, 
            password: formData.password, 
           // email: formData.email, 
          }),
        });
   
        const responseData = await response.json()
        console.log("string response", response)
        
        console.log("auth", responseData.key);
        console.log("Response Data:", responseData);
        console.log("session", responseData.session) 

        
  
        if (!response.ok) {
          console.log("string response", response.json().then(data => setError(data)))

          throw new Error('Network response was not ok');
        }

        if (responseData.key) {
            // Store authentication token in a cookie using js-cookie
            Cookies.set('authToken', responseData.key, { expires: 1, path: '/' });
          }

          if (responseData.sessionid) {
            // Store sessionid in a cookie using js-cookie
            Cookies.set('sessionid', responseData.sessionid, { expires: 1, path: '/' });
          }
          else {
          console.log("no sessionid")}
  
        return response;
      } catch (error) {
        throw new Error('Error in the fetch request');
      }
    },
    onSuccess: () => {
      // Code to execute on mutation success
      queryClient.invalidateQueries([`all${props.slug}s`]);
    },
  });
  

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
        await mutation.mutateAsync();
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error:', error.message);
            // Show an appropriate error message to the user
        }
    }
};
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  return (
    <div className="loginForm">
      <div className="modal">
        <span className="close" onClick={() => props.setOpen(false)}>
          x
        </span>
        <h1>{props.slug}</h1>
        <form onSubmit={handleSubmit}>
          <div className="item">
            <label>Username</label>
            <input
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={(e) => handleInputChange(e, 'username')}
              required
            />
          </div>

          <div className="item">
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => handleInputChange(e, 'password')}
              required
            />
          </div>
            {/* <div className="item">
                <label>Email</label>
                <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => handleInputChange(e, 'email')}
                required
                />
            </div> */}
 
          <button type="submit">Send</button>
          {error && <p>{error.username}</p>}
          
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
