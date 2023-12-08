import React, {  useState, useEffect } from "react";
import { Button, TextField, Box } from '@mui/material';
// import { ITask } from "../../interfaces/global_interfaces";
import './AddUser.css'

const AddUser = ({handleClose, userData}) => {

  const [userName, setUserName] = useState("");
  const [age, setAge] = useState(0);
  const [userEmail, setUserEmail] = useState("");
  const [userNumber, setUserNumber] = useState("");
  const [error, setError] = useState(null);
  const [btnName, setBtnName] = useState("Add User");
  // const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    if (userData) {
      setUserName(userData.username || "");
      setAge(userData.age || 0);
      setUserEmail(userData.email || "");
      setUserNumber(userData.phonenumber || "");
      setError(null);
      setBtnName('Update User')
    }else{
      setBtnName('Add User');
    }
  }, [userData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "task") {
      setUserName(value);
    } else if (name === "email") {
      setUserEmail(value);
    } else if (name === "phonenumber") {
      setUserNumber(value);
    } else if (name === "age") {
      const ageValue = parseInt(value, 10);
      if (ageValue > 0 && ageValue <= 100) {
        setAge(ageValue);
        setError(null);
      } else {
        setAge(0);
        setError("Age must be between 1 and 100");
      }
    }
  };

  const validateEmail = (email) => {
    // You can use a more sophisticated email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    // You can use a more sophisticated phone number validation
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
  };
  
  const handleUserUpdate = () => {
    if (!userName || !userEmail || !userNumber || age === 0 || age > 100) {
      setError("Please fill out all fields correctly");
      return;
    }

    if (!validateEmail(userEmail)) {
      setError("Invalid email address");
      return;
    }

    if (!validatePhoneNumber(userNumber)) {
      setError("Invalid phone number");
      return;
    }

    const existingData = JSON.parse(localStorage.getItem("userDetails")) || [];
    const newUser = {
      username: userName,
      age: age,
      email: userEmail,
      phonenumber: userNumber,
      // id: userData ? userData.id : existingData.length + 1,
      id: userData && userData.id ? userData.id : generateNewId(existingData),
      isAsc: true,
      status:
        age < 18
          ? "age <18"
          : age >= 18 && age < 24
          ? "age 19-24"
          : age >= 25 && age < 45
          ? "age 25-45"
          : "age >45",
    };

    let updatedData = [...existingData];
    const indexToUpdate = existingData.findIndex((user) => user.id === newUser.id);
    if (indexToUpdate !== -1) {
      updatedData[indexToUpdate] = newUser;
    } else {
      updatedData.push(newUser);
    }

    localStorage.setItem("userDetails", JSON.stringify(updatedData));

    setUserName("");
    setUserEmail("");
    setUserNumber("");
    setAge(0);
    setError(null);
    
    handleClose();
  };

  const generateNewId = (existingData) => {
    const maxId = Math.max(...existingData.map((user) => user.id), 0);
    return maxId + 1;
  };
  // console.log("check updatedData 160", userData);
  return (
    <Box sx={{ margin: '1rem' }}>
      <div className="text_container">
        <TextField
          sx={{ width: 300 }}
          label="Name"
          variant="outlined"
          name="task"
          value={userName}
          onChange={handleChange}
          />
        <TextField
          sx={{ width: 300 }}
          label="Email"
          variant="outlined"
          name="email"
          value={userEmail}
          onChange={handleChange}
          style={{ marginTop: '1rem' }}
        />
        <TextField
          sx={{ width: 300 }}
          label="Phone Number"
          variant="outlined"
          name="phonenumber"
          value={userNumber}
          onChange={handleChange}
          style={{ marginTop: '1rem' }}
        />
        <TextField
          sx={{ width: 300 }}
          label="Age"
          variant="outlined"
          name="age"
          value={age || ""}
          onChange={handleChange}
          type="number"
        />
      </div>
      {error && <p className="error" style={{ color: 'red', margin: '1rem 3rem' }}>{error}</p>}
      <div className="btn_container">
        <Button
          variant="contained"
          color="primary"
          onClick={handleClose}
          style={{ marginTop: '1rem', marginRight: '1rem' }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleUserUpdate}
          style={{ marginTop: '1rem' }}
        >
          {btnName}
        </Button>
      </div>
    </Box>
  );
};

export default AddUser;
