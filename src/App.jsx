import { Route, Switch } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import ForgotPassword from "./pages/ForgotPassword";
import { useSelector } from "react-redux";
import Navbar from "./component/Navbar";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <div>
      <Navbar />
      <Switch>
        <Route path={"/signup"}>
          <Signup />
        </Route>
        {isLoggedIn && (
          <Route path={"/home"}>
            <Home />
          </Route>
        )}
        <Route path={"/forgotpassword"}>
          <ForgotPassword />
        </Route>
        <Route path={"/"} exact>
          <Signin />
        </Route>
        <Route path={"*"}>
          <Signin />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
