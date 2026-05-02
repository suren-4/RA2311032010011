"use client";
import React, { useEffect, useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText, Chip, Button } from '@mui/material';
import { fetchNotifications } from '../../lib/api';

export default function PriorityPage() {
  const [top, setTop] = useState<any[]>([]);
  const [token] = useState<string | undefined>(process.env.NEXT_PUBLIC_AUTH_TOKEN);

  useEffect(() => {
    loadTop();
  }, []);

  async function loadTop() {
    try {
      const data = await fetchNotifications({ limit: 200, token });
      const notifications = data.notifications || [];

      const weights: Record<string, number> = { Placement: 3, Result: 2, Event: 1 };

      notifications.sort((a: any, b: any) => {
        const wa = weights[a.Type] || 0;
        const wb = weights[b.Type] || 0;
        if (wa !== wb) return wb - wa;
        return new Date(b.Timestamp).getTime() - new Date(a.Timestamp).getTime();
      });

      setTop(notifications.slice(0, 10));
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Container sx={{py:4}}>
      <Typography variant="h4" gutterBottom>Priority Inbox (Top 10)</Typography>
      <List>
        {top.map(n => (
          <ListItem key={n.ID} divider>
            <ListItemText primary={n.Message} secondary={`${n.Type} — ${n.Timestamp}`} />
            <Chip label={n.Type} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
