import { csrfFetch } from './csrf'

const GET = 'reviews/GET_REVIEWS'
const CREATE = 'reviews/CREATE_REVIEW'
const DELETE = 'reviews/DELETE_REVIEW'
const UPDATE = 'reviews/UPDATE_REVIEW'

export const getReview = (reviews) => ({
  type: GET,
  payload: reviews
})

export const createReview = (review) => ({
  type: CREATE,
  payload: review
})

export const deleteReview = (id) => ({
  type: DELETE,
  payload: id
})

export const updateReview = (review) => ({
  type: UPDATE,
  payload: review
})


export const getReviewsThunk = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${id}/reviews`);

  if (response.ok) {
    const data = await response.json()
    dispatch(getReview(data))
  }
}


const initialState = { allReviews: {}, singleReview: {} };

export default function reviewsReducer(state = initialState, action) {
  let newState = [];
  switch (action.type) {
    case GET:
      newState.allReviews = action.payload.Reviews
      return newState;

    default:
      return state
  }
}
