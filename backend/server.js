import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(bodyParser.json());

const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:8080',
  'https://hackmates-site.onrender.com',
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST'],
  credentials: true,
}));

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ 
    status: "healthy",
    message: "Server is up and running",
    timestamp: new Date().toISOString(),
  });
});

// Mailchimp API Configuration
const mailchimpUrl = `https://${process.env.MAILCHIMP_SERVER}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_LIST_ID}/members`;

// Waitlist Endpoint
app.post("/api/waitlist", async (req, res) => {
  const { email } = req.body;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Please enter a valid email address" });
  }

  try {
    if (!process.env.MAILCHIMP_API_KEY || !process.env.MAILCHIMP_SERVER || !process.env.MAILCHIMP_LIST_ID) {
      throw new Error("Missing Mailchimp configuration");
    }

    console.log("Adding email to Mailchimp:", email);

    // Add email to Mailchimp
    const response = await axios.post(
      mailchimpUrl,
      {
        email_address: email,
        status: "subscribed",
      },
      {
        auth: {
          username: "anystring",
          password: process.env.MAILCHIMP_API_KEY,
        },
      }
    );

    console.log("Mailchimp API response:", response.data);

    res.status(200).json({ message: "You've been added to our waitlist!" });
  } catch (error) {
    console.error("Error:", error.response?.data || error.message || error);
    
    if (error.response?.status === 429) {
      console.error("Rate limit exceeded. Please try again later.");
      res.status(429).json({ error: "Rate limit exceeded. Please try again later." });
    } else if (error.message === "Missing Mailchimp configuration") {
      res.status(500).json({ error: "Server configuration error. Please contact support." });
    } else if (error.response?.status === 400 && error.response?.data?.title === "Member Exists") {
      res.status(400).json({ error: "This email is already on the waitlist!" });
    } else {
      res.status(500).json({ error: "Something went wrong. Please try again." });
    }
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something broke on our end. Please try again later." });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Accepting requests from: ${process.env.FRONTEND_URL || 'http://localhost:8080'}`);
});