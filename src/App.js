import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { ToastContainer } from "react-toastify";
// import ProtectedRoute from "./components/common/protectedRoute";
import Home from "./pages/Home";
// import FoodBlog from "./components/foodBlog";
// import Settings from "./components/settings";
// import DealsAndDiscounts from "./components/dealsAndDiscounts";
// import Profile from "./components/profile";
// import NotFound from "./components/notFound";
// import Logout from "./components/logout";
// import Verify from "./components/verify";
// import EditorPage from "./components/editor";
// import AboutUs from "./components/aboutUs";
// import Restaurants from "./components/restaurants";
// import Foods from "./components/foods";
// import Cities from "./components/cities";
// import VerifyUserRoute from "./components/verifyUserRoute";
import "react-toastify/dist/ReactToastify.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./App.css";
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
          <Route path="/about-us" render={() => <AboutUs user={user} />} />
          <Route
            path="/restaurants"
            render={() => <Restaurants user={user} />}
          />
          <Route path="/foods" render={() => <Foods user={user} />} />
          <Route path="/cities" render={() => <Cities user={user} />} />
          <Route path="/:id/verify" component={VerifyUserRoute} />
          <Route path="/verify" render={() => <Verify user={user} />} />
          <Route path="/logout" component={Logout} /> */}
        {/* <Route path="/not-found" component={NotFound} /> */}
        <Route path="/" exact component={Home} />
        {/* <Redirect to="/not-found" /> */}
      </Switch>
    </React.Fragment>
  );
};

export default App;
