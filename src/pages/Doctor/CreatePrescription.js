import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Stepper,
  Step,
  StepIndicator,
  StepStatus,
  StepIcon,
  StepNumber,
  StepTitle,
  StepDescription,
  StepSeparator,
  useSteps,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  useToast,
  HStack,
  useColorModeValue,
  Container,
} from '@chakra-ui/react';
import { FaPlus, FaTrash, FaArrowRight, FaArrowLeft, FaSave } from 'react-icons/fa';
import axios from 'axios';

const steps = [
  { title: 'Patient Info', description: 'Enter patient details' },
  { title: 'Medications', description: 'Add medications' },
];

function CreatePrescription() {
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  const [patientInfo, setPatientInfo] = useState({
    patientEmail: '',
    patientName: '',
    patientAge: '',
    patientGender: '',
  });

  const [medications, setMedications] = useState([
    { name: '', dosage: '', frequency: '', duration: '', instructions: '' }
  ]);

  const toast = useToast();

  const handlePatientInfoChange = (e) => {
    setPatientInfo({ ...patientInfo, [e.target.name]: e.target.value });
  };

  const handleMedicationChange = (index, field, value) => {
    const newMedications = [...medications];
    newMedications[index][field] = value;
    setMedications(newMedications);
  };

  const addMedication = () => {
    setMedications([...medications, { name: '', dosage: '', frequency: '', duration: '', instructions: '' }]);
  };

  const removeMedication = (index) => {
    const newMedications = medications.filter((_, i) => i !== index);
    setMedications(newMedications);
  };

  const nextStep = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/prescription/create', {
        ...patientInfo,
        medications,
      });
      toast({
        title: 'Prescription created.',
        description: "We've created your prescription for you.",
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      // Reset form or redirect
    } catch (error) {
      toast({
        title: 'An error occurred.',
        description: 'Unable to create prescription.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <Container maxW="container.xl" py={8}>
      <Box>
        <Heading mb={6}>Create New Prescription</Heading>
        <Stepper index={activeStep} mb={8} colorScheme="blue">
          {steps.map((step, index) => (
            <Step key={index}>
              <StepIndicator>
                <StepStatus complete={<StepIcon />} incomplete={<StepNumber />} active={<StepNumber />} />
              </StepIndicator>
              <Box flexShrink='0'>
                <StepTitle>{step.title}</StepTitle>
                <StepDescription>{step.description}</StepDescription>
              </Box>
              <StepSeparator />
            </Step>
          ))}
        </Stepper>

        <Box borderWidth={1} borderRadius="lg" p={6} boxShadow="md" bg={bgColor} borderColor={borderColor}>
          {activeStep === 0 && (
            <VStack spacing={6} align="stretch">
              <FormControl isRequired>
                <FormLabel>Patient Email</FormLabel>
                <Input name="patientEmail" value={patientInfo.patientEmail} onChange={handlePatientInfoChange} placeholder="Enter patient email" />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Patient Name</FormLabel>
                <Input name="patientName" value={patientInfo.patientName} onChange={handlePatientInfoChange} placeholder="Enter patient name" />
              </FormControl>
              <HStack>
                <FormControl isRequired>
                  <FormLabel>Patient Age</FormLabel>
                  <Input name="patientAge" value={patientInfo.patientAge} onChange={handlePatientInfoChange} placeholder="Enter patient age" />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Patient Gender</FormLabel>
                  <Input name="patientGender" value={patientInfo.patientGender} onChange={handlePatientInfoChange} placeholder="Enter patient gender" />
                </FormControl>
              </HStack>
              <Button rightIcon={<FaArrowRight />} colorScheme="blue" onClick={nextStep} size="lg" width="full">
                Next: Add Medications
              </Button>
            </VStack>
          )}

          {activeStep === 1 && (
            <VStack spacing={6} align="stretch">
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Name</Th>
                    <Th>Dosage</Th>
                    <Th>Frequency</Th>
                    <Th>Duration</Th>
                    <Th>Instructions</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {medications.map((med, index) => (
                    <Tr key={index}>
                      <Td><Input value={med.name} onChange={(e) => handleMedicationChange(index, 'name', e.target.value)} placeholder="Medication Name" /></Td>
                      <Td><Input value={med.dosage} onChange={(e) => handleMedicationChange(index, 'dosage', e.target.value)} placeholder="Dosage" /></Td>
                      <Td><Input value={med.frequency} onChange={(e) => handleMedicationChange(index, 'frequency', e.target.value)} placeholder="Frequency" /></Td>
                      <Td><Input value={med.duration} onChange={(e) => handleMedicationChange(index, 'duration', e.target.value)} placeholder="Duration" /></Td>
                      <Td><Input value={med.instructions} onChange={(e) => handleMedicationChange(index, 'instructions', e.target.value)} placeholder="Instructions" /></Td>
                      <Td>
                        <IconButton
                          icon={<FaTrash />}
                          colorScheme="red"
                          onClick={() => removeMedication(index)}
                          aria-label="Remove medication"
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              <Button leftIcon={<FaPlus />} onClick={addMedication} colorScheme="green" size="md">
                Add Medication
              </Button>
              <HStack spacing={4} justify="space-between">
                <Button leftIcon={<FaArrowLeft />} onClick={prevStep} size="lg" variant="outline">
                  Previous: Patient Details
                </Button>
                <Button rightIcon={<FaSave />} colorScheme="blue" onClick={handleSubmit} size="lg">
                  Submit Prescription
                </Button>
              </HStack>
            </VStack>
          )}
        </Box>
      </Box>
    </Container>
  );
}

export default CreatePrescription;
