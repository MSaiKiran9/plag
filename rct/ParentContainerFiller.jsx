import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const ParentContainerFiller = () => {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      textAlign="center"
      p={8}
      maxWidth="600px"
      mx="auto"
    >
      <Heading as="h1" mb={4}>
        Welcome !
      </Heading>
      <Text mb={6}>
        Play exciting quizzes and challenge your knowledge. Create your quizzes
        and share them with the world!
      </Text>

      <MotionBox
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        mb={6}
      >
      </MotionBox>

      <Box>
        <Link to="/home">
          <Button colorScheme="teal" mr={2}>
            Create/Play Quiz
          </Button>
        </Link>
        <Link to="/profile">
          <Button colorScheme="orange">
            Edit Profile
          </Button>
        </Link>
      </Box>
    </MotionBox>
  );
};

export default ParentContainerFiller;
