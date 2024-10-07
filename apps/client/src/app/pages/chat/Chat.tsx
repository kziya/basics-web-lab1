import React, { useEffect, useState } from 'react';
import { Grid, Paper, Typography, Box, TextField, Button } from '@mui/material';
import { useChat } from '../../chatContext';
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../../socketContext';

export const Chat: React.FC = () => {
  const { roomName, userName } = useChat(); // Get context values
  const [messages, setMessages] = useState<
    { user: string; text: string; time: string }[]
  >([]);
  const [message, setMessage] = useState<string>('');
  const navigate = useNavigate();
  const { socket } = useSocket();

  useEffect(() => {
    if (!roomName || !userName) {
      navigate('/');
      return;
    }
    socket.emit('join', { roomName, userName });
  }, [roomName, userName]);

  socket.on('message', (message) => {
    setMessages([...messages, message]);
  });

  // Function to handle sending a message
  const handleSendMessage = () => {
    const newMessage = {
      user: userName,
      text: message,
      time: new Date().toLocaleTimeString(),
    };
    setMessages([...messages, newMessage]); // Add new message to the array
    setMessage(''); // Clear input

    socket.emit('message', newMessage);
  };

  return (
    <Grid container spacing={2} sx={{ height: '100vh', padding: 2 }}>
      <Grid item xs={3}>
        <Paper
          elevation={3}
          sx={{ height: '100%', padding: 2, backgroundColor: '#008c9e' }}
        >
          <Box
            mb={2}
            p={2}
            sx={{ backgroundColor: '#b3e5fc', borderRadius: 2 }}
          >
            <Typography variant="h6">
              Room: <strong>{roomName}</strong>
            </Typography>
            <Typography variant="h6">
              Username: <strong>{userName}</strong>
            </Typography>
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={9}>
        <Paper
          elevation={3}
          sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        >
          <Box sx={{ flexGrow: 1, padding: 2, overflowY: 'auto' }}>
            {messages.map((msg, index) => (
              <Box key={index} mb={2}>
                <Typography variant="subtitle2" color="textSecondary">
                  {msg.user} {msg.time}
                </Typography>
                <Typography variant="body1">{msg.text}</Typography>
              </Box>
            ))}
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              padding: 2,
              backgroundColor: '#f5f5f5',
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button
              variant="contained"
              color="warning"
              sx={{ marginLeft: 1, height: '100%' }}
              onClick={handleSendMessage}
            >
              Send
            </Button>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};
