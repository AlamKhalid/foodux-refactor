import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import $ from "jquery";
import Form from "../common/Form";
import Popup from "../../hoc/Popup";
import { loginUser } from "./../../store/slices/user";
import { login } from "../../services/authService";
import LoadingButton from "./../common/LoadingButton";

class Login extends Form {
  state = {
    data: {
      email: "",
      password: "",
    },
    loading: false,
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const response = await login(this.state.data);
    if (!response) {
      toast.error("Invalid Email or Password");
      this.setState({ loading: false });
    } else {
      this.props.login(response.data.token);
      this.setState({ loading: false });
      $("#login").modal("hide");
      this.props.history.push("/newsfeed");
    }
  };

  render() {
    return (
      <>
        <h5 className="mb-4 text-center text-muted">Enter Credentials</h5>
        <form method="post" onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email", "email")}
          <br />
          {this.renderInput("password", "Password", "password")}
          <br />
          {this.state.loading ? (
            <LoadingButton label={"Logging in..."} />
          ) : (
            this.renderButton("Login")
          )}
        </form>
        <div className="d-flex mt-3">
          <hr className="popup-row" />
          <h6 className="mt-1">OR LOGIN WITH</h6>
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
)(withRouter(Popup(Login, "login", "login")));
