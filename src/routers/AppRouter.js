import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import AuthRouter from "./AuthRouter";
import PrivateRoute from "./PrivateRoute";
import { login } from "../actions/auth";
import JournalScreen from "../components/journal/JournalScreen";
import PublicRoute from "./PublicRoute";

const auth = getAuth();

const AppRouter = () => {
  const dispatch = useDispatch();
  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setChecking(false);
    });
  }, [dispatch, setChecking, setIsLoggedIn]);

  if (checking) {
    return <h1>Loading...</h1>;
  }

  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute
            path="/auth"
            component={AuthRouter}
            isAuth={isLoggedIn}
          />
          <PrivateRoute
            exact
            path="/"
            component={JournalScreen}
            isAuth={isLoggedIn}
          />
        </Switch>
      </div>
    </Router>
  );
};

export default AppRouter;
