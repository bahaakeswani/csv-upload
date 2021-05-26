import Home from "./components/Home";
import Nav from "./components/Nav";
import Login from "./components/Login";
import Upload from "./components/Upload";

import { BrowserRouter, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Route exact path={"/"} component={Home} />
        <Route exact path={"/login"} component={Login} />
        <Route exact path={"/upload"} component={Upload} />
      </BrowserRouter>
    </>
  );
}

export default App;
