import React, { memo, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../firebaseConfig';

const Profile = ({ user, updateUser }) => {
  const [newDisplayName, setNewDisplayName] = useState(user.displayName);
  const history = useHistory();

  const onLogoutClick = useCallback(async () => {
    try {
      await auth.signOut();

      history.push('/');
    } catch (err) {
      console.error(err.message);
    }
  }, [history]);

  const onChange = useCallback((e) => {
    const { value } = e.target;

    setNewDisplayName(value);
  }, []);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (user.displayName !== newDisplayName) {
        await user.updateProfile({
          displayName: newDisplayName,
        });

        updateUser();
      }
    },
    [user, newDisplayName, updateUser]
  );

  return (
    <>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="Display Name" value={newDisplayName} onChange={onChange} />
        <button type="submit">Update Profile</button>
      </form>
      <button onClick={onLogoutClick}>Logout</button>
    </>
  );
};

export default memo(Profile);
