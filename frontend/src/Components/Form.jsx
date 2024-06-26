import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Button } from "./Button";
import "./Form.css";
import Lottie from "lottie-react";
import loading from "../assets/orange-loading.json";
import success from "../assets/success-animation.json";
import alert from "../assets/orange-alert.json";

export const Form = ({
  username,
  setUsername,
  action,
  isMessage,
  setIsMessage,
  setIsLoggedIn,
  setFormSelect,
  displayMessageState,
  setDisplayMessageState,
  isLoading,
  setIsLoading,
}) => {
  const [password, setPassword] = useState("");
  const [usernameLengthCheck, setUsernameLengthCheck] = useState(true);
  const [passwordLengthCheck, setPasswordLengthCheck] = useState(true);
  const [fetchStatus, setFetchStatus] = useState("");
  const [successStatus, setSuccessStatus] = useState(false);

  const REGISTER_URL =
    "https://project-auth-moonlight-flamingos.onrender.com/register";

  const LOGIN_URL =
    "https://project-auth-moonlight-flamingos.onrender.com/login";

  const handleSubmit = (event) => {
    event.preventDefault();

    if (action === "Sign Up") {
      setIsLoading(true);
      handleRegistration();
    }

    if (action === "Log In") {
      setIsLoading(true);
      handleSignIn();
    }
    setUsername("");
    setPassword("");
  };

  const handleRegistration = () => {
    // Register a new user

    const fetchOptions = {
      method: "POST",
      body: JSON.stringify({ username: username, password: password }),
      headers: { "Content-Type": "application/json" },
    };

    fetch(REGISTER_URL, fetchOptions)
      .then((res) => {
        const status = res.status;
        return res.json().then((response) => ({ status, response }));
      })
      .then(({ status, response }) => {
        setIsLoading(false);
        setIsMessage(true);
        setDisplayMessageState(response.message);
        setFetchStatus(status);
        console.log(status);
      })
      .catch((error) => {
        console.error("Somthing is wrong. Please check the error:", error);
      });
  };

  const handleSignIn = () => {
    // Sign in user

    const fetchOptions = {
      method: "POST",
      body: JSON.stringify({ username: username, password: password }),
      headers: { "Content-Type": "application/json" },
    };

    fetch(LOGIN_URL, fetchOptions)
      .then((res) => {
        const status = res.status;
        return res.json().then((response) => ({ status, response }));
      })
      .then(({ status, response }) => {
        setIsLoading(false);
        setDisplayMessageState(response.message);
        setIsMessage(true);
        setFetchStatus(status);
        if (response.accessToken) {
          setIsLoggedIn(true);
          localStorage.setItem("access_token", response.accessToken);
          localStorage.setItem("username", response.username);
        }
      })
      .catch((error) => {
        console.error("Somthing is wrong. Please check the error:", error);
      });
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
    if (e.target.value.length >= 4) {
      setUsernameLengthCheck(false);
    } else {
      setUsernameLengthCheck(true);
    }
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length >= 8) {
      setPasswordLengthCheck(false);
    } else {
      setPasswordLengthCheck(true);
    }
  };

  let disableButton = true;
  if (usernameLengthCheck === true || passwordLengthCheck === true) {
    disableButton = true;
  } else {
    disableButton = false;
  }

  let displayText = true;
  if (isMessage) {
    displayText = true;
  } else {
    displayText = false;
  }

 

  useEffect(() => {
    setSuccessStatus(fetchStatus >= 200 && fetchStatus < 300);
  }, [fetchStatus]);

  return (
    <>
      {isLoading ? (
        <div className="loading">
          <Lottie
            animationData={loading}
            loop
            autoPlay
            style={{ width: 200, height: 200 }}
          />
          <h4>Loading ...</h4>
        </div>
      ) : displayText ? (
        <>
          {successStatus ? (
            <div className="success">
              <Lottie
                animationData={success}
                loop="false"
                autoPlay
                style={{ width: 200, height: 200 }}
              />
              {displayMessageState}
            </div>
          ) : (
            <div className="alert">
              <Lottie
                animationData={alert}
                loop="false"
                autoPlay
                style={{ width: 200, height: 200 }}
              />
              {displayMessageState}
            </div>
          )}

          <Button
            action="Log In"
            setFormSelect={setFormSelect}
            setIsMessage={setIsMessage}
          />
        </>
      ) : (
        <form>
          <div>
            {action} <span>Form</span>
          </div>
          <div>
            <label htmlFor="username">Username:</label>
            <input id="username" value={username} onChange={handleUsername} />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              value={password}
              type="password"
              onChange={handlePassword}
            />
          </div>
          <button
            id="submitButton"
            className="buttonstyle"
            action="Submit"
            type="submit"
            disabled={disableButton}
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
      )}
    </>
  );
};

Form.propTypes = {
  action: PropTypes.string,
  isLoggedIn: PropTypes.bool,
  setIsLoggedIn: PropTypes.func,
  username: PropTypes.string,
  setUsername: PropTypes.func,
  isMessage: PropTypes.bool,
  setIsMessage: PropTypes.func,
  displayMessageState: PropTypes.string,
  setDisplayMessageState: PropTypes.func,
  isLoading: PropTypes.bool,
  setIsLoading: PropTypes.func,
  setFormSelect: PropTypes.func,
};
