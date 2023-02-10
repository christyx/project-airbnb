import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginFormModal from "../../LoginFormModal";
import "./CreateBookingCard.css";
import * as bookingActions from "../../../store/bookings";
import { useHistory } from "react-router-dom";

const CreateBookingCard = ({ spot }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [errors, setErrors] = useState([]);
  const user = useSelector((state) => state.session.user);

  const date = new Date();
  const year = date.getFullYear();
  const month =
    (date.getMonth() + 1).toString().length === 1
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;
  const day = date.getDate();

  let today = `${year}-${month}-${day}`;

  if (day < 10) today = `${year}-${month}-0${day}`




  // useEffect(() => {
  //   return () => dispatch(bookingActions.clearBooking());
  // });

  const onSubmit = (e) => {
    setErrors([]);
    e.preventDefault();
console.log(startDate)
console.log('this is today',today)


  if (startDate === '') return setErrors(['Check-in date cannot be empty'])
    if (endDate === '') return setErrors(['Check-out date cannot be empty'])

    if (startDate < today) return setErrors(['Check-in date cannot be before today'])
    // if (endDate < today) return setErrors(['Check-out date cannot be before today'])

    if (startDate > endDate) return setErrors(['Check-out date cannot be before check-in date'])
    if (startDate === endDate) return setErrors(['Check-out date cannot be the same as check-in date'])


    dispatch(bookingActions.createBookingThunk(spot.id, startDate, endDate))
      .then(() =>
        history.push({
          pathname: "/bookings",
          state: {
            spot: spot,
            type: "booking",
            startDate: startDate,
            endDate: endDate,
          },
        })
      )
      .catch(async (res) => {
        const data = await res.json();
        const errorArray = [];
        if (data.errors)
          Object.values(data.errors).forEach((error) => errorArray.push(error));
        setErrors(errorArray);
      });

  };

  const review =
    spot?.numReviews > 1 || spot?.numReviews === 0 ? "reviews" : "review";

    let bookday = 0

  if (endDate !== '' && startDate !== '') {
    bookday = endDate - startDate
  }



  // const bookday = endDate - startDate
  return (
    <div id="create-booking-card-container">
      <div id="create-booking-card">
        <div id="booking-card-spot-details">
          <div id="booking-card-price-container">
            <strong id="booking-card-price">${spot?.price}</strong> night
          </div>
          <div id="booking-rating-container">
            <div id="booking-card-avg-star-rating-container">
              <i className="fa-solid fa-star"></i>
              <div id="booking-card-avg-star-rating">
                {parseFloat(spot?.avgStarRating).toFixed(1) || 0}
              </div>
            </div>
            <div className="single-spot-details-break-line"></div>
            <div id="booking-card-num-reviews">{`${
              spot?.numReviews || "No"
            } ${review}`}</div>
          </div>
        </div>
        <div id="booking-card-dates-form-container">
          <button id="booking-card-dates-button">
            <div className="booking-check-date">
              <div className="booking-check-date-name">CHECK-IN</div>
              <input
                type="date"
                className="booking-check-date-input"
                placeholder="Add date"
                value={startDate}
                required
                onChange={(e) => setStartDate(e.target.value)}
                min={today}
              />
            </div>
            <div id="booking-dates-divider"></div>
            <div className="booking-check-date">
              <div className="booking-check-date-name">CHECKOUT</div>
              <input
                type="date"
                className="booking-check-date-input"
                placeholder="Add date"
                required
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                min={startDate}
              />
            </div>
          </button>
          <ul className="errors">
            {Object.values(errors).map((error, i) => {
              return (
                <div key={i} className="error">

                  <li>{error}</li>
                </div>
              );
            })}
          </ul>
          <>
            {user && (
              <button id="reserve-button" onClick={onSubmit}>
                Reserve
              </button>
            )}
            {!user && <LoginFormModal type={"createBooking"} />}
          </>

        </div>
 
      </div>

    </div>
  );
};

export default CreateBookingCard;
