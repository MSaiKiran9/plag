import React, { useState } from 'react';
import { auth } from '../utils/firebaseUtils'; // Import your Firebase configuration
import { Input, Button, Text, VStack, Box } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { sendPasswordResetEmail } from 'firebase/auth';

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);
  const [error, setError] = useState('');
  const [isCardOpen, setIsCardOpen] = useState(false);

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setResetSent(true);
      setError('');
    } catch (error) {
      console.error('Error sending password reset email:', error.message);
      setError('Error sending reset email. Please try again.');
    }
  };

  return (
    <VStack spacing={4} align="center" mt={1}>
      <motion.div
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        exit={{ opacity: 0, scaleY: 0 }}
      >
        <Box
          bg="teal"
          p={2}
          borderRadius="md"
          onClick={() => setIsCardOpen(!isCardOpen)}
          cursor="pointer"
        >
          <Text color="white">Password Reset</Text>
        </Box>
      </motion.div>

      <AnimatePresence>
        {isCardOpen && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0 }}
          >
            <Box bg="teal.100" p={6} borderRadius="md">
              {resetSent ? (
                <Text color="black">Password reset email sent. Check your inbox!</Text>
              ) : (
                <VStack>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    bg="white"
                    color="blue.900"
                    borderColor="gold"
                    _hover={{ borderColor: 'gold' }}
                  />
                  <Button
                    p={1}
                    colorScheme="teal" // Change to the default green color
                    onClick={handleResetPassword}
                    _hover={{ bg: 'teal.600' }} // Adjust the hover color
                    transition="background 0.3s ease" // Add a transition effect
                  >
                    Reset Password
                  </Button>
                  {error && <Text color="red.500">{error}</Text>}
                </VStack>
              )}
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </VStack>
  );
};

export default PasswordReset;
