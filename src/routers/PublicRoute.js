import { Redirect, Route } from "react-router-dom";
import PropTypes from "prop-types";

const PublicRoute = ({ isAuth, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      component={(props) =>
        isAuth ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

export default PublicRoute;

PublicRoute.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
};
