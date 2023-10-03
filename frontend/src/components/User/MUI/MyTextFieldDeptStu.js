import React, { useEffect, useState } from 'react';
import { TextField, MenuItem } from '@mui/material';
import axios from 'axios';

const MyTextFieldDeptStu = ({ universityId: initialUniversityId, setDeptStu, ...props }) => {
  const [departments, setDepartments] = useState([]);
  const [universityId, setUniversityId] = useState(''); 

  useEffect(() => {
    if (initialUniversityId) {
        setUniversityId(initialUniversityId);
    }
}, [initialUniversityId]); 

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get('/register/departments?universityId='+universityId);
        setDepartments(response.data.departments);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDepartments();
  }, [universityId]); 

  const handleDepartmentChange = (event) => {
    const selectedDepartment = departments.find(department => department.name === event.target.value);
    if (selectedDepartment) {
      setDeptStu(selectedDepartment.id);
    }
};

  return (
    <TextField
      required
      select
      fullWidth
      onChange={handleDepartmentChange} 
      {...props}
      margin="normal"
    >
      {departments.map((department) => (
        <MenuItem key={department.id} value={department.name}>
          {department.name}
        </MenuItem>
      ))}
    </TextField>
  );
}

export default MyTextFieldDeptStu;
