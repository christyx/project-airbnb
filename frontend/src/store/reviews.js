import { csrfFetch } from './csrf'

const GET = 'reviews/GET_REVIEWS'
const CREATE = 'reviews/CREATE_REVIEW'
const DELETE = 'reviews/DELETE_REVIEW'
//const UPDATE = 'reviews/UPDATE_REVIEW'

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

// export const updateReview = (review) => ({
//   type: UPDATE,
//   payload: review
// })


export const getReviewsThunk = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${id}/reviews`);

  if (response.ok) {
    const data = await response.json()
    dispatch(getReview(data))
  }
}

export const createReviewsThunk = (data, spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  });

  if (response.ok) {
    const review = await response.json()
    dispatch(createReview(review))
  }
}

export const deleteReviewThunk = (id, spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${id}`, {
    method: "DELETE"
  })
  if (response.ok) {
    dispatch(deleteReview(id))
    
  }
}

const initialState = { allReviews: {}, singleReview: {} };

export default function reviewsReducer(state = initialState, action) {
  let newState = {};
  switch (action.type) {
    case GET:
      newState = {...state.allReviews}
      newState.allReviews = action.payload.Reviews
      return newState;
    case CREATE:
      newState = { ...state }
      newState[action.payload.id] = action.payload
      return newState;
      // newState.singleReview = action.payload
      // return newState;

    default:
      return state
  }
}

// const initialReviews = {
//   reviews: []
// }
// const reviewReducer = (state = initialReviews, action) => {
//   const newState = { ...state }
//   switch (action.type) {
//     case GET:
//       // const allReviews = {};
//       // const reviewsArray = action.payload.Reviews
//       // reviewsArray.forEach(el => {
//       //   allReviews[el.id] = el
//       // })
//       // return allReviews;
//       newState.reviews = action.payload.Reviews
//       return newState;
//     case CREATE:
//       newState[action.payload.id] = action.payload;
//       return newState;
//     default:
//       return newState;
//   }
// }

// export default reviewReducer
