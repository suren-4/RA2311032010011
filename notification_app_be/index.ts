import express, { Request, Response } from 'express';
import { executeLog } from '../logging_middleware/index';

const app = express();
const port = 3001;

app.use(express.json());

// Example API endpoint
app.get('/api/users', async (req: Request, res: Response) => {
  try {
    await executeLog('backend', 'info', 'handler', 'Received request to fetch users.');

    // Simulated fetch call to return user details
    const users = [{ id: 1, name: 'Alice' }];
    
    await executeLog('backend', 'debug', 'handler', 'Successfully fetched users.');

    return res.json(users);
  } catch (error) {
    const errorMsg = (error as Error).message;
    await executeLog('backend', 'error', 'handler', `Error fetching users: ${errorMsg}`);
    
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, async () => {
  console.log(`Backend server listening at http://localhost:${port}`);
  await executeLog('backend', 'info', 'service', `Backend server started on port ${port}`);
});
