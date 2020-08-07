import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { updateProfileSettings } from "../../services/userService";
import Select from "react-select";
import BranchRes from "../common/BranchRes";
import { getHome } from "./../../store/slices/home";

const ProfileSettingsRes = ({ user, types, cities, foods, setUser }) => {
  const [phone, setPhone] = useState(user.phone);
  const [branches, setBranches] = useState(user.branches);
  const [cityOptions, setCityOptions] = useState(
    cities.filter((city) =>
      branches.find((b) => b.city === city.name) ? false : true
    )
  );
  const [type, setType] = useState(
    user.type.map((t) => ({ label: t.name, value: t._id }))
  );
  const [serves, setServes] = useState(
    user.serves.map((s) => ({ label: s.name, value: s._id }))
  );
  const [count, setCount] = useState(user.branches.length);
  const [branchCount, setBranchCount] = useState(
    user.branches.map((b, i) => {
      return { id: i + 1, city: b.city, sub: b.subareas };
    })
  );
  const { cities: allCities } = useSelector(getHome);
  const [disableBtn, setDisableBtn] = useState(true);

  useEffect(() => {
    if (user.phone !== phone.trim()) setDisableBtn(false);
    else setDisableBtn(true);
  }, [user, phone]);

  const updateData = async (event) => {
    event.preventDefault();
    const { data: response } = await updateProfileSettings(user._id, {
      phone,
    });
    if (response) {
      setUser(response);
      toast("Settings saved");
    } else {
      toast.error("Error updating profile");
    }
  };

  return (
    <div
      id="collapseTwo"
      className="collapse"
      aria-labelledby="profile-settings"
      data-parent="#accordion"
    >
      <div className="card-body">
        <form method="post" onSubmit={updateData}>
          <div className="d-flex flex-column flex-md-row">
            <label className="label-1 w-10">Type</label>
            <Select
              isMulti
              name="type"
              defaultValue={type}
              options={types.map((t) => ({ label: t.name, value: t._id }))}
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
          <br />
          {branchCount.map((item) => (
            <BranchRes
              key={item.id}
              cities={cityOptions}
              branches={branches}
              setBranches={setBranches}
              setBranchCount={setBranchCount}
              branchCount={branchCount}
              allCities={allCities}
              itemId={item.id}
              edit={true}
              defaultCity={cities.find((city) => city.name === item.city)}
              setCities={setCityOptions}
            />
          ))}
          <p
            className="foodux-link mt-2 mb-5 label-2 fit-width"
            onClick={() => {
              setBranchCount([...branchCount, { id: count + 1 }]);
              setCount(count + 1);
            }}
          >
            <i className="fa fa-plus mr-2"></i>Add another branch
          </p>
          <div className="d-flex flex-column flex-md-row">
            <label className="label-1 w-10">Serves</label>
            <Select
              isMulti
              name="serve"
              defaultValue={serves}
              options={foods.map((f) => ({ label: f.name, value: f._id }))}
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
          <br />
          <label className="label-1 w-10">Phone</label>
          <input
            type="text"
            className="form-control text-box w-50 d-block d-md-inline"
            value={phone}
            onChange={({ target }) => setPhone(target.value)}
            required
          />
          <button className="btn foodux-btn float-right" disabled={disableBtn}>
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileSettingsRes;
