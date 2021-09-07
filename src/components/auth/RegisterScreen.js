import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import validator from "validator";
import useForm from "../../hooks/useForm";

const RegisterScreen = () => {
  const dispatch = useDispatch();

  const [formValues, handleInputChange] = useForm({
    name: "Anibal",
    email: "ansango@ansango.com",
    password: "1234",
    password2: "1234",
  });

  const { name, email, password, password2 } = formValues;

  const handleRegister = (event) => {
    event.preventDefault();

    if (isFormValid) {
      console.log("yee");
    }

    //dispatch(startLoginEmailPassword(email, password));
  };

  const isFormValid = () => {
    if (name.trim().length === 0) {
      return false;
    } else if (validator.isEmail(email)) {
      return false;
    } else if (password !== password2 || password.length < 5) {
      return false;
    }
    return true;
  };

  return (
    <>
      <h3 className="auth__title">Register</h3>
      <form onSubmit={handleRegister}>
        <div className="auth__alert-error">Holi</div>
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
        <button className="btn btn-primary btn-block mb-5" type="submit">
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
