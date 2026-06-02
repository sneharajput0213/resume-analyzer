const Groq = require("groq-sdk");

const verifyCandidate = async (req, res) => {
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
  try {
    const { name, github } = req.body;

    const aiResponse = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: "You are an expert hiring assistant who analyzes candidates.",
        },
        {
          role: "user",
          content: `Analyze this candidate:

Name: ${name}
GitHub: ${github}

Give:
- Trust score out of 100
- Strengths
- Weaknesses
- Red flags
- Final verdict`,
        },
      ],
      temperature: 0.4,
      max_tokens: 800,
    });

    const result = aiResponse.choices[0].message.content;
    res.json({ result });

  } catch (error) {
    console.log("ERROR:", error.message || error);
    res.status(500).json({ message: "Error verifying candidate" });
  }
};

module.exports = { verifyCandidate };