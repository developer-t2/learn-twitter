import React, { useCallback, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { storage, store } from '../firebaseConfig';

const CreateTwit = ({ user }) => {
  const [twit, setTwit] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      let imageUrl = null;

      try {
        if (imageFile) {
          const storageRef = storage.ref().child(`${user.uid}/${uuidv4()}`);

          const image = await storageRef.putString(imageFile, 'data_url');
          imageUrl = await image.ref.getDownloadURL();
        }

        await store.collection('twits').add({
          uid: user.uid,
          createdAt: Date.now(),
          text: twit,
          imageUrl,
        });

        setTwit('');
        setImageFile(null);
      } catch (err) {
        console.error(err.message);
      }
    },
    [user.uid, imageFile, twit, setTwit]
  );

  const onChange = useCallback(
    (e) => {
      const { value } = e.target;

      setTwit(value);
    },
    [setTwit]
  );

  const onFileChange = useCallback((e) => {
    const { files } = e.target;
    const reader = new FileReader();

    reader.readAsDataURL(files[0]);

    reader.addEventListener('loadend', (e) => {
      const { result } = e.currentTarget;

      setImageFile(result);
    });
  }, []);

  const onClearClick = useCallback(() => {
    setImageFile(null);
  }, []);

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="What's on your mind?"
        maxLength={120}
        value={twit}
        onChange={onChange}
      />
      <input type="file" accept="image/*" onChange={onFileChange} />
      <button type="submit">Twit</button>

      {imageFile && (
        <div>
          <img src={imageFile} alt="Preview" width="100px" />

          <button onClick={onClearClick}>Clear</button>
        </div>
      )}
    </form>
  );
};

export default CreateTwit;
