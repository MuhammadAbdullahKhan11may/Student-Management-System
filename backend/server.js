// ============================================================
// Eduvanta Backend — Basic Server Setup
// ============================================================

// 1. Import the packages we installed
const express = require('express'); // the web framework that handles requests/routes
const cors = require('cors');       // allows our frontend (running on a different port) to talk to this backend

// 2. Create the app — this represents our whole server
const app = express();

// 3. Middleware — code that runs on every request before it reaches our routes
app.use(cors());          // enables Cross-Origin requests (needed since frontend & backend run on different ports)
app.use(express.json());  // lets us read JSON data sent in a request body (req.body)

// 4. A simple test route
// When someone visits http://localhost:5000/ in a browser, this runs
app.get('/', (req, res) => {
  res.send('Backend is running');
});

// 5. Start the server and make it listen for requests
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
