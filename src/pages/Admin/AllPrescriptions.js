import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AllPrescriptions() {
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/admin/all-prescriptions')
      .then(response => {
        setPrescriptions(response.data);
      })
      .catch(error => {
        console.error('Error fetching prescriptions:', error);
      });
  }, []);

  return (
    <div>
      <h2>All Prescriptions</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Patient Name</th>
            <th>Doctor Name</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {prescriptions.map(prescription => (
            <tr key={prescription.id}>
              <td>{prescription.id}</td>
              <td>{prescription.patientName}</td>
              <td>{prescription.doctorName}</td>
              <td>{prescription.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllPrescriptions;
