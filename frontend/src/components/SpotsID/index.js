import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink, useHistory } from "react-router-dom";
import { getSpotsIdThunk, deleteSpotThunk } from "../../store/spots";
import { getReviewsThunk, deleteReviewThunk } from "../../store/reviews";

import './spotsId.css';
import CreateBookingCard from "./CreateBookingCard/CreateBookingCard";

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

  const deleteSpotHandler = async (id) => {
    await dispatch(deleteSpotThunk(id))
    history.push("/");
  }
  const deleteReviewHandler = async (reviewId) => {
    await dispatch(deleteReviewThunk(reviewId, id))

    history.push('/');

  }

  const alreadyHasReview = () => {
    return reviews?.map(review => review?.userId === sessionUser?.id)
  }
  const userArr = alreadyHasReview()

  const isOwner = () => {
    return spot?.Owner?.id === sessionUser?.id
  }


  return (
    <div className="single-spot-page">
      <h1>{spot ? spot.name : null} </h1>
      <div className="below-name">
        <div className="rating">
          <i class="fa-solid fa-star"></i>
          <div>{spot?.avgStarRating ? parseFloat(spot.avgStarRating).toFixed(1) : 'no rating yet'}</div>
        </div>
        <div className="spot-review-one" >{spot?.numReviews ? spot.numReviews : '0'} Reviews</div>
        <div className="spot-location" >{`${spot?.city}, ${spot?.state}, ${spot?.country}`}</div>

        {sessionUser?.id === spot?.ownerId && (
          <div>
            <NavLink to={`/spots/${spot?.id}/edit`}>
              <button className="one-button">Edit</button>
            </NavLink>
            <button className="one-button" onClick={() => deleteSpotHandler(id)}>Delete</button>
          </div>
        )}
      </div>
      {spot?.SpotImages?.map(image => <img key={image.id} className='spot-image' src={image.url} alt='spot' />)}

      <div className='host-des-book'>
        <div className='host-des'>
          <h2 id='hosted'>Entire Home hosted by {spot?.Owner?.firstName} </h2>



          <h3 className='superhost'>
            <i class="fa-solid fa-thumbs-up">    {spot?.Owner?.firstName} is a Superhost</i>
          </h3>

          <h3 className='superhost'>
            <i class="fa-solid fa-location-dot">  Great location</i>
          </h3>

          <h3 className='superhost-last'>
            <i class="fa-solid fa-key">  Great check-in experience</i>
          </h3>

          <div className='aircover-all'>
            <img src={'https://a0.muscache.com/im/pictures/54e427bb-9cb7-4a81-94cf-78f19156faad.jpg'}
              alt='aircover'
              className="aircover"
            />
            <h4>Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.</h4>
          </div>

          <h3 id='description'>Description :
            <h3>{spot?.description}</h3>
          </h3>

          <h3 id='offer'>What this place offers :
            <h4>
              <i class="fa-solid fa-utensils"></i>  cooking basics
            </h4>
            <h4>
              <i class="fa-solid fa-square-parking"></i>  free parking
            </h4>
            <h4>
              <i class="fa-solid fa-wifi"></i>    wifi
            </h4>
            <h4>
              <i class="fa-solid fa-ice-cream"></i> refrigerator
            </h4>
            <h4>
              <i class="fa-solid fa-tv"></i>  tv with cable
            </h4>
            <h4>
              <i class="fa-solid fa-dryer-heat"></i>  washer and dryer
            </h4>
            {/* <h4>
              <i class="fa-regular fa-dryer-heat"></i>  washer
            </h4> */}



          </h3>
        </div>





        <CreateBookingCard className='book' spot={spot} />


      </div>



      <div className="review-session">
        <div className="below-name">
          <div className="rating">
            <i class="fa-solid fa-star"></i>
            <div>{spot?.avgStarRating ? parseFloat(spot.avgStarRating).toFixed(1) : 'no rating yet'}</div>
          </div>

          <div className="spot-review-one" >{spot?.numReviews ? spot.numReviews : '0'} Reviews</div>
        </div>
        <div>
          {reviews?.map(review =>
            <div key={review.id}>
              <h3 className="review-user">Reviewed By {review?.User?.firstName}</h3>
              <h4 className="review-user">Rating:  {review?.stars}</h4>
              <div className="review-review">{review?.review}</div>

              {sessionUser?.id === review?.userId && (
                <div>
                  <button className="one-button" onClick={() => deleteReviewHandler(review?.id)} >delete review</button>
                </div>
              )}

            </div>)}
        </div>


        <NavLink hidden={userArr?.includes(true) || isOwner()} to={`/spots/${id}/addReview`}>Add a Review</NavLink>


      </div>

    </div>
  )
}

export default GetSpot;
