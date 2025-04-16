const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const webhookRoute = require('./routes/webhook');
const reminderJob = require('./jobs/reminders');

const app = express();
app.use(bodyParser.json());

app.use('/webhook', webhookRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Finance bot listening on port ${PORT}`);
  reminderJob.start();
});