import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { getBookingsThunk } from "../../store/bookings"
import { getSpotsThunk } from "../../store/spots"
import './bookings.css'

function GetBooking() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => { dispatch(getBookingsThunk(sessionUser.id)) }, [dispatch]);
  useEffect(() => { dispatch(getSpotsThunk()) }, [dispatch]);
  const history = useHistory()

  // const bookings = useSelector((state) => Object.values(state.bookings.Bookings))

  const bookings = useSelector((state) => state.bookings)
  const spots = useSelector((state) => state.spots.allSpots)

  console.log(bookings)

  return (
    <div>
      {Array.isArray(bookings) && (bookings?.map((booking?) => {
        return (
          <div className="bookings_display_all">

            <img src={spots[booking?.spotId - 1]?.previewImage}
              alt='spot-airbnb'
              className="bookings_image"
            />

            <div className="bookings_display_name">
             
                <NavLink className="bookings_name"  key={booking?.spotId} to={`/spots/${booking?.spotId}`}>
                     {spots[booking?.spotId - 1]?.name}
                </NavLink>



              <div className="bookings_address">
                Address: {spots[booking?.spotId - 1]?.address}
                , {spots[booking?.spotId - 1]?.city}
                , {spots[booking?.spotId - 1]?.state}
              </div>
              <div className="bookings_date">
                Check-In:  {booking?.startDate} 3pm
              </div>
              <div className="bookings_date">
                Check-Out:  {booking?.endDate}  11am
              </div>
              <div className="bookings_icon">
                <div classname="bookings_icon_one">
                  <i  class="fa-solid fa-pen-to-square fa-2xl"></i>
                  </div>
                <div classname="bookings_icon_one">
                  <i class="fa-solid fa-trash fa-2xl"></i>
                </div>

              </div>

            </div>

          </div>

        )
      }))}
    </div>
  )
}

export default GetBooking
