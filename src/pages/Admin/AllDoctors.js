import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AllDoctors() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/admin/all-doctors')
      .then(response => {
        setDoctors(response.data);
      })
      .catch(error => {
        console.error('Error fetching doctors:', error);
      });
  }, []);

  return (
    <div>
      <h2>All Doctors</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map(doctor => (
            <tr key={doctor.id}>
              <td>{doctor.id}</td>
              <td>{doctor.fullName}</td>
              <td>{doctor.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllDoctors;
