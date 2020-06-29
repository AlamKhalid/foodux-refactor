import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Form from "../common/Form";
import _ from "lodash";
import $ from "jquery";
import Popup from "../../hoc/Popup";
import { toast } from "react-toastify";
import { loginUser } from "./../../store/slices/user";
import LoadingButton from "./../common/LoadingButton";
import { register } from "../../services/userService";

class SignUpRes extends Form {
  state = {
    data: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      website: "",
      isRestaurant: true,
    },
    loading: false,
  };

  validate = () => {
    const { password, confirmPassword } = this.state.data;

    if (password !== confirmPassword) {
      toast.error("Password did not match");
      return true;
    }
    return false;
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const errors = this.validate();
    if (errors) return;
    // register the restaurant
    const response = await register(
      _.pick(this.state.data, [
        "name",
        "email",
        "password",
        "website",
        "isRestaurant",
      ])
    );
    if (!response) {
      toast.error("Email already registered");
      this.setState({ loading: false });
    } else {
      this.props.login(response.headers["x-auth-token"]);
      this.setState({ loading: false });
      $("#signup-res").modal("hide");
      this.props.history.push("/verify");
    }
  };

  render() {
    return (
      <>
        <h5 className="mb-4 text-center text-muted">Enter Credentials</h5>
        <form method="post" onSubmit={this.handleSubmit}>
          {this.renderInput("text", "Restaurant's Name", "name")}
          <br />
          {this.renderInput("email", "Restaurant's Email", "email")}
          <br />
          {this.renderInput("password", "New Password", "password")}
          <br />
          {this.renderInput("password", "Confirm Password", "confirmPassword")}
          <br />
          {this.renderInput("url", "Restaurant's Website", "website")}
          <br />
          {this.state.loading ? (
            <LoadingButton label={"Signing up..."} />
          ) : (
            this.renderButton("Sign Up")
          )}
        </form>
        <div className="d-flex mt-3">
          <hr className="popup-row" />
          <h6 className="mt-1">OR SIGN UP WITH</h6>
          <hr className="popup-row" />
        </div>
      </>
    );
  }
}

const mapDispatchtoProps = (dispatch) => {
  return {
    login: (token) => dispatch(loginUser({ token })),
  };
};

export default connect(
  null,
  mapDispatchtoProps
)(withRouter(Popup(SignUpRes, "sign up as restaurant", "signup-res")));
