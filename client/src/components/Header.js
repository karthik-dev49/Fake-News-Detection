import './Header.css'

// Header.js
import {React} from 'react';
import PropTypes from 'prop-types';
import { useUser } from '../contexts/UserContext';
import { Link } from 'react-router-dom';

export const Header = ({ title, profile }) => {
  const { userName, logout, logState } = useUser();

  const handleLogState = () => {
      logout();
  };
  return (
    <div className="header">
      <h1>{title}</h1>
      {profile ? (
        <div className="profile">
          <div className="userName">{userName}</div>
          <ol className="list">
            <Link to="/auth">
              <li onClick={() => handleLogState()}>{logState}</li>
            </Link>
          </ol>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

Header.defaultProps = {
  title: 'Header title here',
  profile: false,
};

Header.propTypes = {
  title: PropTypes.string,
  profile: PropTypes.bool,
};
