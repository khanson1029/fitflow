import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo } from "../components";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <Wrapper>
      <form className="form">
        <Logo />
        <h4>login</h4>
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
          Not a member?
          <Link to="/register" className="member-btn">
            Register
          </Link>
        </p>
      </form>
    </Wrapper>
  );
};

export default Login;
