const express = require('express');
const router = express.Router();
const messageHandler = require('../services/messageHandler');

router.post('/', async (req, res) => {
  const message = req.body.message;
  const from = req.body.from;

  try {
    await messageHandler.handleMessage(message, from);
    res.sendStatus(200);
  } catch (error) {
    console.error('Error handling message:', error);
    res.sendStatus(500);
  }
});

module.exports = router;
