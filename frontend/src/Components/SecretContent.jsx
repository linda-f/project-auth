import PropTypes from "prop-types";

export const SecretContent = ({
  setDisplayMessageState,
  displayMessageState,
  setIsLoading,
}) => {
  const SECRET_URL =
    "https://project-auth-moonlight-flamingos.onrender.com/secrets";

  const handleSecrets = () => {
    // Sign in user

    const fetchOptions = {
      method: "GET",
      // body: JSON.stringify({ }),
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("access_token"),
      },
    };

    fetch(SECRET_URL, fetchOptions)
      .then((res) => res.json())
      .then((loggedIn) => {
        setIsLoading(false);
        setDisplayMessageState(loggedIn.secret);
      })
      .catch((error) => {
        console.error("Somthing is wrong. Please check the error:", error);
      });
  };

  handleSecrets();

  return (
    <div>
      <h2>Hey {localStorage.getItem("username")}!</h2>
      <h3>This is your secret content:</h3>
      {displayMessageState}
    </div>
  );
};

SecretContent.propTypes = {
  setDisplayMessageState: PropTypes.func,
  displayMessageState: PropTypes.string,
  setIsLoading: PropTypes.func,
};
