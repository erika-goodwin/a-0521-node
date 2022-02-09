import { Button, FormGroup, InputGroup, Callout } from "@blueprintjs/core";
import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext"

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const [userContext, setUserContext] = useContext(UserContext)

  const formSubmitHandler = e => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    fetch(process.env.REACT_APP_API_ENDPOINT + "api/v1/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
        credentials: "include"
    }).then( async response => {
        setIsSubmitting(false)

        if(!response.ok){
            if(response.status === 400){
                setError('Please fill all the missing fields')
            }else if(response.status === 401){
                setError('Invalid email and/or password')
            }else if(response.status === 500){

                const data = await response.json()
                if(data.message){
                    setError(data.message || 'Something went wrong! Please try again')
                }else{
                    setError('Something went wrong! Please try again')
                }
            }else{
                setError('Something went wrong! Please try again')
            }
        }else{
            const data = await response.json()
            setUserContext(prev => ({ ...prev, token: data.token }))
        }
    }).catch(error => {
        setIsSubmitting(false)
        setError('Something went wrong! Please try again') //generic error message
    })
  }

  return (
    <>
        {error && <Callout intent="danger">{error}</Callout>}
      <form className="auth-form" onSubmit={formSubmitHandler}>
        <FormGroup label="Name" labelFor="name">
          <InputGroup
            id="name"
            placeholder="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormGroup>
        <FormGroup label="Email" labelFor="email">
          <InputGroup
            id="email"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup label="Password" labelFor="password">
          <InputGroup
            id="password"
            placeholder="Password"
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
            text="Sign In" 
        />
      </form>
    </>
  );
};

export default Register;
