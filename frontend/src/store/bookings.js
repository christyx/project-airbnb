import { csrfFetch } from './csrf'

const GET = 'bookings/GET_BOOKINGS'

export const getBookings = (bookings) => ({
  type: GET,
  payload: bookings
})

export const getBookingsThunk = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/current/${id}`)

  if (response.ok) {
    const data = await response.json()
    dispatch(getBookings(data.Bookings))
  }
}

const initialState = { bookings: {} };

export default function bookingsReducer(state = initialState, action) {
  let newState = [];
  switch (action.type) {
    case GET:
      newState = action.payload
      return newState;
    default:
      return state
  }
}
