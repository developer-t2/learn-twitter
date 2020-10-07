import React, { memo, useCallback, useEffect, useState } from 'react';

import Router from './Router';

import { auth } from '../firebaseConfig';

function App() {
  const [init, setInit] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        setUser(null);
      }

      setInit(true);
    });
  }, []);

  const updateUser = useCallback(() => {
    const user = auth.currentUser;

    setUser({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  }, []);

  return <>{init ? <Router user={user} updateUser={updateUser} /> : 'Loading...'}</>;
}

export default memo(App);
