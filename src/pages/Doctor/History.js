import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  useDisclosure,
  Box,
  Heading,
  Icon,
  Badge,
} from '@chakra-ui/react';
import { FaEye, FaCalendarAlt, FaUser, FaEnvelope, FaVenusMars } from 'react-icons/fa';
import PrescriptionModal from './PrescriptionModal';

function History() {
  const [prescriptions, setPrescriptions] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedPrescription, setSelectedPrescription] = useState(null);

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      const response = await axios.get('/prescription/all');
      setPrescriptions(response.data);
    } catch (err) {
      console.error('Error fetching prescriptions:', err);
    }
  };

  const handleViewMedications = (prescription) => {
    setSelectedPrescription(prescription);
    onOpen();
  };

  return (
    <Box>
      <Heading mb={6} display="flex" alignItems="center">
        <Icon as={FaCalendarAlt} mr={2} />
        Prescription History
      </Heading>
      <Table variant="simple" colorScheme="blue">
        <Thead bg="blue.100">
          <Tr>
            <Th><Icon as={FaUser} mr={2} />Patient Name</Th>
            <Th>Age</Th>
            <Th><Icon as={FaEnvelope} mr={2} />Email</Th>
            <Th><Icon as={FaVenusMars} mr={2} />Gender</Th>
            <Th><Icon as={FaCalendarAlt} mr={2} />Date</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {prescriptions.map((prescription, index) => (
            <Tr key={index}>
              <Td fontWeight="medium">{prescription.patientName}</Td>
              <Td><Badge colorScheme="purple">{prescription.patientAge}</Badge></Td>
              <Td>{prescription.patientEmail}</Td>
              <Td><Badge colorScheme="green">{prescription.patientGender}</Badge></Td>
              <Td>{new Date(prescription.createdAt).toLocaleDateString()}</Td>
              <Td>
                <Button leftIcon={<FaEye />} colorScheme="blue" onClick={() => handleViewMedications(prescription)}>
                  View Details
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <PrescriptionModal prescription={selectedPrescription} isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}

export default History;