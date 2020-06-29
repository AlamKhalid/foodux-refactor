import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Verified from "../components/verify-components/Verified";
import Unverified from "../components/verify-components/Unverified";
import Spinner from "../components/common/Spinner";
import { getUser } from "../store/slices/user";
import { isUserVerified } from "../services/userService";

const Verify = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(true);

  const { user } = useSelector(getUser);

  useEffect(() => {
    async function checkVerification() {
      const { data: response } = await isUserVerified(user._id);
      setIsVerified(response);
      setLoading(false);
    }
    checkVerification();
  }, [user._id]);

  return loading ? <Spinner /> : isVerified ? <Verified /> : <Unverified />;
};

export default Verify;
