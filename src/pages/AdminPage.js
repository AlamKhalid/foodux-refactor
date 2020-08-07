import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import WrapWithNav from "./../hoc/WrapWithNav";
import {
  getTypes,
  deleteType,
  updateType,
  createType,
  getType,
} from "./../services/typeService";
import {
  getFoods,
  deleteFood,
  getFood,
  updateFood,
  createFood,
} from "./../services/foodService";
import {
  getCities,
  deleteCity,
  getCity,
  updateCity,
  createCity,
} from "./../services/cityService";
import { storage } from "../firebase/index";

const AdminPage = () => {
  const [categories] = useState(["Types", "Foods", "Cities"]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(null);
  const [columns, setColumns] = useState([]);
  const [current, setCurrent] = useState(0);

  const handleEdit = (id) => {
    setEdit(true);
    setId(id);
  };

  const handleDelete = async (id) => {
    switch (current) {
      case 0:
        await deleteType(id);
        break;
      case 1:
        await deleteFood(id);
        break;
      case 2:
        await deleteCity(id);
        break;
      default:
    }
    window.location.reload();
  };

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      let data;
      let response;
      switch (current) {
        case 0:
          response = await getTypes();
          data = response.data;
          setColumns([
            {
              Header: "Name",
              accessor: "name",
            },
          ]);
          break;
        case 1:
          response = await getFoods();
          data = response.data;
          setColumns([
            {
              Header: "Picture",
              accessor: "profilePic",
            },
            {
              Header: "Name",
              accessor: "name",
            },
          ]);
          break;
        case 2:
          response = await getCities();
          data = response.data;
          setColumns([
            {
              Header: "Picture",
              accessor: "pic",
            },
            {
              Header: "Name",
              accessor: "name",
            },
            {
              Header: "Subareas",
              accessor: "subareas",
            },
          ]);
          break;
        default:
      }
      setData(data);
      setLoading(false);
    };
    getData();
  }, [current]);

  let displayForm;
  switch (current) {
    case 0:
      displayForm = <TypeForm edit={edit} id={id} setEdit={setEdit} />;
      break;
    case 1:
      displayForm = <FoodForm edit={edit} id={id} setEdit={setEdit} />;
      break;
    case 2:
      displayForm = <CityForm edit={edit} id={id} setEdit={setEdit} />;
      break;
    default:
  }

  return (
    <div className="container my-3">
      <div className="row">
        <div className="col-3">
          <div className="list-group fixed">
            {categories.map((category, i) => (
              <span
                className={`list-group-item list-group-item-action ${
                  i === current ? "active-side" : ""
                }`}
                onClick={() => setCurrent(i)}
                key={i}
              >
                {category}
              </span>
            ))}
          </div>
        </div>
        <div className="col-9">
          {displayForm}
          {loading ? (
            <div className="text-center mt-5">
              <div className="spinner-grow mb-3" role="status"></div>
              <div>Loading...</div>
            </div>
          ) : (
            <table className="table table-hover bg-white">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  {columns.map((c, i) => (
                    <th scope="col" key={i}>
                      {c.Header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((d, i) => (
                  <tr key={i}>
                    <th scope="row">{i + 1}</th>
                    {columns.map((c, j) => (
                      <td key={j}>
                        {c.accessor === "pic" || c.accessor === "profilePic" ? (
                          <img
                            src={d[c.accessor]}
                            alt=""
                            className="displayPostPicture"
                          />
                        ) : typeof d[c.accessor] === "object" ? (
                          d[c.accessor].join(", ")
                        ) : (
                          d[c.accessor]
                        )}
                      </td>
                    ))}
                    <td className="text-right">
                      <button
                        className="btn btn-warning br-0"
                        onClick={() => handleEdit(d._id)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger bl-0"
                        onClick={() => handleDelete(d._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

const uploadPic = ({ target }, setUrl) => {
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
        setUrl(url);
      }
    );
  }
};

const TypeForm = ({ edit, id, setEdit }) => {
  const [data, setData] = useState({});
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    if (edit) await updateType(id, data);
    else await createType(data);
    setEdit(false);
    window.location.reload();
  };

  useEffect(() => {
    const getData = async () => {
      const { data } = await getType(id);
      setData(data);
    };
    if (edit) getData();
  }, [edit, id]);

  return (
    <>
      <h3 className="add-spacing text-center">ADD TYPE</h3>
      <hr />
      <form className="my-4 text-center" onSubmit={handleSubmit(onSubmit)}>
        <input
          className="form-control col-6 d-inline mr-4 text-box"
          placeholder="Name"
          ref={register}
          name="name"
          defaultValue={edit ? data.name : ""}
        />
        <button className={`btn ${edit ? "btn-info" : "foodux-btn"}`}>
          {edit ? "Update" : "Submit"}
        </button>
      </form>
      <hr />
    </>
  );
};

const FoodForm = ({ edit, id, setEdit }) => {
  const [data, setData] = useState({});
  const [url, setUrl] = useState("");
  const fileRef = useRef();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    data.profilePic = url;
    if (edit) await updateFood(id, data);
    else await createFood(data);
    setEdit(false);
    window.location.reload();
  };

  useEffect(() => {
    const getData = async () => {
      const { data } = await getFood(id);
      setData(data);
      setUrl(data.profilePic);
    };
    if (edit) getData();
  }, [edit, id]);

  return (
    <>
      <h3 className="add-spacing text-center">ADD FOOD</h3>
      <hr />
      <form className="my-4 text-center" onSubmit={handleSubmit(onSubmit)}>
        {url.length > 0 && (
          <img
            src={url}
            alt=""
            className="displayPostPicture"
            onClick={() => fileRef.current.click()}
          />
        )}
        <input
          type="file"
          onChange={(event) => uploadPic(event, setUrl)}
          ref={fileRef}
          className={`${url.length > 0 ? "d-none" : ""}`}
        />
        <input
          type="text"
          className="form-control col-6 d-inline mr-4 text-box"
          placeholder="Name"
          ref={register}
          name="name"
          defaultValue={edit ? data.name : ""}
        />
        <button className={`btn ${edit ? "btn-info" : "foodux-btn"}`}>
          {edit ? "Update" : "Submit"}
        </button>
      </form>
      <hr />
    </>
  );
};

const CityForm = ({ edit, id, setEdit }) => {
  const [data, setData] = useState({});
  const [url, setUrl] = useState("");
  const [subareas, setSubareas] = useState("");
  const fileRef = useRef();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    data.pic = url;
    data.subareas = data.subareas.split(" ");
    if (edit) await updateCity(id, data);
    else await createCity(data);
    setEdit(false);
    window.location.reload();
  };

  useEffect(() => {
    const getData = async () => {
      const { data } = await getCity(id);
      setData(data);
      setUrl(data.pic);
      setSubareas(data.subareas.join(" "));
    };
    if (edit) getData();
  }, [edit, id]);

  return (
    <>
      <h3 className="add-spacing text-center">ADD CITY</h3>
      <hr />
      <form className="my-4 text-center" onSubmit={handleSubmit(onSubmit)}>
        {url.length > 0 && (
          <img
            src={url}
            alt=""
            className="displayPostPicture"
            onClick={() => fileRef.current.click()}
          />
        )}
        <input
          type="file"
          onChange={(event) => uploadPic(event, setUrl)}
          ref={fileRef}
          className={`${url.length > 0 ? "d-none" : ""}`}
        />
        <input
          type="text"
          className="form-control col-6 d-inline mr-4 text-box"
          placeholder="Name"
          ref={register}
          name="name"
          defaultValue={edit ? data.name : ""}
        />
        <br /> <br />
        <input
          type="text"
          className="form-control col-10 d-inline mr-4 text-box"
          placeholder="Subareas (separated by space)"
          ref={register}
          name="subareas"
          defaultValue={edit ? subareas : ""}
        />
        <button className={`btn ${edit ? "btn-info" : "foodux-btn"}`}>
          {edit ? "Update" : "Submit"}
        </button>
      </form>
      <hr />
    </>
  );
};

export default WrapWithNav(AdminPage);
