import React, { useEffect,  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, } from "react-router-dom";
import { getUserSpotsThunk } from "../../store/spots"
import './userSpot.css';

function GetUserSpots() {

  const dispatch = useDispatch();
  useEffect(() => { dispatch(getUserSpotsThunk()) }, [dispatch]);

  const spots = useSelector((state) => {
    if (state.spots.allSpots) return Object.values(state.spots.allSpots)
  })
  console.log(spots)

  return (
    <div>
      <div className="spot-preview">
        {spots?.map((spot) => {
          return (
            <NavLink key={spot.id} to={`/spots/${spot.id}`}>
              <img src={spot.previewImage}
                alt='spot-airbnb'
                className="spot-image-preview"
              />
              <div className="spot-description">{`${spot.city}, ${spot.state}`}</div>
              <div className="spot-price">{`$${spot.price} night`}</div>
              <NavLink to={`/spots/${spot.id}/edit`}>
                Edit
              </NavLink>
              <button>delete</button>
            </NavLink>
          )
        })
        }
      </div>
    </div>
  )
}

export default GetUserSpots;
