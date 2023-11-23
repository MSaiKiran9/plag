import React from "react";
import { Center, Spinner, Text } from "@chakra-ui/react";

const LoadingPage = ({ text = "Loading..." }) => {
  return (
    <Center h="100vh">
      <div>
        <Spinner size="xl" color="teal.500" />
        <Text mt={4} fontSize="lg" fontWeight="bold">
          {text}
        </Text>
      </div>
    </Center>
  );
};

export default LoadingPage;
