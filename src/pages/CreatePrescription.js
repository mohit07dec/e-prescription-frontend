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
  Grid,
  GridItem,
} from '@chakra-ui/react';import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { handleSuccess, handleError } from '../utils';

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

  const submitPrescription = () => {
    const prescriptionPromise = axios.post('/prescription/create', {
      ...patientInfo,
      medications,
    });

    toast.promise(prescriptionPromise, {
      success: {
        title: 'Prescription created',
        description: 'The prescription has been successfully created.',
      },
      error: {
        title: 'Failed to create prescription',
        description: 'There was an error creating the prescription. Please try again.',
      },
      loading: {
        title: 'Creating prescription',
        description: 'Please wait while we create the prescription.',
      },
    });

    prescriptionPromise.then(() => {
      // Reset form or navigate to a different page
      setActiveStep(0);
      setPatientInfo({
        patientEmail: '',
        patientName: '',
        patientAge: '',
        patientGender: '',
      });
      setMedications([{ name: '', dosage: '', frequency: '', duration: '', instructions: '' }]);
    });
  };  return (
    <Box maxWidth="1200px" margin="auto" padding={8}>
      <Heading mb={6} display="flex" alignItems="center">
        Create New Prescription
      </Heading>
      <Stepper index={activeStep} mb={12}>
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

      {activeStep === 0 && (
        <Grid templateColumns="repeat(2, 1fr)" gap={8}>
          <GridItem>
            <FormControl isRequired>
              <FormLabel>Patient Email</FormLabel>
              <Input name="patientEmail" value={patientInfo.patientEmail} onChange={handlePatientInfoChange} placeholder="Patient Email" />
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl isRequired>
              <FormLabel>Patient Name</FormLabel>
              <Input name="patientName" value={patientInfo.patientName} onChange={handlePatientInfoChange} placeholder="Patient Name" />
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl isRequired>
              <FormLabel>Patient Age</FormLabel>
              <Input name="patientAge" value={patientInfo.patientAge} onChange={handlePatientInfoChange} placeholder="Patient Age" />
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl isRequired>
              <FormLabel>Patient Gender</FormLabel>
              <Input name="patientGender" value={patientInfo.patientGender} onChange={handlePatientInfoChange} placeholder="Patient Gender" />
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <Button onClick={nextStep} float="right">Next</Button>
          </GridItem>
        </Grid>
      )}

      {activeStep === 1 && (
        <VStack spacing={8} align="stretch">
          <Table variant="simple" colorScheme="blue">
            <Thead bg="blue.100">
              <Tr>
                <Th>Medication Name</Th>
                <Th>Dosage</Th>
                <Th>Frequency</Th>
                <Th>Duration</Th>
                <Th>Instructions</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {medications.map((med, index) => (
                <Tr key={index}>
                  <Td>
                    <Input
                      value={med.name}
                      onChange={(e) => handleMedicationChange(index, 'name', e.target.value)}
                      placeholder="e.g., Amoxicillin"
                    />
                  </Td>
                  <Td>
                    <Input
                      value={med.dosage}
                      onChange={(e) => handleMedicationChange(index, 'dosage', e.target.value)}
                      placeholder="e.g., 500mg"
                    />
                  </Td>
                  <Td>
                    <Input
                      value={med.frequency}
                      onChange={(e) => handleMedicationChange(index, 'frequency', e.target.value)}
                      placeholder="e.g., 3 times a day"
                    />
                  </Td>
                  <Td>
                    <Input
                      value={med.duration}
                      onChange={(e) => handleMedicationChange(index, 'duration', e.target.value)}
                      placeholder="e.g., 7 days"
                    />
                  </Td>
                  <Td>
                    <Input
                      value={med.instructions}
                      onChange={(e) => handleMedicationChange(index, 'instructions', e.target.value)}
                      placeholder="e.g., Take with food"
                    />
                  </Td>
                  <Td>
                    <IconButton
                      aria-label="Remove medication"
                      icon={<DeleteIcon />}
                      onClick={() => removeMedication(index)}
                      colorScheme="red"
                      size="sm"
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Button leftIcon={<AddIcon />} colorScheme="teal" onClick={addMedication}>
            Add Medication
          </Button>
          <Box display="flex" justifyContent="space-between" mt={8}>
            <Button onClick={prevStep}>Previous</Button>
            <Button colorScheme="blue" onClick={submitPrescription}>Submit Prescription</Button>
          </Box>
        </VStack>
      )}
    </Box>
  );
}

export default CreatePrescription;