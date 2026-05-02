"use client";

import React, { useState, useEffect } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Container, 
  Box,
  Card,
  CardContent,
  Chip,
  Pagination,
  CircularProgress,
  TextField
} from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [viewedIds, setViewedIds] = useState<string[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [apiToken, setApiToken] = useState("");
  
  const limit = 10;

  useEffect(() => {
    const saved = localStorage.getItem('viewedNotifications');
    if (saved) {
      try {
        setViewedIds(JSON.parse(saved));
      } catch (e) {
      }
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [page]);

  const fetchNotifications = async () => {
    setLoading(true);
    setErrorMsg(null);

    if (!apiToken) {
      setErrorMsg("Please enter your API token above to fetch notifications.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get(`/api/evaluation-service/notifications?page=${page}&limit=${limit}`, {
        headers: {
          Authorization: `Bearer ${apiToken}`
        }
      });
      const data = res.data.notifications || res.data.data || res.data;
      setNotifications(Array.isArray(data) ? data : []);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        setErrorMsg("Unauthorized (401): Your API token is invalid or has expired. Please run your auth script again to get a new token.");
      } else {
        setErrorMsg("Failed to fetch notifications. Please try again later.");
      }
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  const markAsViewed = (id: string | number) => {
    const stringId = String(id);
    if (!viewedIds.includes(stringId)) {
      const updated = [...viewedIds, stringId];
      setViewedIds(updated);
      localStorage.setItem('viewedNotifications', JSON.stringify(updated));
    }
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => router.push('/')}>
            Notification Dashboard
          </Typography>
          <Button color="inherit" onClick={() => router.push('/')}>All</Button>
          <Button color="inherit" onClick={() => router.push('/priority')}>Priority</Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          All Notifications
        </Typography>

        <Box sx={{ mb: 3, p: 2, bgcolor: '#f0f7ff', borderRadius: 1, border: '1px dashed #1976d2' }}>
          <Typography variant="body2" gutterBottom color="textSecondary">
            <strong>Enter API Token:</strong> Paste your Bearer token below to fetch data.
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              size="small"
              fullWidth
              placeholder="Paste eyJhb... token here"
              value={apiToken}
              onChange={(e) => setApiToken(e.target.value)}
            />
            <Button variant="contained" onClick={() => fetchNotifications()}>Fetch Data</Button>
          </Box>
        </Box>
        
        {errorMsg && (
          <Box sx={{ mb: 3, p: 2, bgcolor: '#ffebee', color: '#c62828', borderRadius: 1, border: '1px solid #ef5350' }}>
            <Typography variant="body1">{errorMsg}</Typography>
          </Box>
        )}

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        ) : notifications.length === 0 ? (
          <Typography variant="body1">No notifications found.</Typography>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {notifications.map((notif: any, index) => {
              const id = notif.ID || notif.id || `fallback-${index}`; 
              const isViewed = viewedIds.includes(String(id));
              const chipType = notif.Type || notif.notification_type;
              const message = notif.Message || notif.message || notif.description || JSON.stringify(notif);
              const timestamp = notif.Timestamp || notif.timestamp;
              
              return (
                <Card 
                  key={id} 
                  sx={{ 
                    borderLeft: isViewed ? 'none' : '5px solid #1976d2',
                    backgroundColor: isViewed ? '#f5f5f5' : '#ffffff',
                    transition: '0.3s',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={() => markAsViewed(id)}
                  onClick={() => markAsViewed(id)}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography variant="h6">
                        {notif.title || `${chipType || 'Notification'} Alert`}
                      </Typography>
                      {chipType && (
                        <Chip label={chipType} color="primary" variant="outlined" size="small" />
                      )}
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {message}
                    </Typography>
                    {timestamp && (
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                        {new Date(timestamp).toLocaleString()}
                      </Typography>
                    )}
                    
                    {!isViewed && (
                      <Typography variant="caption" color="primary" sx={{ display: 'block', mt: 1, fontWeight: 'bold' }}>
                        NEW
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </Box>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination count={10} page={page} onChange={handlePageChange} color="primary" />
        </Box>
      </Container>
    </Box>
  );
}
