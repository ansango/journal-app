import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import validator from "validator";
import { startRegisterWithEmailPassword } from "../../actions/auth";
import { removeError, setError } from "../../actions/ui";
import useForm from "../../hooks/useForm";

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.ui);

  const [formValues, handleInputChange] = useForm({
    name: "Anibal",
    email: "ansango@ansango.com",
    password: "123456789",
    password2: "123456789",
  });

  const { name, email, password, password2 } = formValues;

  const handleRegister = (event) => {
    event.preventDefault();

    if (isFormValid()) {
      dispatch(startRegisterWithEmailPassword(email, password, name));
    }
  };

  const isFormValid = () => {
    if (name.trim().length === 0) {
      dispatch(setError("Name is required"));
      Swal.fire("Error", "Name is required", "error");
      return false;
    } else if (!validator.isEmail(email)) {
      dispatch(setError("Email is not valid"));
      Swal.fire("Error", "Email is not valid", "error");
      return false;
    } else if (password !== password2 || password.length < 5) {
      dispatch(setError("Passwords are wrong"));
      Swal.fire("Error", "Passwords are wrong", "error");
      return false;
    }
    dispatch(removeError());
    return true;
  };

  return (
    <>
      <h3 className="auth__title">Register</h3>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          className="auth__input"
          autoComplete="off"
          value={name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Email"
          name="email"
          className="auth__input"
          autoComplete="off"
          value={email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="auth__input"
          value={password}
          onChange={handleInputChange}
        />
        <input
          type="password"
          placeholder="Confirm password"
          name="password2"
          className="auth__input"
          value={password2}
          onChange={handleInputChange}
        />
        <button
          className="btn btn-primary btn-block mb-5"
          type="submit"
          disabled={loading}
        >
          Register
        </button>

        <Link className="link" to="/auth/login">
          Already registered?
        </Link>
      </form>
    </>
  );
};

export default RegisterScreen;
