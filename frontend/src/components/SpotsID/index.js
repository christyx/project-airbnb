import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink, useHistory } from "react-router-dom";
import { getSpotsIdThunk, deleteSpotThunk } from "../../store/spots";
import { getReviewsThunk } from "../../store/reviews";
import './spotsId.css';

function GetSpot() {
  const dispatch = useDispatch();
  const { id } = useParams()
  const history = useHistory()
  useEffect(() => { dispatch(getSpotsIdThunk(id)) }, [dispatch, id]);
  useEffect(() => { dispatch(getReviewsThunk(id)) }, [dispatch, id]);

  const sessionUser = useSelector(state => state.session.user);

  const spot = useSelector((state) =>
    state.spots.singleSpot
  );

  const reviews = useSelector((state) => {
    if (state.reviews.allReviews) return Object.values(state.reviews.allReviews)
  })

  const deleteHandler = async (id) => {
    await dispatch(deleteSpotThunk(id))
    history.push("/");
  }

  return (
    <div className="single-spot-page">
      <h1>{spot ? spot.name : null} </h1>
      <div className="below-name">
        <div className="rating">
          <i class="fa-solid fa-star"></i>
          <div>{spot?.avgStarRating ? parseFloat(spot.avgStarRating).toFixed(1) : 'no rating yet'}</div>
        </div>
        <div className="spot-review" >{spot?.numReviews ? spot.numReviews : '0'} Reviews</div>
        <div className="spot-location" >{`${spot?.city}, ${spot?.state}, ${spot?.country}`}</div>

        {sessionUser?.id === spot?.ownerId && (
          <div>
            <NavLink to={`/spots/${spot?.id}/edit`}>
              <button className="one-button">Edit</button>
            </NavLink>
            <button className="one-button" onClick={() => deleteHandler(id)}>Delete</button>
          </div>
        )}
      </div>
      {spot?.SpotImages?.map(image => <img key={image.id} className='spot-image' src={image.url} alt='spot' />)}
      <h2 id='hosted'>Entire Home hosted by {spot?.Owner?.firstName} </h2>

      <div>{`$${spot?.price} night`}</div>
      <h3 id='description'>Description:
        {spot?.description}</h3>
      <div className="review-session">
        <div className="below-name">
          <div className="rating">
            <i class="fa-solid fa-star"></i>
            <div>{spot?.avgStarRating ? parseFloat(spot.avgStarRating).toFixed(1) : 'no rating yet'}</div>
          </div>

          <div className="spot-review" >{spot?.numReviews ? spot.numReviews : '0'} Reviews</div>
        </div>
        <div>
          {reviews?.map(review =>
            <div key={review.id}>
              <h3 className="review-user">Reviewed By {review?.User?.firstName}</h3>
              <div className="review-review">{review?.review}</div>
            </div>)}
        </div>
      </div>

    </div>
  )
}

export default GetSpot;
