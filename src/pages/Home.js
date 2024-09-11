import React, { useState, useEffect } from 'react';
import { Box, Flex, VStack, Button, useColorMode, Switch, Stack, Text } from '@chakra-ui/react';
import History from './History';
import CreatePrescription from './CreatePrescription';
import { useNavigate } from 'react-router-dom';
import { handleSuccess } from '../utils';


function Home() {
  const [activeTab, setActiveTab] = useState('history');
  const { colorMode, toggleColorMode } = useColorMode();
  const [loggedInUser, setLoggedInUser] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('loggedInUser');
    if (user) {
      setLoggedInUser(user);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('User Logged out');
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  return (
    <Flex h="100vh">
      <Box w="250px" bg={colorMode === 'light' ? "gray.100" : "gray.700"} p={4} position="fixed" left={0} top={0} bottom={0}>
        <VStack spacing={4} align="stretch" h="100%">
          <Button
            onClick={() => setActiveTab('history')}
            colorScheme={activeTab === 'history' ? 'blue' : 'gray'}
          >
            History
          </Button>
          <Button
            onClick={() => setActiveTab('create')}
            colorScheme={activeTab === 'create' ? 'blue' : 'gray'}
          >
            Create Prescription
          </Button>
          <Stack direction='row' alignItems="center">
            <Switch
              colorScheme='teal'
              size='lg'
              isChecked={colorMode === 'dark'}
              onChange={toggleColorMode}
            />
            <Text>{colorMode === 'light' ? 'Light' : 'Dark'} Mode</Text>
          </Stack>
          <Button colorScheme="red" mt="auto" onClick={handleLogout}>
            Logout
          </Button>
        </VStack>
      </Box>
      <Box flex={1} ml="250px" p={4} overflowY="auto">
        {activeTab === 'history' && <History />}
        {activeTab === 'create' && <CreatePrescription />}
      </Box>
    </Flex>
  );
}
export default Home;
