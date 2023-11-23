import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup,sendEmailVerification } from 'firebase/auth';
import { auth,googleProvider } from '../utils/firebaseUtils';
import { Flex } from '@chakra-ui/react';
import { Input, Button,Divider,Text,useToast } from '@chakra-ui/react';
import {
    Alert,
    AlertIcon,
  } from '@chakra-ui/react'
  import { Spinner } from '@chakra-ui/react'
import { validateEmail,validatePassword } from '../heplerfunctions/signupvalidation';
import PasswordReset from './ResetPass';
export const SignUp = ({toggleSignin}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
const [trackSignupButton,setTrackSignupButton]=useState(false);
const [error,setError]=useState(null);
const toast = useToast();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePassChange = (e) => {
    setPassword(e.target.value);
  };

  const signup = async () => {
    setTrackSignupButton(true);
    try {
      if(!validateEmail(email)){
        toast({
          title: 'Oops!',
          description: 'Invalid email address',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        return;
      }
      if(!validatePassword(password)){
        toast({
          title: 'Oops!',
          description: 'Invalid password. It must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one digit, and one special character.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        return;
      }
      const userCerdential = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCerdential.user);
      setTimeout(toggleSignin, 3000);
      toast({
        title: 'Successfully signed up',
        description: 'Signed up successfully , redirecting to signin page !',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error signing up:', error.message);
setError(error.message);
toast({
  title: 'Oops!',
  description: error.message,
  status: 'error',
  duration: 3000,
  isClosable: true,
});
    }
    finally{
        setTrackSignupButton(false);
    }
  };
  const handleGoogleSignin= async ()=>{
    try{
        const user=await signInWithPopup(auth,googleProvider);
        toast({
          title: 'Welcome :) ',
          description: 'Howdy?',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        console.log(user);
    }
    catch(error){
        console.log(error.message);
    }
  }
  return (<>
    <Flex
      direction="column"
      align="center"
      justify="center"
      h="100vh"
      w="100%"
      wrap="wrap"
      gap={3}
    >
        <Text fontSize='6xl'>Q</Text>
      <Input width={"50%"} placeholder="Email" onChange={handleEmailChange} />
      <Input width={"50%"} type="password" placeholder="Password" onChange={handlePassChange} />
      {error && (
  <Alert width="50%" status="error" variant="subtle">
    <AlertIcon />
    {error}
  </Alert>
)}
      <Button
        colorScheme="teal"
        variant="outline"
        onClick={signup}
      >
        Sign Up
      </Button>
      {trackSignupButton&&<Spinner/>}
      <Divider borderColor="gray.400" width="80%" mb={4} /> 
      <Button colorScheme='green' onClick={toggleSignin}>Sign In</Button>
      <Button onClick={handleGoogleSignin} colorScheme='gray'>Setup with google</Button>
      <PasswordReset/>
    </Flex>
    </>
  );
};

