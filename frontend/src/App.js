import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import GetAllSpots from "./components/Spots";
import GetSpot from './components/SpotsID';
import GetBeach from './components/Spots/beachfront'
import GetMansion from './components/Spots/mansion'
import GetLuxe from './components/Spots/luxe'
import GetTrending from './components/Spots/trending'
import GetInternational from './components/Spots/international'
import GetView from './components/Spots/views'
import CreateSpot from './components/CreateSpot'
import GetUserSpots from './components/UserSpot'
import EditUserSpots from './components/EditSpot'
import CreateReview from './components/CreateReview'
import * as sessionActions from "./store/session";
import GetBooking from './components/Bookings'
import Navigation from "./components/Navigation";
import EditBooking from "./components/Bookings/editbooking"

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/spots/current">
            <GetUserSpots />
          </Route>
          <Route path="/spots/:id/edit">
            <EditUserSpots />
          </Route>
          <Route exact path="/">
            <GetAllSpots />
          </Route>
          <Route exact path="/beachfront">
            <GetBeach />
          </Route>
          <Route exact path="/mansions">
            <GetMansion />
          </Route>
          <Route exact path="/views">
            <GetView />
          </Route>
          <Route exact path="/trending">
            <GetTrending />
          </Route>
          <Route exact path="/luxe">
            <GetLuxe />
          </Route>
          <Route exact path="/international">
            <GetInternational />
          </Route>
          <Route path="/spots/:id/addReview">
            <CreateReview />
          </Route>
          <Route path="/spots/:id">
            <GetSpot />
          </Route>
          <Route path="/BecomeAHost">
            <CreateSpot />
          </Route>
          <Route path="/bookings">
            <GetBooking />
          </Route>
          <Route path="/edit/bookings/:bookingId">
            <EditBooking />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
