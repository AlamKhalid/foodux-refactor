import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import _ from "lodash";
import $ from "jquery";
import Form from "../common/Form";
import Popup from "../../hoc/Popup";
import { loginUser } from "./../../store/slices/user";
import { register } from "../../services/userService";
import LoadingButton from "./../common/LoadingButton";

class SignUp extends Form {
  state = {
    data: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      birthday: {
        date: "",
        month: "",
        year: "",
      },
      gender: "",
      isRestaurant: false,
    },
    loading: false,
  };

  calculateAge = () => {
    const { date, month, year } = this.state.data.birthday;
    const todayDate = new Date();
    const tDate = todayDate.getDate();
    const tMonth = todayDate.getMonth() + 1;
    const tYear = todayDate.getFullYear();
    let age = tYear - year;
    if (tMonth - month < 0) return age - 1;
    if (tDate - date < 0) return age - 1;
    return age;
  };

  validate = () => {
    const { password, confirmPassword } = this.state.data;

    if (password !== confirmPassword) {
      toast.error("Password did not match");
      return true;
    }
    if (this.calculateAge() < 13) {
      toast.error("You must be at least 13 years old");
      return true;
    }
    return false;
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const errors = this.validate();
    if (errors) return;
    // register the user
    const { year, month, date } = this.state.data.birthday;
    this.state.data.birthday = `${date}-${month}-${year}`;
    const response = await register(
      _.pick(this.state.data, [
        "name",
        "email",
        "password",
        "birthday",
        "gender",
        "isRestaurant",
      ])
    );
    if (!response) {
      toast.error("Email already registered");
      this.setState({ loading: false });
    } else {
      this.props.login(response.headers["x-auth-token"]);
      this.setState({ loading: false });
      $("#signup").modal("hide");
      this.props.history.push("/verify");
    }
  };

  render() {
    return (
      <>
        <h5 className="mb-4 text-center text-muted">Enter Credentials</h5>
        <form method="post" onSubmit={this.handleSubmit}>
          {this.renderInput("text", "Name", "name")}
          <br />
          {this.renderInput("email", "Email", "email")}
          <br />
          {this.renderInput("password", "New Password", "password")}
          <br />
          {this.renderInput("password", "Confirm Password", "confirmPassword")}
          <br />
          <h6 className="text-muted">Birthday</h6>
          <div className="row pl-4">
            <div className="col-4">{this.renderSelect("date", "Date")}</div>
            <div className="col-4">{this.renderSelect("month", "Month")}</div>
            <div className="col-4">{this.renderSelect("year", "Year")}</div>
          </div>
          <br />
          <h6 className="text-muted">Gender</h6>
          {this.renderRadioButton("gender", "female", "Female")}
          {this.renderRadioButton("gender", "male", "Male")}
          <br /> <br />
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
)(withRouter(Popup(SignUp, "sign up", "signup")));
