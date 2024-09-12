import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Text,
  VStack,
  HStack,
  Badge,
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';

function PrescriptionModal({ prescription, isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader bg="blue.500" color="white">Prescription Details</ModalHeader>
        <ModalCloseButton color="white" />
        <ModalBody>
          <VStack align="stretch" spacing={6}>
            <Box>
              <Text fontSize="lg" fontWeight="bold" mb={2}>Patient Information</Text>
              <HStack spacing={4}>
                <Badge colorScheme="green">Name: {prescription?.patientName}</Badge>
                <Badge colorScheme="purple">Age: {prescription?.patientAge}</Badge>
                <Badge colorScheme="orange">Gender: {prescription?.patientGender}</Badge>
              </HStack>
            </Box>
            <Box>
              <Text fontSize="lg" fontWeight="bold" mb={2}>Medications</Text>
              <Table variant="simple" colorScheme="blue">
                <Thead bg="blue.100">
                  <Tr>
                    <Th>#</Th>
                    <Th>Medication</Th>
                    <Th>Dosage</Th>
                    <Th>Frequency</Th>
                    <Th>Duration</Th>
                    <Th>Instructions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {prescription?.medications.map((med, i) => (
                    <Tr key={i}>
                      <Td><Text fontSize="sm" fontWeight="bold">{i + 1}</Text></Td>
                      <Td><Text fontWeight="medium">{med.name}</Text></Td>
                      <Td><Text fontSize="sm">{med.dosage}</Text></Td>
                      <Td><Text fontSize="sm">{med.frequency}</Text></Td>
                      <Td><Text fontSize="sm">{med.duration}</Text></Td>
                      <Td><Text fontSize="sm">{med.instructions}</Text></Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default PrescriptionModal;