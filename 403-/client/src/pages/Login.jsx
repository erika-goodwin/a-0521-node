import { Button, FormGroup, InputGroup, Callout, Divider } from '@blueprintjs/core'
import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState("")

    const [userContext, setUserContext] = useContext(UserContext)
    const navigate = useNavigate()

    // useEffect(() => console.log(userContext), [userContext])

    const formSubmitHandler = e => {
        e.preventDefault()
        setIsSubmitting(true)
        setError("")

        fetch(process.env.REACT_APP_API_ENDPOINT + "api/v1/auth/signin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
            credentials: "include"
        }).then( async response => {

            setIsSubmitting(false)
            if(!response.ok){
                if(response.status === 400){
                    setError('Missing Credentials')
                }else if(response.status === 401){
                    setError('Invalid email and/or password')
                }else{
                    setError('Something went wrong! Please try again')
                }
            }else{
                const data = await response.json()
                setUserContext(prev => ({ ...prev, token: data.token, ...data }))
                navigate('/')
            }
        }).catch(error => {
            setIsSubmitting(false)
            setError('Something went wrong! Please try again') //generic error message
        })
    }

    return (
        <>
            {error && <Callout intent='danger'>{error}</Callout>}
            <form className='auth-form' onSubmit={formSubmitHandler}>
                <FormGroup label="Email" labelFor="email">
                    <InputGroup
                        id='email'
                        placeholder='Email'
                        type='email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </FormGroup>
                <FormGroup label="Password" labelFor="password">
                    <InputGroup
                        id='password'
                        placeholder='Password'
                        type='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </FormGroup>
                <Button 
                    intent='primary' 
                    fill
                    loading={isSubmitting}
                    type="submit" 
                    text="Sign In" 
                />
                <Divider />
                <Link to="/forgot">Forgot Password?</Link>
            </form>
        </>
    )
}

export default Login