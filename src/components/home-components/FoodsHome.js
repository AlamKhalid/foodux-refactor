import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import HeadingHome from "./HeadingHome";
import HomeCard from "./HomeCard";
import { getHome, loadFoods } from "../../store/slices/home";

const FoodsHome = () => {
  const { loading, foods } = useSelector(getHome);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadFoods());
  }, [dispatch]);

  return loading ? null : (
    <div className="mt-5 pt-5">
      <HeadingHome title="Foods" />
      <p className="text-center mt-4 px-3 lead">
        So many scrumptious mouth-watering dishes and cuisines
      </p>
      <div className="container mt-5">
        <section className="text-center">
          <div className="row">
            {foods.map((f) => (
              <HomeCard
                key={f._id}
                title={f.name}
                label=""
                img={f.profilePic}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default FoodsHome;
