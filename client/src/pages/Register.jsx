import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo } from "../components";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <Wrapper>
      <form className="form">
        <Logo />
        <h4>Register</h4>
        <FormRow type="text" name="name" defaultValue="Kyle" />
        <FormRow
          type="text"
          name="lastName"
          labelText="Last Name"
          defaultValue="Hanson"
        />
        <FormRow type="text" name="location" defaultValue="earth" />
        <FormRow
          type="email"
          name="email"
          defaultValue="khanson1029@gmail.com"
        />
        <FormRow type="password" name="password" defaultValue="password1234" />
        <button type="submit" className="btn btn-block">
          submit
        </button>
        <p>
          Already a member?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
