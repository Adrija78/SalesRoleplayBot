import express from 'express';
import chatController, { scoreController } from '../controllers/chatController.js';

// Initialize Express Router instance
const router = express.Router();

// @route   POST /api/chat
// @desc    Receive user sales pitch/message and return AI customer roleplay response
// @access  Public
router.post('/', chatController);

// @route   POST /api/chat/score
// @desc    Evaluate conversation history and return structured rating scorecard
// @access  Public
router.post('/score', scoreController);

// Export router instance for mounting in server.js
export default router;
