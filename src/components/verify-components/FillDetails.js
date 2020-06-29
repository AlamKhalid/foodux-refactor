import React from "react";
import { useSelector } from "react-redux";
import FillDetailsUser from "./FillDetailsUser";
import FillDetailsRes from "./FillDetailsRes";
import { getUser } from "../../store/slices/user";

const FillDetails = () => {
  const { user } = useSelector(getUser);
  return user.isRestaurant ? <FillDetailsRes /> : <FillDetailsUser />;
};

export default FillDetails;
