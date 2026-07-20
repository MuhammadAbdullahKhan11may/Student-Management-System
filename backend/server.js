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

// ============================================================
// POST /signup route
// This runs whenever the frontend sends a POST request to /signup
// ============================================================
app.post('/signup', (req, res) => {
  // req.body contains the JSON data sent from the frontend
  // (this works because we added app.use(express.json()) earlier)
  const { fullName, email, password, role } = req.body;

  // Log the received data in the backend terminal — just to confirm it arrived
console.log('Name:', fullName);
console.log('Email:', email);
console.log('Password:', password);
console.log('Role:', role);

  // Send a JSON response back to the frontend
  res.json({ message: 'Signup API working' });
});

// 5. Start the server and make it listen for requests
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
