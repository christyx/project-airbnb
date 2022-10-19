import { csrfFetch } from './csrf'

const LOAD = 'spots/GET_SPOTS'

export const getSpots = (spots) => ({
  type: LOAD,
  payload: spots
})

export const getSpotsThunk = () => async (dispatch) => {
  const response = await csrfFetch('/api/spots')

  if(response.ok) {
    const data = await response.json()
    dispatch(getSpots(data))
  }
}
const initialState = { allSpots: {}, singleSpot: {} };

export default function spotsReducer(state = initialState, action) {
  let newState = [];
  switch(action.type){
    case LOAD: {
      // const newState = { ...state, allSpots: { ...state.allSpots } }
      // action.payload.forEach(spot => {
      //   newState.allSpots[spot.id] = spot
      // })
      newState.allSpots = action.payload.Spots
      return newState
    }
    default:
      return state
  }
}
