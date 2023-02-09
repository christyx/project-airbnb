import { csrfFetch } from './csrf'

const GET = 'bookings/GET_BOOKINGS'
const CREATE = 'bookings/CREATE_BOOKINGS'
const UPDATE = 'bookings/UPDATE_BOOKINGS'
const DELETE = 'bookings/DELETE_BOOKINGS'

export const getBookings = (bookings) => ({
  type: GET,
  payload: bookings
})

export const createBookings = (booking) => ({
  type: CREATE,
  payload: booking
})

export const updateBookings = (booking) => ({
  type: UPDATE,
  payload: booking
})

export const deleteBookings = (bookingID) => ({
  type: DELETE,
  payload: bookingID
})


export const getBookingsThunk = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/current/${id}`)

  if (response.ok) {
    const data = await response.json()
    dispatch(getBookings(data.Bookings))
  }
}

export const createBookingThunk =
  (spotId, startDate, endDate) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        startDate,
        endDate,
      }),
    });
    const booking = await response.json();
    dispatch(createBookings(booking));
  };



export const updateBookingThunk = (data, bookingId) => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/${bookingId}`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  });

  if (response.ok) {
    const newBooking = await response.json()
    dispatch(updateBookings(newBooking))
  }
}

export const deleteBookingThunk = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/${id}`, {
    method: "DELETE"
  })
  if (response.ok) {
    dispatch(deleteBookings(id))

  }
}

const initialState = { bookings: {} };

export default function bookingsReducer(state = initialState, action) {
  let newState = [];
  switch (action.type) {
    case GET:
      newState = action.payload
      return newState;
    case CREATE:
      newState = { ...state }
      newState[action.payload.id] = action.payload
      return newState;
    case DELETE:
      newState = { ...state }
      newState[action.payload.bookingID] = {}
      return newState;
    default:
      return state
  }
}
