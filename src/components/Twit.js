import React, { memo, useCallback, useState } from 'react';
import { storage, store } from '../firebaseConfig';

const Twit = ({ twit, isOwner }) => {
  const [newTwit, setNewTwit] = useState(twit.text);
  const [edit, setEdit] = useState(false);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      try {
        await store.doc(`twits/${twit.id}`).update({
          text: newTwit,
        });

        setEdit(false);
      } catch (err) {
        console.error(err.message);
      }
    },
    [twit.id, newTwit]
  );

  const onChange = useCallback((e) => {
    const { value } = e.target;

    setNewTwit(value);
  }, []);

  const onEditToggle = useCallback(() => setEdit((prevEdit) => !prevEdit), []);

  const onDeleteClick = useCallback(async () => {
    const isDelete = window.confirm('Are you sure you want to delete this twit?');

    if (isDelete) {
      try {
        await store.doc(`twits/${twit.id}`).delete();
        await storage.refFromURL(twit.imageUrl).delete();
      } catch (err) {
        console.error(err.message);
      }
    }
  }, [twit.id, twit.imageUrl]);

  return (
    <li>
      {edit && isOwner ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              required
              placeholder="Edit your twit"
              value={newTwit}
              onChange={onChange}
            />

            <button type="submit">Update</button>
          </form>

          <button onClick={onEditToggle}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{twit.text}</h4>
          {twit.imageUrl && <img src={twit.imageUrl} alt={'Twit'} width="100px" />}

          {isOwner && (
            <>
              <button onClick={onEditToggle}>Edit</button>
              <button onClick={onDeleteClick}>Delete</button>
            </>
          )}
        </>
      )}
    </li>
  );
};

export default memo(Twit);
