import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import './userForm.scss';

type Props = {
  slug: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const UserForm = (props: Props) => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password1: '',
    password2: '',
  });

  const mutation = useMutation({
    mutationFn: async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/dj-rest-auth/registration/`, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            password1: formData.password1,
            password2: formData.password2,
          }),
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        return response.json();
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

    if (formData.password1 !== formData.password2) {
      // Passwords don't match, handle accordingly (frontend validation)
      return alert("Passwords don't match!");
    }

    try {
      await mutation.mutateAsync();
    } catch (error) {
      // Handle backend validation errors or network issues
      console.error('Error:', error.message);
      // Show an appropriate error message to the user
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  return (
    <div className="userForm">
      <div className="modal">
        <span className="close" onClick={() => props.setOpen(false)}>
          x
        </span>
        <h1>Sign Up {props.slug}</h1>
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
            <label>Email</label>
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => handleInputChange(e, 'email')}
              required
            />
          </div>
          <div className="item">
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              value={formData.password1}
              onChange={(e) => handleInputChange(e, 'password1')}
              required
            />
          </div>
          <div className="item">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm Password"
              value={formData.password2}
              onChange={(e) => handleInputChange(e, 'password2')}
              required
            />
          </div>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
