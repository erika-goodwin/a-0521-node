import { Button, FormGroup, InputGroup, Callout, Divider } from "@blueprintjs/core";
import React, { useState } from "react";
import { useSearchParams, useNavigate, Link } from 'react-router-dom'

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const userId = searchParams.get('id')

  const formSubmitHandler = e => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    const genericError = "Something went wrong! Please try again"

    if (password === "") {
      setIsSubmitting(false);
      return setError("Please enter your new password");
    }

    fetch(process.env.REACT_APP_API_ENDPOINT + "api/v1/auth/resetPassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, token, userId }),
        credentials: "include"
    }).then( async response => {
        setIsSubmitting(false)

        if(!response.ok){
            if(response.status === 401){
                setError('Invalid password')
            }else if(response.status === 500){

                const data = await response.json()
                if(data.error){
                    setError(data.error || genericError)
                }else{
                    setError(genericError)
                }
            }else{
                setError(genericError)
            }
        }else{
            navigate('/')
        }
    }).catch(error => {
        setIsSubmitting(false)
        setError(genericError) //generic error message
    })
  }

  return (
    <>
        {error && <Callout intent="danger">{error}</Callout>}
      <form className="auth-form" onSubmit={formSubmitHandler}>
        <FormGroup label="New Password" labelFor="password">
          <InputGroup
            id="password"
            placeholder="New Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <Button 
            intent='primary' 
            loading={isSubmitting} 
            fill 
            type="submit" 
            text="Submit" 
        />
        <Divider />
        <Link to="/">Back to Home</Link>
      </form>
    </>
  );
};

export default ResetPassword;
