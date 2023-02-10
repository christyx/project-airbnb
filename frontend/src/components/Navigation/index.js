import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import logo from './favicon.png'
import DemoUser from './demoUser';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <DemoUser />
        <LoginFormModal />
        <SignupFormModal />
      </>
    );
  }

  return (
    <div className='nav'>
      <div>
        <NavLink exact to="/">
          <img id='logo' src={logo} alt='airbnb-logo' />
          {/* <i class="fa-brands fa-airbnb"></i> */}
        </NavLink>
      </div>
      <div className='right-nav'>

        {/* <div className='nav_github'> */}
          <h4 className='nav_github_text'>
            <a className='about_text_creater' href="https://github.com/christyx" target="_blank" rel="noopener noreferrer">
              <div className='about_iconwithtext'>
                <img className='linkedin_icon' src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt='linkedin'>
                </img>
                <div>  Github</div>
              </div>

            </a>
          </h4>

          <h4 className='nav_github_text'>
            <a className='about_text_creater' href="https://www.linkedin.com/in/zhaoyang-xiu/" target="_blank" rel="noopener noreferrer">
              <div className='about_iconwithtext'>
                <img className='linkedin_icon' src="https://cdn-icons-png.flaticon.com/512/49/49408.png" alt='linkedin'>
                </img>
                <div>  LinkedIn</div>
              </div>


            </a>
          </h4>
        {/* </div> */}






        <NavLink id='host' to="/BecomeAHost">
          Become a Host
        </NavLink>
        <div className='nav-buttons'>
          {isLoaded && sessionLinks}
        </div>
      </div>
    </div>
  );
}

export default Navigation;
