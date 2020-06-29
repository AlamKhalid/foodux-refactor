import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import BasicSettings from "../components/setting-components/BasicSettings";
import { getUser } from "../services/userService";
import Spinner from "../components/common/Spinner";
import ProfileSettings from "../components/setting-components/ProfileSettings";
import { getTypes } from "./../services/typeService";
import ChangePassword from "../components/setting-components/ChangePassword";
import SavedPosts from "../components/posts/SavedPosts";
import HiddenPosts from "../components/posts/HiddenPosts";
import DeleteMyAccount from "../components/setting-components/DeleteMyAccount";
import BasicSettingsRes from "../components/setting-components/BasicSettingsRes";
import ProfileSettingsRes from "../components/setting-components/ProfileSettingsRes";
import ChangePicture from "../components/setting-components/ChangePicture";
import { getHome } from "../store/slices/home";
import * as obtain from "../store/slices/user";
import WrapWithNav from "../hoc/WrapWithNav";

const Settings = () => {
  const [loading, setLoading] = useState(true);
  const [fullUser, setFullUser] = useState({});
  const [types, setTypes] = useState([]);

  const { foods, cities, restaurants } = useSelector(getHome);
  const { user } = useSelector(obtain.getUser);

  useEffect(() => {
    async function getData() {
      const { data: type } = await getTypes();
      setTypes(type);
    }
    getData();
  }, []);

  useEffect(() => {
    async function getData() {
      const { data: userObj } = await getUser(user._id);
      setFullUser(userObj);
      setLoading(false);
    }
    getData();
  }, [user]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="container my-5 px-5">
            <div id="accordion">
              <div className="card">
                <div className="card-header" id="basic-settings">
                  <h5 className="mb-0">
                    <button
                      className="btn foodux-link"
                      data-toggle="collapse"
                      data-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      Basic Settings
                    </button>
                  </h5>
                </div>
                {user.isRestaurant ? (
                  <BasicSettingsRes user={fullUser} setUser={setFullUser} />
                ) : (
                  <BasicSettings user={fullUser} setUser={setFullUser} />
                )}
              </div>
              <div className="card">
                <div className="card-header" id="profile-settings">
                  <h5 className="mb-0">
                    <button
                      className="btn foodux-link collapsed"
                      data-toggle="collapse"
                      data-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      Profile Settings
                    </button>
                  </h5>
                </div>
                {user.isRestaurant ? (
                  <ProfileSettingsRes
                    user={fullUser}
                    setUser={setFullUser}
                    types={types}
                    foods={foods}
                    cities={cities}
                  />
                ) : (
                  <ProfileSettings
                    user={fullUser}
                    cities={cities}
                    restaurants={restaurants}
                    foods={foods}
                    setUser={setFullUser}
                  />
                )}
              </div>
              <div className="card">
                <div className="card-header" id="change-pic">
                  <h5 className="mb-0">
                    <button
                      className="btn foodux-link collapsed"
                      data-toggle="collapse"
                      data-target="#collapseSeven"
                      aria-expanded="false"
                      aria-controls="collapseSeven"
                    >
                      Change Picture
                    </button>
                  </h5>
                </div>
                <ChangePicture user={fullUser} setUser={setFullUser} />
              </div>
              <div className="card">
                <div className="card-header" id="change-password">
                  <h5 className="mb-0">
                    <button
                      className="btn foodux-link collapsed"
                      data-toggle="collapse"
                      data-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      Change Password
                    </button>
                  </h5>
                </div>
                <ChangePassword setUser={setFullUser} />
              </div>
              <div className="card">
                <div className="card-header" id="saved-posts">
                  <h5 className="mb-0">
                    <button
                      className="btn foodux-link collapsed"
                      data-toggle="collapse"
                      data-target="#collapseFour"
                      aria-expanded="false"
                      aria-controls="collapseFour"
                    >
                      Saved Posts
                    </button>
                  </h5>
                </div>
                <SavedPosts user={fullUser} />
              </div>
              <div className="card">
                <div className="card-header" id="hidden-posts">
                  <h5 className="mb-0">
                    <button
                      className="btn foodux-link collapsed"
                      data-toggle="collapse"
                      data-target="#collapseFive"
                      aria-expanded="false"
                      aria-controls="collapseFive"
                    >
                      Hidden Posts
                    </button>
                  </h5>
                </div>
                <HiddenPosts user={fullUser} />
              </div>
              <div className="card">
                <div className="card-header" id="delete-my-account">
                  <h5 className="mb-0">
                    <button
                      className="btn foodux-link collapsed"
                      data-toggle="collapse"
                      data-target="#collapseSix"
                      aria-expanded="false"
                      aria-controls="collapseSix"
                    >
                      Delete Account
                    </button>
                  </h5>
                </div>
                <DeleteMyAccount />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default WrapWithNav(Settings);
