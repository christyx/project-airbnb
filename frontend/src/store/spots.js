import { csrfFetch } from './csrf'

const LOAD = 'spots/GET_SPOTS'
const GET = 'spots/GET_SPOT_ID'
const CREATE = 'spots/CREATE_SPOTS'
const DELETE = 'spots/DELETE_SPOTS'
const UPDATE = 'spots/UPDATE_SPOTS'

export const getSpots = (spots) => ({
  type: LOAD,
  payload: spots
})

export const getSpotsId = (spot) => ({
  type: GET,
  payload: spot
})

export const createSpot = (spot) => ({
  type: CREATE,
  payload: spot
})

export const deleteSpot = (id) => ({
  type: DELETE,
  payload: id
})

export const updateSpot = (spot) => ({
  type: UPDATE,
  payload: spot
})

export const getSpotsThunk = () => async (dispatch) => {
  const response = await csrfFetch('/api/spots')

  if (response.ok) {
    const data = await response.json()
    dispatch(getSpots(data))
  }
}

export const getSpotsIdThunk = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${id}`);

  if (response.ok) {
    const data = await response.json()
    dispatch(getSpotsId(data))
  }
}



const initialState = { allSpots: {}, singleSpot: {} };

export default function spotsReducer(state = initialState, action) {
  let newState = [];
  switch (action.type) {
    case LOAD:
      newState.allSpots = action.payload.Spots
      return newState;
    case GET:
      newState.singleSpot = action.payload
      return newState;

    default:
      return state
  }
}
