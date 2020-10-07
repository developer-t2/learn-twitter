import React, { memo, useCallback } from 'react';
import AuthForm from '../components/AuthForm';
import { fb, auth } from '../firebaseConfig';

const Auth = () => {
  const onSocialClick = useCallback(async (e) => {
    const { name } = e.target;

    let provider = null;

    if (name === 'google') {
      provider = new fb.auth.GoogleAuthProvider();
    } else if (name === 'github') {
      provider = new fb.auth.GithubAuthProvider();
    }

    try {
      await auth.signInWithPopup(provider);
    } catch (err) {
      console.error(err.message);
    }
  }, []);

  return (
    <div>
      <AuthForm />

      <div>
        <button name="google" onClick={onSocialClick}>
          Continue with Google
        </button>
        <button name="github" onClick={onSocialClick}>
          Continue with GitHub
        </button>
      </div>
    </div>
  );
};

export default memo(Auth);
