import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getSpotsThunk } from "../../store/spots"
import './spots.css';

function GetAllSpots() {
  const dispatch = useDispatch();
  useEffect(() => { dispatch(getSpotsThunk()) }, [dispatch]);

  const spots = useSelector((state) =>
    Object.values(state.spots.allSpots)
  );

  return (
    <div>
      <div className="spot-preview">
        {spots.map((spot) => {
          return (
            <NavLink key={spot.id} to={`/spots/${spot.id}`}>
              <img src={spot.previewImage}
                alt='spot-airbnb'
                className="spot-image-preview"
              />
              <div className="spot-description">{`${spot.city}, ${spot.state}`}</div>
              <div className="spot-price">{`$${spot.price} night`}</div>
            </NavLink>
          )
        })
        }
      </div>
    </div>
  )
}

export default GetAllSpots;
