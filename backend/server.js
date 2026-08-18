const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { PDFParse } = require("pdf-parse");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});


// ===============================
// COMMON SKILLS
// ===============================

const skills = [
  "javascript",
  "typescript",
  "react",
  "next.js",
  "node.js",
  "express",
  "mongodb",
  "mysql",
  "postgresql",
  "sql",
  "python",
  "java",
  "c++",
  "c",
  "html",
  "css",
  "tailwind",
  "git",
  "github",
  "docker",
  "aws",
  "azure",
  "firebase",
  "flask",
  "django",
  "spring",
  "rest api",
  "graphql",
  "machine learning",
  "artificial intelligence",
  "tensorflow",
  "pytorch",
  "data analysis",
  "cybersecurity",
  "linux",
  "figma",
  "ui/ux",
  "communication",
];


// ===============================
// HOME ROUTE
// ===============================

app.get("/", (req, res) => {
  res.json({
    message: "CareerFlow AI backend is running 🚀",
  });
});


// ===============================
// RESUME ANALYZER
// ===============================

app.post("/api/analyze", upload.single("resume"), async (req, res) => {
  try {
    const jobDescription = req.body.jobDescription || "";

    let resumeText = "";

    // -------------------------------
    // Extract resume text
    // -------------------------------

    if (req.file) {
      const fileName = req.file.originalname.toLowerCase();

      if (fileName.endsWith(".pdf")) {
        const parser = new PDFParse({
  data: req.file.buffer,
});

const pdfData = await parser.getText();

resumeText = pdfData.text || "";

await parser.destroy();
      } else {
        // DOC/DOCX text extraction is not implemented yet
        resumeText = "";
      }
    }


    // -------------------------------
    // Normalize text
    // -------------------------------

    const normalizedResume = resumeText.toLowerCase();

    const normalizedJob = jobDescription.toLowerCase();


    // -------------------------------
    // Find skills in resume
    // -------------------------------

    const resumeSkills = skills.filter((skill) =>
      normalizedResume.includes(skill)
    );


    // -------------------------------
    // Find skills required by job
    // -------------------------------

    const jobSkills = skills.filter((skill) =>
      normalizedJob.includes(skill)
    );


    // -------------------------------
    // Find matching skills
    // -------------------------------

    const matchingSkills = jobSkills.filter((skill) =>
      resumeSkills.includes(skill)
    );


    // -------------------------------
    // Find missing skills
    // -------------------------------

    const missingSkills = jobSkills.filter(
      (skill) => !resumeSkills.includes(skill)
    );


    // -------------------------------
    // Calculate skills score
    // -------------------------------

    let skillsMatch = 0;

    if (jobSkills.length > 0) {
      skillsMatch = Math.round(
        (matchingSkills.length / jobSkills.length) * 100
      );
    } else if (resumeSkills.length > 0) {
      skillsMatch = 70;
    } else {
      skillsMatch = 40;
    }


    // -------------------------------
    // ATS score
    // -------------------------------

    let atsScore = 50;

    if (resumeText.length > 500) {
      atsScore += 15;
    }

    if (resumeText.length > 1000) {
      atsScore += 10;
    }

    if (resumeText.match(/education/i)) {
      atsScore += 5;
    }

    if (resumeText.match(/experience/i)) {
      atsScore += 5;
    }

    if (resumeText.match(/skills/i)) {
      atsScore += 5;
    }

    if (atsScore > 100) {
      atsScore = 100;
    }


    // -------------------------------
    // Experience score
    // -------------------------------

    let experienceMatch = 60;

    if (
      normalizedResume.includes("internship") ||
      normalizedResume.includes("intern") ||
      normalizedResume.includes("experience") ||
      normalizedResume.includes("developer")
    ) {
      experienceMatch = 85;
    }

    if (
      normalizedResume.includes("senior") ||
      normalizedResume.includes("lead") ||
      normalizedResume.includes("manager")
    ) {
      experienceMatch = 95;
    }


    // -------------------------------
    // Overall score
    // -------------------------------

    const score = Math.round(
      skillsMatch * 0.5 +
      atsScore * 0.3 +
      experienceMatch * 0.2
    );


    // -------------------------------
    // Recommendation
    // -------------------------------

    let recommendation = "";

    if (score >= 85) {
      recommendation =
        "Excellent match. Your resume strongly aligns with this position.";
    } else if (score >= 70) {
      recommendation =
        "Good match. A few improvements could make your application stronger.";
    } else if (score >= 50) {
      recommendation =
        "Moderate match. Consider adding the missing skills and tailoring your resume.";
    } else {
      recommendation =
        "Your resume needs improvement for this position. Focus on the missing skills and relevant experience.";
    }


    // -------------------------------
    // Strengths
    // -------------------------------

    const strengths = [];

    if (matchingSkills.length > 0) {
      strengths.push(
        `Strong match in ${matchingSkills.length} job-related skill(s)`
      );
    }

    if (resumeText.length > 1000) {
      strengths.push("Resume contains detailed professional information");
    }

    if (normalizedResume.includes("project")) {
      strengths.push("Project experience detected");
    }

    if (normalizedResume.includes("education")) {
      strengths.push("Education section detected");
    }

    if (strengths.length === 0) {
      strengths.push("Resume uploaded successfully");
    }


    // -------------------------------
    // Final response
    // -------------------------------

    res.json({
      score,
      skillsMatch,
      atsScore,
      experienceMatch,

      strengths,

      matchingSkills,

      missingSkills,

      recommendation,

      resumeInfo: {
        fileName: req.file ? req.file.originalname : null,
        extractedCharacters: resumeText.length,
      },
    });

  } catch (error) {
    console.error("Resume analysis error:", error);

    res.status(500).json({
      message: "Failed to analyze resume",
      error: error.message,
    });
  }
});


// ===============================
// START SERVER
// ===============================

app.listen(PORT, () => {
  console.log(
    `CareerFlow AI backend running on http://localhost:${PORT}`
  );
});