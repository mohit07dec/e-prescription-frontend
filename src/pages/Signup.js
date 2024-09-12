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

function Signup() {
    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: ''
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupInfo({ ...signupInfo, [name]: value });
    }

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password } = signupInfo;
        if (!name || !email || !password) {
            return handleError('Name, email and password are required')
        }
        try {
            const url = `http://localhost:8080/auth/signup`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupInfo)
            });
            const result = await response.json();
            const { success, message, error } = result;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/login')
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
                    <Heading as="h1" size="xl" textAlign="center">Sign Up</Heading>
                    <form onSubmit={handleSignup}>
                        <VStack spacing={4}>
                            <FormControl isRequired>
                                <FormLabel htmlFor='name'>Name</FormLabel>
                                <Input
                                    onChange={handleChange}
                                    type='text'
                                    name='name'
                                    autoFocus
                                    placeholder='Enter your name...'
                                    value={signupInfo.name}
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel htmlFor='email'>Email</FormLabel>
                                <Input
                                    onChange={handleChange}
                                    type='email'
                                    name='email'
                                    placeholder='Enter your email...'
                                    value={signupInfo.email}
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel htmlFor='password'>Password</FormLabel>
                                <Input
                                    onChange={handleChange}
                                    type='password'
                                    name='password'
                                    placeholder='Enter your password...'
                                    value={signupInfo.password}
                                />
                            </FormControl>
                            <Button type='submit' colorScheme="blue" width="full">Sign Up</Button>
                        </VStack>
                    </form>
                    <Text textAlign="center">
                        Already have an account?{' '}
                        <Link as={RouterLink} to="/login" color="blue.500">
                            Log in
                        </Link>
                    </Text>
                </VStack>
            </Box>
            <ToastContainer />
        </Container>
    )
}

export default Signup
