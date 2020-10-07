import React, { memo, useEffect, useState } from 'react';

import { store } from '../firebaseConfig';
import Twit from '../components/Twit';
import CreateTwit from '../components/CreateTwit';

const Home = ({ user }) => {
  const [twits, setTwits] = useState([]);

  useEffect(() => {
    store.collection('twits').onSnapshot((snapshot) => {
      setTwits(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    });
  }, []);

  return (
    <div>
      <CreateTwit user={user} />

      <ul>
        {twits.map((twit) => (
          <Twit key={twit.id} twit={twit} isOwner={twit.uid === user.uid} />
        ))}
      </ul>
    </div>
  );
};

export default memo(Home);
