import "./App.css";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "./components/Pages/Home";
import Users from "./components/Pages/Users";
import {Posts} from "./components/Pages/Posts";
import {Tags} from "./components/Pages/Tags";

function App() {
  return (
    <>
      <Router>
        <NavBar />

        <div className="pages">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/users"  component= {Users}/>
            <Route path="/posts" component= {Posts} />
            <Route path="/tags"  component= {Tags} />
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
