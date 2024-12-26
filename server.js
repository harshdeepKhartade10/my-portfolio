const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require("dotenv")

const app = express();
dotenv.config();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

// Define Schema and Model
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  description: String,
  contact: String
});

const Contact = mongoose.model('Contact', contactSchema);

// API Route for Submitting Contact Form
app.post('/submit-contact', async (req, res) => {
  try {
    const { name, email, description, contact } = req.body;
    const newContact = new Contact({ name, email, description, contact });
    await newContact.save();
    res.status(200).json({ message: 'Your question has been submitted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit question', error });
  }
});

// Start Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
