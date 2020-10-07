import React, { memo, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../firebaseConfig';

const Profile = ({ user, updateUser }) => {
  const [newDisplayName, setNewDisplayName] = useState(user.displayName);
  const history = useHistory();

  // const getTwits = useCallback(async () => {
  //   const twits = await store
  //     .collection('twits')
  //     .where('uid', '==', user.uid)
  //     .orderBy('createdAt')
  //     .get();

  //   console.log(twits.docs.map((doc) => doc.data()));
  // }, [user.uid]);

  // useEffect(() => {
  //   getTwits();
  // }, [getTwits]);

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
      <button onClick={onLogoutClick}>로그아웃</button>
    </>
  );
};

export default memo(Profile);
