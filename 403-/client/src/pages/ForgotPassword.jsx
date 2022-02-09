import { Button, FormGroup, InputGroup, Callout, Divider } from "@blueprintjs/core";
import React, { useState } from "react";
import { Link } from 'react-router-dom'

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [disableButton, setDisableButton] = useState(false);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess("");
    setDisableButton(false)

    const genericError = "Something went wrong! Please try again"

    if (email === "") {
      setIsSubmitting(false);
      return setError("Please enter an email");
    }

    fetch(
      process.env.REACT_APP_API_ENDPOINT + "api/v1/auth/requestResetPassword",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
        credentials: "include",
      }
    )
      .then(async (response) => {
        setIsSubmitting(false);

        if (!response.ok) {
          if (response.status === 401) {
            setError("Invalid email");
          } else if (response.status === 500) {

            const data = await response.json();
            if (data.error) {
              setError(data.error || genericError);
            } else {
              setError(genericError);
            }

          } else {
            setError(genericError);
          }
        } else {
          // return await response.json();
          setDisableButton(true)
          return setSuccess("An instruction to reset your password has been sent to your email address.")
        }
      })
      .catch((error) => {
        setIsSubmitting(false);
        setError(genericError); //generic error message
      });
  };

  return (
    <>
      {error && <Callout intent="danger">{error}</Callout>}
      {success && <Callout intent="success">{success}</Callout>}
      <form className="auth-form" onSubmit={formSubmitHandler}>
        <FormGroup label="Email" labelFor="email">
          <InputGroup
            id="email"
            placeholder="Email"
            type="email"
            disabled={disableButton}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <Button
          intent="primary"
          loading={isSubmitting}
          fill
          disabled={disableButton}
          type="submit"
          text="Forgot Password"
        />
        <Divider />
        <Link to="/">Back to Home</Link>
      </form>
    </>
  );
};

export default ForgotPassword;
