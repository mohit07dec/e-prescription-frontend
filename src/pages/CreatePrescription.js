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
} from '@chakra-ui/react';

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

  const nextStep = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  return (
    <Box>
      <Heading mb={4}>Create New Prescription</Heading>
      <Stepper index={activeStep} mb={8}>
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
        <VStack spacing={4} align="stretch">
          <FormControl isRequired>
            <FormLabel>Patient Email</FormLabel>
            <Input name="patientEmail" value={patientInfo.patientEmail} onChange={handlePatientInfoChange} placeholder="Patient Email" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Patient Name</FormLabel>
            <Input name="patientName" value={patientInfo.patientName} onChange={handlePatientInfoChange} placeholder="Patient Name" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Patient Age</FormLabel>
            <Input name="patientAge" value={patientInfo.patientAge} onChange={handlePatientInfoChange} placeholder="Patient Age" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Patient Gender</FormLabel>
            <Input name="patientGender" value={patientInfo.patientGender} onChange={handlePatientInfoChange} placeholder="Patient Gender" />
          </FormControl>
          <Button onClick={nextStep}>Next</Button>
        </VStack>
      )}

      {activeStep === 1 && (
        <VStack spacing={4} align="stretch">
          {medications.map((med, index) => (
            <Box key={index} borderWidth={1} borderRadius="lg" p={4}>
              <FormControl isRequired>
                <FormLabel>Medication Name</FormLabel>
                <Input value={med.name} onChange={(e) => handleMedicationChange(index, 'name', e.target.value)} placeholder="Medication Name" />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Dosage</FormLabel>
                <Input value={med.dosage} onChange={(e) => handleMedicationChange(index, 'dosage', e.target.value)} placeholder="Dosage" />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Frequency</FormLabel>
                <Input value={med.frequency} onChange={(e) => handleMedicationChange(index, 'frequency', e.target.value)} placeholder="Frequency" />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Duration</FormLabel>
                <Input value={med.duration} onChange={(e) => handleMedicationChange(index, 'duration', e.target.value)} placeholder="Duration" />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Instructions</FormLabel>
                <Input value={med.instructions} onChange={(e) => handleMedicationChange(index, 'instructions', e.target.value)} placeholder="Instructions" />
              </FormControl>
            </Box>
          ))}
          <Button onClick={addMedication}>+ Add Medication</Button>
          <Button onClick={prevStep}>Previous</Button>
          <Button onClick={() => console.log({ ...patientInfo, medications })}>Submit Prescription</Button>
        </VStack>
      )}
    </Box>
  );
}

export default CreatePrescription;
