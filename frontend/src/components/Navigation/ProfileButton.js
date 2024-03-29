import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
 // const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };


  return (
    <>
      <button className='one-button-open' id='openMenu' onClick={openMenu}>
        {/* <i class="fas fa-user-circle fa-xl"></i> */}
        <i class="fa-solid fa-bars fa-xl"></i>
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li>{user.username}</li>
          <li>{user.email}</li>
          <li>
            <NavLink id='manage-spot' to="/spots/current">
              manage my spots
            </NavLink>
            </li>
          <li>
            <NavLink id='manage-spot' to="/bookings">
              manage my bookings
            </NavLink>

          </li>
          <li>
            <button className='one-button' onClick={logout}>Log Out</button>
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
