"use client";
import React, { useEffect, useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText, Chip, Select, MenuItem, FormControl, InputLabel, Button } from '@mui/material';
import { fetchNotifications } from '../../lib/api';

export default function NotificationsPage() {
  const [notes, setNotes] = useState<any[]>([]);
  const [filter, setFilter] = useState<string>('');
  const [token, setToken] = useState<string | undefined>(process.env.NEXT_PUBLIC_AUTH_TOKEN);

  useEffect(() => {
    load();
  }, [filter]);

  async function load() {
    try {
      const data = await fetchNotifications({ limit: 100, notification_type: filter || undefined, token });
      setNotes(data.notifications || []);
    } catch (err) {
      console.error(err);
    }
  }

  function typeChip(type: string) {
    let color: any = 'default';
    if (type === 'Placement') color = 'primary';
    if (type === 'Result') color = 'success';
    if (type === 'Event') color = 'warning';
    return <Chip label={type} color={color} size="small" />;
  }

  return (
    <Container sx={{py:4}}>
      <Typography variant="h4" gutterBottom>All Notifications</Typography>

      <FormControl sx={{mb:2, minWidth: 180}}>
        <InputLabel id="filter-label">Type</InputLabel>
        <Select labelId="filter-label" value={filter} label="Type" onChange={(e) => setFilter(e.target.value)}>
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Placement">Placement</MenuItem>
          <MenuItem value="Result">Result</MenuItem>
          <MenuItem value="Event">Event</MenuItem>
        </Select>
      </FormControl>

      <List>
        {notes.map((n) => (
          <ListItem key={n.ID} divider>
            <ListItemText primary={n.Message} secondary={n.Timestamp} />
            {typeChip(n.Type)}
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
