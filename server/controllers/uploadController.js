const Groq = require("groq-sdk");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const supabase = require("../config/supabase");

exports.uploadResume = async (req, res) => {
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
  const filePath = req.file ? req.file.path : null;

  try {
    // ✅ Check file
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // ✅ Read PDF
    const dataBuffer = fs.readFileSync(filePath);
    let pdfData;

    try {
      pdfData = await pdfParse(dataBuffer);
    } catch (err) {
      console.log("PDF PARSE ERROR:", err.message);
      return res.status(400).json({
        error: "Unable to read this PDF. Please upload a proper resume file.",
      });
    }

    const resumeText = pdfData.text;

    if (!resumeText || resumeText.length < 20) {
      return res.status(400).json({ error: "Invalid resume content" });
    }

    console.log("EXTRACTED TEXT:", resumeText.substring(0, 200));

    // 🔥 GROQ AI CALL
    const aiResponse = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            "You are an expert ATS resume analyzer. Always return ONLY valid JSON. No explanation, no markdown, no code blocks.",
        },
        {
          role: "user",
          content: `Analyze the following resume and return ONLY valid JSON.

Return exactly this format (no other text):
{
  "ats_score": <number 0-100>,
  "skills_detected": ["skill1", "skill2"],
  "recommended_skills": ["skill1", "skill2"],
  "improvement_suggestions": ["suggestion1", "suggestion2"],
  "job_matches": [
    { "title": "Job Title", "company": "Industry/Company Type", "match_score": <number 0-100> }
  ]
}

Resume:
${resumeText}`,
        },
      ],
      temperature: 0.3,
      max_tokens: 1500,
    });

    let raw = aiResponse.choices[0].message.content;
    console.log("RAW GROQ RESPONSE:", raw);

    // ✅ Strip any markdown code fences if present
    raw = raw.replace(/```json/gi, "").replace(/```/g, "").trim();

    const jsonMatch = raw.match(/{[\s\S]*}/);

    if (!jsonMatch) {
      return res.status(500).json({ error: "Invalid AI response format" });
    }

    const result = JSON.parse(jsonMatch[0]);
    console.log("FINAL RESULT:", result);

    // ✅ Save to Supabase
    try {
      const { error: dbErr } = await supabase
        .from('resumes')
        .insert([{
          filename: req.file.originalname,
          ats_score: result.ats_score,
          skills_detected: result.skills_detected,
          recommended_skills: result.recommended_skills,
          improvement_suggestions: result.improvement_suggestions,
          job_matches: result.job_matches
        }]);

      if (dbErr) throw dbErr;
      console.log("✅ Saved to Supabase");
    } catch (dbErr) {
      console.log("⚠️ Supabase save failed (non-critical):", dbErr.message);
    }

    res.json(result);
  } catch (err) {
    console.log("ERROR:", err.message || err);
    res
      .status(500)
      .json({ error: "AI processing failed: " + (err.message || "Unknown error") });
  } finally {
    // ✅ Always clean up the uploaded temp file
    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log("🗑️ Temp file deleted:", filePath);
    }
  }
};