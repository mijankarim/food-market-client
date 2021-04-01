import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState, createContext } from "react";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Login from "./components/Login/Login";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Orders from "./components/Orders/Orders";
import Admin from "./components/Admin/Admin";
import Checkout from "./components/Checkout/Checkout";
import AddProduct from "./components/AddProduct/AddProduct";
import ManageProduct from "./components/ManageProduct/ManageProduct";

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <PrivateRoute path="/admin">
            <Admin />
          </PrivateRoute>

          
          <PrivateRoute path="/checkout/:id">
            <Checkout />
          </PrivateRoute>

          <PrivateRoute path="/orders">
            <Orders />
          </PrivateRoute>

        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
