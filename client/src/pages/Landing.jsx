import styled from "styled-components";
import Wrapper from "../assets/wrappers/LandingPage";
import main from "../assets/images/main.svg";
import { Link } from "react-router-dom";
import { Logo } from "../components";

const Landing = () => {
  return (
    <div>
      <Wrapper>
        <nav>
          <Logo />
        </nav>
        <div className="container page">
          <div className="info">
            <h1>
              Fitness <span>Tracking</span> App
            </h1>
            <p>
              A bunch of workout related text stuff to highlight the content
              that will appear here later on in development.
            </p>
            <Link to="/register" className="btn register-link">
              Register
            </Link>
            <Link to="/login" className="btn">
              Login / Demo User
            </Link>
          </div>
          <img src={main} alt="fitness tracker" className="img main-img" />
        </div>
      </Wrapper>
    </div>
  );
};

export default Landing;
