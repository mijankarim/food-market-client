import React, { useState, useContext } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";
import { UserContext } from "../../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useHistory, useLocation } from "react-router";

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const Login = () => {
  const [newUser, SetNewUser] = useState(false);
  
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    password: "",
    photo: "",
    success: false,
    error: "",
  });

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const handleGoogleSignIn = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        const { displayName, email } = res.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
        };
        setUser(signedInUser);
        setLoggedInUser(signedInUser);
        history.replace(from);
      })
      .catch((error) => {
        const signedInUser = {
          isSignedIn: false,
          name: "",
          email: "",
        };
        setUser(signedInUser);
      });
  };

  return (
    <div>
      <div className="text-center my-3">
        <button onClick={handleGoogleSignIn} className="google-btn">
          <FontAwesomeIcon className="google-icon" icon={faGoogle} /> Continue
          With Google
        </button>
      </div>
    </div>
  );
};

export default Login;