import { Redirect, Route } from "react-router-dom";
import PropTypes from "prop-types";
const PrivateRoute = ({ isAuth, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      component={(props) =>
        !isAuth ? <Redirect to="/auth/login" /> : <Component {...props} />
      }
    />
  );
};

export default PrivateRoute;

PrivateRoute.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
};
