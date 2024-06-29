import { Route, Switch } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import ForgotPassword from "./pages/ForgotPassword";
function App() {
  return (
    <div>
      <Switch>
        <Route path={"/"} exact>
          <Signin />
        </Route>
        <Route path={"/signup"}>
          <Signup />
        </Route>
        <Route path={"/home"}>
          <Home />
        </Route>
        <Route path={"/forgotpassword"}>
          <ForgotPassword />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
