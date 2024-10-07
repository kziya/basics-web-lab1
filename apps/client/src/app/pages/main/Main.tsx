import React from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useChat } from '../../chatContext';

export const Main: React.FC = () => {
  const { roomName, setRoomName, userName, setUserName } = useChat();
  const navigate = useNavigate();

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleRoomNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRoomName(event.target.value);
  };

  const handleSubmit = () => {
    // Handle form submission
    navigate('chat');
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <TextField
        label="Roomname"
        variant="outlined"
        sx={{ marginBottom: 2, width: '300px' }}
        autoComplete={'off'}
        value={roomName}
        onChange={handleRoomNameChange}
      />
      <TextField
        label="Username"
        variant="outlined"
        sx={{ marginBottom: 2, width: '300px' }}
        autoComplete={'off'}
        value={userName}
        onChange={handleUsernameChange}
      />
      <Button variant="contained" onClick={handleSubmit}>
        Enter
      </Button>
    </Box>
  );
};
