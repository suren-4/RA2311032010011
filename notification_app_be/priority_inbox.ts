import axios from 'axios';

interface Notification {
  ID: string;
  Type: 'Placement' | 'Result' | 'Event';
  Message: string;
  Timestamp: string;
}

const PRIORITY_WEIGHTS: Record<string, number> = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

const getPriorityNotifications = async (token: string) => {
  try {
    const { data } = await axios.get<{ notifications: Notification[] }>(
      'http://20.207.122.201/evaluation-service/notifications',
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const notifications = data?.notifications || [];

    if (!notifications.length) {
      console.log('No priority notifications found at this time.');
      return;
    }

    const sortedNotifications = notifications.sort((a, b) => {
      const waitA = PRIORITY_WEIGHTS[a.Type] || 0;
      const waitB = PRIORITY_WEIGHTS[b.Type] || 0;

      if (waitA !== waitB) {
        return waitB - waitA;
      }

      return new Date(b.Timestamp).getTime() - new Date(a.Timestamp).getTime();
    });

    const topNotifications = sortedNotifications.slice(0, 10);
    
    console.table(topNotifications);
  } catch (error: any) {
    console.error('Failed to fetch priority inbox:', error?.response?.data || error.message);
  }
};

const authToken = process.env.AUTH_TOKEN?.replace(/^["']|["']$/g, '');

if (!authToken) {
  console.error('Missing AUTH_TOKEN. Please provide a valid token in the environment.');
  process.exit(1);
}

getPriorityNotifications(authToken);
