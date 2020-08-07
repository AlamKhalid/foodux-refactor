import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import BranchRes from "../common/BranchRes";
import { getTypes } from "../../services/typeService";
import { addDetails } from "../../services/userService";
import { storage } from "../../firebase/index";
import { getHome } from "../../store/slices/home";
import { getUser } from "../../store/slices/user";
import Spinner from "./../common/Spinner";

const FillDetailsRes = () => {
  const [phone, setPhone] = useState("");
  const [type, setType] = useState([]);
  const [typeOptions, setTypeOptions] = useState([]);
  const [serveOptions, setServeOptions] = useState([]);
  const [serves, setServes] = useState([]);
  const [cities, setCities] = useState([]);
  const [branches, setBranches] = useState([]);
  const [count, setCount] = useState(1);
  const [branchCount, setBranchCount] = useState([{ id: 1 }]);
  const [profilePic, setProfilePic] = useState("");
  const [menuPic, setMenuPic] = useState("");
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const { user } = useSelector(getUser);
  const { foods, cities: city } = useSelector(getHome);

  useEffect(() => {
    async function getData() {
      const { data: types } = await getTypes();
      setTypeOptions(
        types.map((type) => ({ value: type._id, label: type.name }))
      );
      setServeOptions(
        foods.map((food) => ({ value: food._id, label: food.name }))
      );
    }
    getData();
    setCities(city);
  }, [city, foods]);

  const submitDetails = async (event) => {
    event.preventDefault();
    setLoading(true);
    const response = await addDetails(user._id, {
      serves: serves.map((s) => s.value),
      type: type.map((t) => t.value),
      phone,
      branches,
      menuPic,
      profilePic,
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

  const uploadPic = ({ target }) => {
    if (target.files[0]) {
      const image = target.files[0];
      const imageName = Date.now() + image.name;
      const uploadTask = storage.ref(`images/${imageName}`).put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // progress
        },
        (error) => {
          toast.error("Error uploading picture");
        },
        async () => {
          const url = await storage
            .ref("images")
            .child(imageName)
            .getDownloadURL();
          target.name === "menu" ? setMenuPic(url) : setProfilePic(url);
        }
      );
    }
  };

  return loading ? (
    <Spinner />
  ) : (
    <div className="container mt-3 text-center mb-4">
      <div className="row">
        <div className="col-6">
          <img
            src={
              profilePic.length > 0
                ? profilePic
                : "https://via.placeholder.com/300"
            }
            alt=""
            width="300"
            height="300"
            className="mb-3"
          />
        </div>
        <div className="col-6">
          <img
            src={
              menuPic.length > 0 ? menuPic : "https://via.placeholder.com/300"
            }
            alt=""
            width="300"
            height="300"
            className="mb-3"
          />
        </div>
      </div>
      <div className="row mb-2">
        <div className="col-6">
          <div className="custom-file mb-3 w-75 text-left">
            <input
              type="file"
              className="custom-file-input"
              name="profile"
              onChange={uploadPic}
              required
            />
            <label className="custom-file-label" htmlFor="customFile">
              Upload your restaurant's picture
            </label>
          </div>
        </div>
        <div className="col-6">
          <div className="custom-file mb-3 w-75 text-left">
            <input
              type="file"
              className="custom-file-input"
              name="menu"
              onChange={uploadPic}
              required
            />
            <label className="custom-file-label" htmlFor="customFile">
              Upload your menu picture
            </label>
          </div>
        </div>
      </div>
      <hr />
      <form method="post" onSubmit={submitDetails}>
        <div className="d-flex justify-content-center mb-4 mt-2">
          <div className="mr-5">
            <label htmlFor="type" className="label-1 mb-0">
              Restaurant Type
            </label>
            <br />
            <label htmlFor="type" className="text-muted label-2">
              (ex. Thai, Fast Food)
            </label>
          </div>
          <Select
            isMulti
            name="type"
            options={typeOptions}
            placeholder="Max. 5"
            className="w-50 text-left"
            onChange={setType}
            theme={(theme) => ({
              ...theme,
              borderRadius: 0,
              colors: {
                ...theme.colors,
                primary25: "gray",
                primary: "black",
              },
            })}
          />
        </div>

        {branchCount.map((item) => (
          <BranchRes
            key={item.id}
            cities={cities}
            setBranchCount={setBranchCount}
            branches={branches}
            setBranches={setBranches}
            branchCount={branchCount}
            itemId={item.id}
            setCities={setCities}
          />
        ))}
        <p
          className="foodux-link mt-0 mb-5 label-2 w-50"
          onClick={() => {
            setBranchCount([...branchCount, { id: count + 1 }]);
            setCount(count + 1);
          }}
        >
          <i className="fa fa-plus mr-2"></i>Add another branch
        </p>
        <div className="d-flex justify-content-center mb-5 ml-5">
          <label htmlFor="food" className="label-1 mr-5">
            Serves
          </label>
          <Select
            isMulti
            name="serve"
            options={serveOptions}
            className="w-50 text-left"
            onChange={setServes}
            theme={(theme) => ({
              ...theme,
              borderRadius: 0,
              colors: {
                ...theme.colors,
                primary25: "gray",
                primary: "black",
              },
            })}
          />
        </div>
        <div className="d-flex justify-content-center ml-5">
          <label htmlFor="phone" className="label-1 mr-5 mt-1">
            UAN
          </label>
          <input
            type="tel"
            id="phone"
            value={phone}
            placeholder="121-121-121"
            className="form-control w-50 text-box mb-5"
            onChange={({ target }) => setPhone(target.value)}
            required
          />
        </div>
        <button className="mx-auto form-control foodux-btn w-25">Submit</button>
      </form>
    </div>
  );
};

export default FillDetailsRes;
