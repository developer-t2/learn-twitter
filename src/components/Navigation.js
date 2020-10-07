import React, { memo } from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({ user }) => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/" replace>
            Home
          </Link>
        </li>
        <li>
          <Link to="/profile" replace>
            {user.displayName}'s Profile
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default memo(Navigation);
