import axios from 'axios';

const BASE_URL = 'http://20.207.122.201/evaluation-service';

const studentData = {
  email: 'sk8406@srmist.edu.in',
  name: 'Suren kumar',
  mobileNo: '9360620354',
  githubUsername: 'suren-4',
  rollNo: 'RA2311032010011',
  accessCode: 'QkbpxH',
};

const initAuthFlow = async () => {
  let clientId = process.env.CLIENT_ID;
  let clientSecret = process.env.CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    try {
      const { data } = await axios.post(`${BASE_URL}/register`, studentData);
      clientId = data.clientID;
      clientSecret = data.clientSecret;
      
      console.log('Registration successful! Please save these credentials safely:');
      console.log(`Client ID: ${clientId}`);
      console.log(`Client Secret: ${clientSecret}\n`);
    } catch (err: any) {
      console.log('Note: Registration might have already been completed.');
      if (err?.response?.data) {
        console.error(err.response.data);
      }
      return;
    }
  }

  if (clientId && clientSecret) {
    try {
      const { data } = await axios.post(`${BASE_URL}/auth`, {
        ...studentData,
        clientID: clientId,
        clientSecret: clientSecret,
      });

      console.log('Authentication successful! Here is your token:');
      console.log(data.access_token);
    } catch (authError: any) {
      console.error('Failed to authenticate:', authError?.response?.data || authError.message);
    }
  }
};

initAuthFlow();
