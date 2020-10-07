import React, { useCallback, useState } from 'react';
import { auth } from '../firebaseConfig';

const initialUser = { email: '', password: '' };

const AuthForm = () => {
  const [user, setUser] = useState(initialUser);
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState('');
  const { email, password } = user;

  const onToggleAccount = useCallback(() => setNewAccount((prevNewAccount) => !prevNewAccount), []);

  const onChange = useCallback(
    (e) => {
      const { name, value } = e.target;

      setUser({
        ...user,
        [name]: value,
      });
    },
    [user]
  );

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      let data = null;

      try {
        if (newAccount) {
          data = await auth.createUserWithEmailAndPassword(email, password);
        } else {
          data = await auth.signInWithEmailAndPassword(email, password);
        }

        console.log(data);
      } catch (err) {
        setError(err.message);
      }
    },
    [newAccount, email, password]
  );

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          name="email"
          value={email}
          placeholder="Email"
          required
          onChange={onChange}
        />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="Password"
          required
          onChange={onChange}
        />
        <button type="submit">{newAccount ? 'Create Account' : 'Login'}</button>
        {error}
      </form>

      <span onClick={onToggleAccount}>{newAccount ? 'Signin' : 'Create Account'}</span>
    </>
  );
};

export default AuthForm;
