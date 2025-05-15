import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { OpenAI } from "openai";

config(); // Loads environment variables from .env

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userMessage }],
    });

    res.json({ reply: response.data.choices[0].message.content });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Something went wrong");
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
