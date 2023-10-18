const express = require('express');
const axios = require('axios');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

app.get('/api/data', async (req, res) => {
  // Retrieve the JWT token from the cookie
  const jwtToken = req.cookies.jwt_token;

  // Attach the token to the API request
  try {
    const response = await axios.get('your-api-endpoint', {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    const data = response.data;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  }
});

// const port = process.env.PORT || 5000;
const port = 8080
app.listen(port, () => {
  console.log(`Proxy server is running on port ${port}`);
});
