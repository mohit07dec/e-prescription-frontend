import React, { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * The AdminDashboard component is responsible for rendering the admin dashboard, which displays a list of doctors and prescriptions.
 * 
 * The component fetches the list of doctors and prescriptions from the server using the `fetchDoctors` and `fetchPrescriptions` functions, which make HTTP requests to the `/admin/all-doctors` and `/admin/all-prescriptions` endpoints, respectively.
 * 
 * The component renders the fetched data in two separate lists, one for doctors and one for prescriptions.
 */
const AdminDashboard = () => {
  const [doctors, setDoctors] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    fetchDoctors();
    fetchPrescriptions();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://localhost:8080/admin/all-doctors', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const fetchPrescriptions = async () => {
    try {
      const response = await axios.get('http://localhost:8080/admin/all-prescriptions', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setPrescriptions(response.data);
    } catch (error) {
      console.error('Error fetching prescriptions:', error);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>Doctors</h2>
      <ul>
        {doctors.map(doctor => (
          <li key={doctor._id}>
            {doctor.fullName} - {doctor.email} - Roles: {doctor.roles.join(', ')}
          </li>
        ))}
      </ul>
      <h2>Prescriptions</h2>
      <ul>
        {prescriptions.map(prescription => (
          <li key={prescription._id}>
            Patient: {prescription.patientName} - Doctor: {prescription.DoctorName} - Medications: {prescription.medications.length}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
