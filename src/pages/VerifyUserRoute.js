import { useEffect } from "react";
import jwtDecode from "jwt-decode";
import { verifyUser } from "../services/userService";
import { useHistory } from "react-router-dom";

const VerifyUserRoute = () => {
  const history = useHistory();

  useEffect(() => {
    async function verify() {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      await verifyUser(user._id);
      history.push("/verify");
    }
    verify();
  });

  return null;
};

export default VerifyUserRoute;
