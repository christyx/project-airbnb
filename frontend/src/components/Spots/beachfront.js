import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { getSpotsThunk, deleteSpotThunk } from "../../store/spots"
import './spots.css';

function GetBeach() {
  const dispatch = useDispatch();
  useEffect(() => { dispatch(getSpotsThunk()) }, [dispatch]);
  const history = useHistory()
  const sessionUser = useSelector(state => state.session.user);
  const allspots = useSelector((state) => {
    if (state.spots.allSpots) return Object.values(state.spots.allSpots)
  })

  const spots = []
  spots.push(allspots[0])
  spots.push(allspots[2])
  spots.push(allspots[4])
  spots.push(allspots[5])
  spots.push(allspots[8])
  spots.push(allspots[11])
  spots.push(allspots[12])

  const deleteHandler = async (id) => {
    await dispatch(deleteSpotThunk(id))
    history.push("/");
  }

  return (
    <div>
      <div className="spot-nav-wrapper" >
        <NavLink className="spot-nav-seleted" to='/'>
          <img src="https://a0.muscache.com/pictures/bcd1adc0-5cee-4d7a-85ec-f6730b0f8d0c.jpg"
            alt='spot-airbnb'
            className="spot-nav"
          />
          Beachfront
        </NavLink>
        <NavLink className="spot-nav-all" to='/mansions'>
          <img src="https://a0.muscache.com/pictures/78ba8486-6ba6-4a43-a56d-f556189193da.jpg"
            alt='spot-airbnb'
            className="spot-nav"
          />
          <div>
            Mansions
          </div>

        </NavLink>
        <NavLink className="spot-nav-all" to='/views'>
          <img src="https://a0.muscache.com/pictures/3b1eb541-46d9-4bef-abc4-c37d77e3c21b.jpg"
            alt='spot-airbnb'
            className="spot-nav"
          />
          Amazing views
        </NavLink>
        <NavLink className="spot-nav-all" to='/international'>
          <img src="https://a0.muscache.com/pictures/ed8b9e47-609b-44c2-9768-33e6a22eccb2.jpg"
            alt='spot-airbnb'
            className="spot-nav"
          />
          International
        </NavLink>
      </div>
      <div className="spot-preview">

        {spots?.map((spot) => {
          return (

            <NavLink key={spot?.id} to={`/spots/${spot?.id}`}>
              <img src={spot?.previewImage}
                alt='spot-airbnb'
                className="spot-image-preview"
              />
              <div className="location-edit">
                <div className="spot-description">{`${spot?.city}, ${spot?.state}, ${spot?.country}`}</div>
                {sessionUser?.id === spot?.ownerId && (
                  <div>
                    <NavLink to={`/spots/${spot?.id}/edit`}>
                      <button className="one-button">Edit</button>
                    </NavLink>
                    <button className="one-button" onClick={() => deleteHandler(spot.id)}>Delete</button>
                  </div>
                )}
              </div>

              <div className="spot-price">{`$${spot?.price} night`}</div>
              <div className="spot-review">
                {`Rating: ${parseFloat(spot?.avgRating).toFixed(1)}  `}

                <i class="fa-solid fa-star"></i>
              </div>
            </NavLink>
          )
        })
        }
      </div>
    </div>
  )
}

export default GetBeach;
