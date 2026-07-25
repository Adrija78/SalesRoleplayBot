import aiService from '../services/aiService.js';

/**
 * Controller to handle chat requests between salesperson and AI customer persona
 * @param {Object} req - Express request object containing req.body.message, req.body.persona and req.body.history
 * @param {Object} res - Express response object
 */
export default async function chatController(req, res) {
  try {
    // Extract user message, persona configuration, and conversation history from request body
    const { message, persona, history } = req.body;

    // Validate that message is present
    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Message is required.'
      });
    }

    // Call AI service to generate customer roleplay response (passing current config and history log)
    const aiResponse = await aiService.generateResponse(message, persona, history);

    // Return success response with generated reply
    return res.status(200).json({
      success: true,
      reply: aiResponse
    });
  } catch (error) {
    // Handle unexpected errors during processing
    console.error('Error in chatController:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal server error.'
    });
  }
}

/**
 * Controller to handle the request to end the sales pitch and generate a performance metrics scorecard
 * @param {Object} req - Express request object containing req.body.history
 * @param {Object} res - Express response object
 */
export async function scoreController(req, res) {
  try {
    const { history } = req.body;

    // Validate that conversation history is present and non-empty
    if (!history || !Array.isArray(history) || history.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'A non-empty conversation history is required for scoring.'
      });
    }

    // Generate scorecard review from AI evaluation service
    const scorecard = await aiService.generateEvaluation(history);

    // Return success response with scorecard metrics
    return res.status(200).json({
      success: true,
      scorecard
    });
  } catch (error) {
    console.error('Error in scoreController:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to generate scorecard.'
    });
  }
}
