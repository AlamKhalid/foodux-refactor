import React, { useState, useEffect } from "react";
import Select from "react-select";
import _ from "lodash";

const BracnhRes = ({
  itemId,
  cities,
  setBranchCount,
  branches,
  setBranches,
  branchCount,
  setCities,
  defaultCity = {},
  allCities,
  edit = false,
}) => {
  const [selectedCity, setSelectedCity] = useState(defaultCity);
  const [branchOptions, setBranchOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    if (!_.isEmpty(defaultCity)) {
      const city = allCities.find((c) => c.name === defaultCity.name);
      const sub = branches.find((b) => b.city === city.name);
      setSelectedOptions(sub.subareas.map((s) => ({ label: s, value: s })));
      setBranchOptions(city.subareas.map((s) => ({ label: s, value: s })));
    }
  }, []);

  const addSubareas = (id) => {
    const city = cities.find((city) => city._id === id);
    setBranchOptions(city.subareas.map((s) => ({ value: s, label: s })));
  };

  const handleBranches = (list) => {
    const branch = branches.find((branch) => branch.city === selectedCity.name);
    const index = branches.indexOf(branch);
    const updatedBranches = [...branches];
    if (list) {
      updatedBranches[index].subareas = list.map((l) => l.value);
      setBranches(updatedBranches);
    } else {
      setBranches(updatedBranches.filter((b, i) => i !== index));
    }
  };

  return (
    <div
      className={`d-flex ${edit ? "mb-3" : "justify-content-center ml-5 mb-2"}`}
    >
      <label htmlFor="" className={`label-1 ${edit ? "w-10" : "mr-5"}`}>
        Branches
      </label>
      <select
        className="form-control text-box w-25 mr-3"
        value={selectedCity.name}
        onChange={({ target }) => {
          const cityName = target.value;
          const prevCityName = !_.isEmpty(selectedCity)
            ? selectedCity.name
            : cityName;
          if (cityName.length > 0) {
            let updatedCities = [...cities];
            if (prevCityName !== cityName)
              updatedCities = [...cities, selectedCity];
            const findCity = cities.find((city) => city.name === cityName);
            setSelectedCity(findCity);
            setBranches([...branches, { city: cityName }]);
            addSubareas(findCity._id);
            setCities(updatedCities.filter((city) => city.name !== cityName));
          } else {
            setBranches(
              branches.filter((branch) => branch.city !== selectedCity.name)
            );
            if (!_.isEmpty(selectedCity)) setCities([...cities, selectedCity]);
            setSelectedCity({});
            setBranchOptions([]);
          }
        }}
        required
      >
        <option value="">Choose City</option>
        {!_.isEmpty(selectedCity) && (
          <option value={selectedCity.name}>{selectedCity.name}</option>
        )}
        {cities.map((city) => (
          <option key={city._id} value={city.name}>
            {city.name}
          </option>
        ))}
      </select>
      <Select
        isMulti
        name="subarea"
        defaultValue={selectedOptions}
        options={branchOptions}
        placeholder="Subarea"
        className="w-25 text-left"
        onChange={handleBranches}
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
      {branchCount.length > 1 && (
        <i
          className="fa fa-trash mt-2 ml-2 del-branch"
          onClick={() => {
            if (!_.isEmpty(selectedCity)) setCities([...cities, selectedCity]);
            setBranchCount(branchCount.filter((item) => item.id !== itemId));
          }}
        ></i>
      )}
    </div>
  );
};

export default BracnhRes;
