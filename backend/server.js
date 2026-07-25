import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import chatRouter from './routes/chat.js';

// Initialize Express application
const app = express();

// Middleware configuration
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Sales Roleplay Voice Bot Backend Running',
    provider: process.env.LLM_BASE_URL ? 'Custom OpenAI-compatible provider' : 'Groq'
  });
});

// API Routes
app.use('/api/chat', chatRouter);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
