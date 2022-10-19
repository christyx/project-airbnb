import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSpotsIdThunk } from "../../store/spots";
import { getReviewsThunk } from "../../store/reviews";
import './spotsId.css';

function GetSpot() {
  const dispatch = useDispatch();
  const { id } = useParams()
  useEffect(() => { dispatch(getSpotsIdThunk(id)) }, [dispatch, id]);
  useEffect(() => { dispatch(getReviewsThunk(id)) }, [dispatch, id]);

  const spot = useSelector((state) =>
    state.spots.singleSpot
  );
console.log(spot)
  const reviews = useSelector((state) => {
    if (state.reviews.allReviews) return Object.values(state.reviews.allReviews)
  })
console.log(reviews)

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
      </div>
      {spot?.SpotImages?.map(image => <img key={image.id} className='spot-image' src={image.url} alt='spot' />)}
      <h2>Entire Home hosted by {spot?.Owner?.firstName} </h2>

      <div>{`$${spot?.price} night`}</div>
      <h3>Description:
        { spot?.description}</h3>
      <div className="below-name">
        <div className="rating">
          <i class="fa-solid fa-star"></i>
          <div>{spot?.avgStarRating ? parseFloat(spot.avgStarRating).toFixed(1) : 'no rating yet'}</div>
        </div>

        <div className="spot-review" >{spot?.numReviews ? spot.numReviews : '0'} Reviews</div>
      </div>
      <div>
        {reviews?.map(review =>
        <div>
          <h3 className="review-user">Reviewed By {review?.User?.firstName}</h3>
          <div className="review-review">{review?.review}</div>
        </div>)}
      </div>
    </div>
  )
}

export default GetSpot;
