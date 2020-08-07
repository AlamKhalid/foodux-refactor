import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import ProtectedVerifiedRoute from "./components/common/ProtectedVerifiedRoute";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Home from "./pages/Home";
import About from "./pages/About";
import Restaurants from "./pages/Restaurants";
import Foods from "./pages/Foods";
import Cities from "./pages/Cities";
import Verify from "./pages/Verify";
import NotFound from "./pages/NotFound";
import Newsfeed from "./pages/Newsfeed";
import SingleBlogPost from "./pages/SingleBlogPost";
import SinglePost from "./pages/SinglePost";
import FoodBlog from "./pages/FoodBlog";
import Settings from "./pages/Settings";
import DealsAndDiscounts from "./pages/DealsAndDiscounts";
import Profile from "./pages/Profile";
import Logout from "./pages/Logout";
import EditorPage from "./pages/Editor";
import AdminPage from "./pages/AdminPage";
import VerifyUserRoute from "./pages/VerifyUserRoute";
import Search from "./pages/Search";
import { isLoggedIn } from "./store/slices/user";
import "react-toastify/dist/ReactToastify.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./App.css";
import "./AppMediaQueries.css";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isLoggedIn());
  }, [dispatch]);

  return (
    <>
      <ToastContainer />
      <Switch>
        <ProtectedVerifiedRoute path="/editor" exact component={EditorPage} />
        <ProtectedVerifiedRoute path="/admin" exact component={AdminPage} />

        <ProtectedVerifiedRoute
          path="/user/:id/settings"
          component={Settings}
          exact
        />
        <ProtectedVerifiedRoute
          path="/restaurant/:id/settings"
          component={Settings}
          exact
        />
        <ProtectedVerifiedRoute path="/search" component={Search} />
        <ProtectedVerifiedRoute path="/user/:id/" component={Profile} />
        <ProtectedVerifiedRoute path="/restaurant/:id/" component={Profile} />
        <Route path="/:id/verify" component={VerifyUserRoute} />
        <ProtectedVerifiedRoute
          path="/food-blog/:id"
          exact
          component={SingleBlogPost}
        />
        <ProtectedVerifiedRoute path="/post/:id" exact component={SinglePost} />
        <ProtectedVerifiedRoute path="/food-blog" component={FoodBlog} />
        <ProtectedVerifiedRoute
          path="/deals-and-discounts"
          component={DealsAndDiscounts}
        />
        <ProtectedVerifiedRoute path="/newsfeed" component={Newsfeed} />
        <Route path="/logout" component={Logout} />
        <Route path="/not-found" component={NotFound} />
        <Route path="/foods" component={Foods} />
        <Route path="/cities" component={Cities} />
        <Route path="/restaurants" component={Restaurants} />
        <Route path="/about-us" component={About} />
        <Route path="/" exact component={Home} />
        <ProtectedRoute path="/verify" component={Verify} />
        <Redirect to="/not-found" />
      </Switch>
    </>
  );
};

export default App;
