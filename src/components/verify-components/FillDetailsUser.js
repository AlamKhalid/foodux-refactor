import React, { useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addDetails } from "../../services/userService";
import { getHome } from "../../store/slices/home";
import { getUser } from "../../store/slices/user";
import { storage } from "../../firebase/index";
import Spinner from "./../common/Spinner";

const FillDetailsUser = () => {
  const [livesIn, setLivesIn] = useState("");
  const [favFood, setFavFood] = useState("");
  const [favRestaurant, setFavRestaurant] = useState("");
  const [bio, setBio] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const { cities, foods, restaurants } = useSelector(getHome);
  const { user } = useSelector(getUser);

  const uploadImage = ({ target }) => {
    if (target.files[0]) {
      const image = target.files[0];
      const imageName = Date.now() + image.name;
      const uploadTask = storage.ref(`images/${imageName}`).put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          let progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          toast.error("Error uploading picture");
        },
        async () => {
          const url = await storage
            .ref("images")
            .child(imageName)
            .getDownloadURL();
          setImageURL(url);
          setProgress(0);
        }
      );
    }
  };

  const submitDetails = async (event) => {
    event.preventDefault();
    setLoading(true);
    const response = await addDetails(user._id, {
      bio,
      livesIn,
      favFood,
      favRestaurant,
      profilePic: imageURL,
    });
    if (response) {
      setLoading(false);
      toast("Details added successfully");
      history.push("/newsfeed");
    } else {
      setLoading(false);
      toast.error("Error adding details");
    }
  };

  return loading ? (
    <Spinner />
  ) : (
    <>
      {progress === 0 || progress === 100 ? (
        <div className="d-flex w-100 justify-content-center mt-3 mb-4">
          <img
            src={
              imageURL.length > 0 ? imageURL : "https://via.placeholder.com/300"
            }
            alt=""
            width="300"
            height="300"
          />
        </div>
      ) : (
        <div className="progress-div">
          <div className="progress">
            <div
              className="progress-bar progress-bar-striped bg-dark"
              role="progressbar"
              style={{ width: `${progress}%` }}
              aria-valuenow="10"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
        </div>
      )}
      <div className="w-25 mx-auto">
        <form method="post" onSubmit={submitDetails}>
          <div className="custom-file mb-3">
            <input
              type="file"
              className="custom-file-input"
              onChange={uploadImage}
              required
            />
            <label className="custom-file-label" htmlFor="customFile">
              Upload your profile picture
            </label>
          </div>
          <input
            type="text"
            name="bio"
            placeholder="Bio"
            value={bio}
            className="form-control mb-3 text-box"
            onChange={({ target }) => setBio(target.value)}
            required
          />
          <select
            name="livesIn"
            className="form-control text-box mb-3"
            value={livesIn}
            onChange={({ target }) => setLivesIn(target.value)}
            required
          >
            <option value="">Lives in</option>
            {cities.map((city) => (
              <option key={city._id} value={city._id}>
                {city.name}
              </option>
            ))}
          </select>
          <select
            name="favFood"
            className="form-control text-box mb-3"
            value={favFood}
            onChange={({ target }) => setFavFood(target.value)}
            required
          >
            <option value="">Select Favourite Food</option>
            {foods.map((food) => (
              <option key={food._id} value={food._id}>
                {food.name}
              </option>
            ))}
          </select>
          <select
            name="favRestaurant"
            className="form-control text-box mb-3"
            value={favRestaurant}
            onChange={({ target }) => setFavRestaurant(target.value)}
            required
          >
            <option value="">Select Favourite Restaurant</option>
            {restaurants.map((restaurant) => (
              <option key={restaurant._id} value={restaurant._id}>
                {restaurant.name}
              </option>
            ))}
          </select>
          <button
            className="form-control foodux-btn"
            disabled={progress === 0 || progress === 100 ? false : true}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default FillDetailsUser;
