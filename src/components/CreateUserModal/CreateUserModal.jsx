import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
// import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import AddUser from '../UserForm/AddUser';
import './CreateUserModalStyles.css';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    height:300,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const CreateUserModal = ({ open, handleClose, editedUserData }) => {
    const [userData, setUserData] = useState(editedUserData || {});

    useEffect(() => {
        const userData = localStorage.getItem('userDetails');
        console.log("check userData", userData);
        // const storedData = JSON.parse(userData) || [];
        // setData(storedData);
    }, []);

    useEffect(() => {
        // Update the local state when editedUserData prop changes
        setUserData(editedUserData || {});
    }, [editedUserData]);

      
    return(
        <div className="modal_container">
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography variant="h6" component="div" style={{ backgroundColor: "slatelight", textAlign: "center", color: "#000", fontSize: "20px", marginBottom: "16px" }}>
                        Add New User
                    </Typography>
                    <AddUser 
                      userData={userData}
                      handleClose={handleClose}
                    />
                </Box>
            </Modal>
        </div>
    )
}

export default CreateUserModal;