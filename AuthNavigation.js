import React, { useEffect, useState } from "react";
import { SignedOutScreens, SignedInScreens } from "./navigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();
function AuthNavigation() {
  const [currentUser, setCurrentUser] = useState(null);

  function userHandler(user) {
    user ? setCurrentUser(user) : setCurrentUser(null);
  }
  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // console.log(user)
          userHandler(user);
        } else {
          console.log("User is signed out", user)
          userHandler(false)
        }
      }),
    []
  );
  return <>{currentUser ? <SignedInScreens /> : <SignedOutScreens />}</>;
}

export default AuthNavigation;
