import { Route } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
function App() {
  return (
    <div>
      <Route path={"/signin"}>
        <Signin />
      </Route>
      <Route path={"/signup"}>
        <Signup />
      </Route>
    </div>
  );
}

export default App;
