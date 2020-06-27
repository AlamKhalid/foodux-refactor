import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { ToastContainer } from "react-toastify";
// import ProtectedRoute from "./components/common/protectedRoute";
import Home from "./pages/Home";
import About from "./pages/About";
import Restaurants from "./pages/Restaurants";
import Foods from "./pages/Foods";
import Cities from "./pages/Cities";
// import FoodBlog from "./components/foodBlog";
// import Settings from "./components/settings";
// import DealsAndDiscounts from "./components/dealsAndDiscounts";
// import Profile from "./components/profile";
// import NotFound from "./components/notFound";
// import Logout from "./components/logout";
// import Verify from "./components/verify";
// import EditorPage from "./components/editor";
// import VerifyUserRoute from "./components/verifyUserRoute";
import "react-toastify/dist/ReactToastify.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./assets/styles/home.css";
import "./assets/styles/footer.css";
import "./assets/styles/landing-navbar.css";
import "./assets/styles/about.css";
// import "./App.css";
import "./AppMediaQueries.css";

const App = () => {
  // async componentDidMount() {
  //   // In case of invalid or no jwt
  //   try {
  //     const jwt = localStorage.getItem("token");
  //     const user = jwtDecode(jwt);
  //     this.setState({ user });
  //   } catch (ex) {}
  // }

  return (
    <React.Fragment>
      <ToastContainer />
      <Switch>
        {/* <ProtectedRoute
            path="/user/:id/settings"
            component={Settings}
            user={user}
          />
          <ProtectedRoute
            path="/restaurant/:id/settings"
            component={Settings}
            user={user}
          />
          <ProtectedRoute path="/user/:id/" component={Profile} user={user} />
          <ProtectedRoute
            path="/restaurant/:id/"
            component={Profile}
            user={user}
          />
          <ProtectedRoute path="/editor" component={EditorPage} user={user} />
          <ProtectedRoute path="/newsfeed" component={Home} user={user} />
          <ProtectedRoute path="/food-blog" component={FoodBlog} user={user} />
          <ProtectedRoute
            path="/deals-and-discounts"
            component={DealsAndDiscounts}
            user={user}
          />
          
          
          <Route path="/:id/verify" component={VerifyUserRoute} />
          <Route path="/verify" render={() => <Verify user={user} />} />
          <Route path="/logout" component={Logout} /> */}
        {/* <Route path="/not-found" component={NotFound} /> */}
        <Route path="/foods" component={Foods} />
        <Route path="/cities" component={Cities} />
        <Route path="/restaurants" component={Restaurants} />
        <Route path="/about-us" component={About} />
        <Route path="/" exact component={Home} />
        {/* <Redirect to="/not-found" /> */}
      </Switch>
    </React.Fragment>
  );
};

export default App;
