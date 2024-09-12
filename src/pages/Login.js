import React, { useState } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text, 
  Link,
  Container,
} from '@chakra-ui/react';

function Login() {
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginInfo({ ...loginInfo, [name]: value });
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;
        if (!email || !password) {
            return handleError('Email and password are required')
        }
        try {
            const url = `http://localhost:8080/auth/login`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
            });
            const result = await response.json();
            const { success, message, jwtToken, name, error } = result;
            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
                setTimeout(() => {
                    navigate('/home')
                }, 1000)
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            } else if (!success) {
                handleError(message);
            }
        } catch (err) {
            handleError(err);
        }
    }

    return (
        <Container maxW="container.sm" centerContent>
            <Box padding="4" maxWidth="400px" width="100%">
                <VStack spacing={8} align="stretch">
                    <Heading as="h1" size="xl" textAlign="center">Login</Heading>
                    <form onSubmit={handleLogin}>
                        <VStack spacing={4}>
                            <FormControl isRequired>
                                <FormLabel htmlFor='email'>Email</FormLabel>
                                <Input
                                    onChange={handleChange}
                                    type='email'
                                    name='email'
                                    placeholder='Enter your email...'
                                    value={loginInfo.email}
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel htmlFor='password'>Password</FormLabel>
                                <Input
                                    onChange={handleChange}
                                    type='password'
                                    name='password'
                                    placeholder='Enter your password...'
                                    value={loginInfo.password}
                                />
                            </FormControl>
                            <Button type='submit' colorScheme="blue" width="full">Login</Button>
                        </VStack>
                    </form>
                    <Text textAlign="center">
                        Don't have an account?{' '}
                        <Link as={RouterLink} to="/signup" color="blue.500">
                            Sign up
                        </Link>
                    </Text>
                </VStack>
            </Box>
            <ToastContainer />
        </Container>
    )
}

export default Login