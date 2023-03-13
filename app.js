var createError = require('http-errors');
require("dotenv").config();

const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
const app = express();
app.use(express.json());


const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;
  const rules = `
  
 
  
   
  `

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt:  message,
      temperature: 0.1,
      max_tokens: 500,
      frequency_penalty: 0.5,
      presence_penalty: 1,
      top_p: 1,
      stop: [" Human:", " AI:"],
    });

    
    const answer = response.data.choices[0].text
    console.log(answer)

    res.status(200).json({ answer });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});
module.exports = app;

