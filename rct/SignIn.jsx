import React, { useState } from 'react';
import { auth } from '../utils/firebaseUtils';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Input, Button,Divider,Text } from '@chakra-ui/react';
import {Flex} from '@chakra-ui/react'
import { Spinner,useToast } from '@chakra-ui/react'
import PasswordReset from './ResetPass';

export const SignIn = ({toggleSignin}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [processing,setProcessing] = useState(false);
  const toast = useToast();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePassChange = (e) => {
    setPassword(e.target.value);
  };
  const signin = async () => {
    try {
      setProcessing(true);
      const userCred=await signInWithEmailAndPassword(auth, email, password);
      if(!userCred.user.emailVerified){
        toast({
          title: 'Oops!',
          description: 'Email is not verified , please verify your email and try logging in again ',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: 'Oops!',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }finally{
      setProcessing(false);
    }
  };

  return (
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
{processing&&<Spinner/>}
      <Button
        colorScheme="teal"
        variant="outline"
        onClick={signin}
      >
        Sign In
      </Button>
      <Divider borderColor="gray.400" width="80%" mb={4} /> 
      <Button colorScheme='green' onClick={toggleSignin}>Sign Up</Button>
      <PasswordReset/>
    </Flex>
  );
  
}

