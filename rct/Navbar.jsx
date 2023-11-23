import React,{useContext} from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Flex,
  Text,
  Button,
  useDisclosure,
  IconButton,
  Avatar,
  HStack
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { UserContext } from '../App';
import {handleLogout} from '../heplerfunctions/Logout';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@chakra-ui/react";

const Navbar = ({currentView,handleCurrView}) => {
  const { isOpen, onToggle } = useDisclosure();
  const user=useContext(UserContext);
  const navigate = useNavigate();
  const toast = useToast();

  function signOutWrapper(){
    if(handleLogout(navigate)) toast({
      title: "Success!",
      description: "Logged out successfully",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    else  toast({
      title: 'Error!',
      description:"Error logging out , try again later",
      status: 'error',
      duration: 3000, 
      isClosable: true,
    }); 
  }
  function handleLinkClicks(e,view){
    e.preventDefault(); 
    handleCurrView(view);
  }

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      paddingX={4} // Horizontal padding
      paddingY={4} // Vertical padding
      bgColor="teal.500"
      color="white"
      borderBottom="2px solid white" // Add a bottom border
    >
      <Box>
        <HStack>
        <Avatar name={user?.displayName || 'User'}  size="md"  src={user?.photoURL} />
        <Text fontSize="2rem" fontWeight="bold">
          {currentView}
        </Text>
        </HStack>
      </Box>
      <IconButton

        display={{ base: 'block', md: 'none' }}
        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
        onClick={onToggle}
        fontSize="xl" // Adjust icon size
      />
      <Box
        display={{ base: isOpen ? 'block' : 'none', md: 'block' }}
        flexBasis={{ base: '100%', md: 'auto' }}
      >
        <Flex align="center" justify="center" direction="row" spacing={6}>
            <Box padding={4} fontSize={"1.5rem"} backgroundColor={'lightblue'}>
              <div onClick={(e)=>handleLinkClicks(e,'Home')} >
              <Link to="/home"  fontSize="lg">
            Home
          </Link>
              </div>
             </Box>
          <Box padding={4} fontSize={"1.5rem"} backgroundColor={'lightblue'}>
            <div onClick={(e)=>handleLinkClicks(e,'Profile')}>
            <Link to="/profile"   fontSize="lg">
            Profile
          </Link>
            </div>
          </Box>
          <Box padding={4} fontSize={"1.5rem"} backgroundColor={'lightblue'} onClick={signOutWrapper}   _hover={{ cursor: 'pointer' }} >
          Sign Out
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Navbar;
