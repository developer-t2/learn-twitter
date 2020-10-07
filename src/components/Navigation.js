import React, { memo } from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({ user }) => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/" replace>
            홈
          </Link>
        </li>
        <li>
          <Link to="/profile" replace>
            {user.displayName} 프로필
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default memo(Navigation);
