import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { getBookingsThunk } from "../../store/bookings"

function GetBooking() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => { dispatch(getBookingsThunk(sessionUser.id)) }, [dispatch]);
  const history = useHistory()

  // const bookings = useSelector((state) => Object.values(state.bookings.Bookings))

  const bookings = useSelector((state) => state.bookings)


  console.log(bookings)

  return (
    <div>
      hello
      {/* {bookings} */}
      {/* {bookings[0]?.startDate} */}
      {/* {bookings?.map((booking) => {
        return (
          <div>
{booking.startDate}
            </div>

        )
      })} */}
    </div>
  )
}

export default GetBooking
