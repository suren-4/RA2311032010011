import axios from 'axios';

const BASE = 'http://20.207.122.201/evaluation-service';

export async function fetchNotifications(params?: { limit?: number; page?: number; notification_type?: string; token?: string }) {
  const { limit = 50, page = 1, notification_type, token } = params || {};

  const headers: any = {};
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await axios.get(`${BASE}/notifications`, {
    headers,
    params: {
      limit,
      page,
      notification_type,
    },
  });

  return res.data;
}
