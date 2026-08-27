const Groq = require("groq-sdk");
require("dotenv").config({ path: ".env.local" });
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
groq.models.list().then(res => console.log("Success", res.data.length)).catch(err => console.error("Error:", err.message));
