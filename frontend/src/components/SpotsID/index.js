import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getSpotsIdThunk } from "../../store/spots"
import './spotsId.css';

function GetSpot() {
  const dispatch = useDispatch();
  const { id } = useParams()
  useEffect(() => { dispatch(getSpotsIdThunk(id)) }, [dispatch, id]);

  const spot = useSelector((state) =>
    state.spots.singleSpot
  );

  return (
    <div className="single-spot-page">
      <h1>{spot? spot.name: null} </h1>
      <div className="below-name">
        <div>{spot?.avgStarRating ? spot.avgStarRating : 'no rating yet'}</div>
        <div>{spot?.numReviews ? spot.numReviews : '0'} Reviews</div>
        <div>{`${spot?.city}, ${spot?.state}, ${spot?.country}`}</div>
      </div>
      {spot?.SpotImages?.map(image => <img key={image.id} className='spot-image' src={image.url} alt='spot'/>)}
      <h2>Entire Home hosted by {spot?.Owner?.firstName} </h2>




      <div>{`$${spot?.price} night`}</div>
      <h3>Description: {spot?.description}</h3>

    </div>
  )
}

export default GetSpot;
