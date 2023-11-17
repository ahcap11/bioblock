import React from "react";

const ErrorPage = ({ error }) => {
  return (
    <div>
      <h1>Error</h1>
      <p>An error occurred:</p>
      <p>{error}</p>
    </div>
  );
};

export default ErrorPage;
