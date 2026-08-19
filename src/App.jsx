import { useState } from 'react'
import './App.css'

function App() {
  const [resume, setResume] = useState(null)
  const [jobDescription, setJobDescription] = useState('')
  const [analyzed, setAnalyzed] = useState(null)
  const [loading, setLoading] = useState(false)

  // Easter egg states
  const [logoClicks, setLogoClicks] = useState(0)
  const [showEasterEgg, setShowEasterEgg] = useState(false)

  // ===============================
  // EASTER EGG
  // ===============================

  const handleLogoClick = () => {
    const newCount = logoClicks + 1

    setLogoClicks(newCount)

    if (newCount >= 5) {
      setShowEasterEgg(true)
      setLogoClicks(0)

      setTimeout(() => {
        setShowEasterEgg(false)
      }, 5000)
    }
  }

  // ===============================
  // RESUME ANALYSIS
  // ===============================

  const handleAnalyze = async () => {
    if (!resume && !jobDescription.trim()) {
      alert('Please upload your resume or enter a job description.')
      return
    }

    setLoading(true)
    setAnalyzed(null)

    try {
      const formData = new FormData()

      if (resume) {
        formData.append('resume', resume)
      }

      formData.append('jobDescription', jobDescription)

      console.log(
        'Sending resume to CareerFlow AI backend...'
      )
      
        const response = await fetch(
  'https://careerflow-ai11.onrender.com/api/analyze',
        {
          method: 'POST',
          body: formData,
        }
      )

      console.log(
        'Backend response status:',
        response.status
      )

      const responseText = await response.text()

      console.log(
        'Backend response:',
        responseText
      )

      if (!response.ok) {
        throw new Error(
          `Backend returned ${response.status}: ${responseText}`
        )
      }

      let data

      try {
        data = JSON.parse(responseText)
      } catch {
        throw new Error(
          'Backend did not return valid JSON.'
        )
      }

      console.log(
        'CareerFlow AI Analysis:',
        data
      )

      setAnalyzed(data)

    } catch (error) {
      console.error(
        'CareerFlow AI connection error:',
        error
      )

      alert(
        `CareerFlow AI could not analyze your resume.\n\n${error.message}`
      )

    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">

      {/* =====================================
          NAVBAR
      ===================================== */}

      <nav className="navbar">

        <button
          className="logo logo-clickable"
          onClick={handleLogoClick}
          aria-label="CareerFlow AI"
          type="button"
        >

          <span className="logo-icon">
            ✦
          </span>

          Career<span>Flow</span>

          <small>
            AI
          </small>

        </button>


        <div className="nav-links">

          <a href="#dashboard">
            Dashboard
          </a>

          <a href="#resume">
            Resume
          </a>

          <a href="#features">
            Features
          </a>

          <a href="#about">
            About
          </a>

        </div>


        <button
          className="profile-btn"
          type="button"
        >
          My Profile
        </button>

      </nav>


      {/* =====================================
          EASTER EGG
      ===================================== */}

      {showEasterEgg && (

        <div className="easter-egg">

          <div className="easter-egg-content">

            <div className="easter-egg-sparkle">
              ✦
            </div>

            <h2>
              You found the secret! 🎉
            </h2>

            <p>
              CareerFlow AI believes your next
              opportunity is closer than you think.
            </p>

            <span>
              Keep flowing. Keep growing. 🚀
            </span>

            <button
              type="button"
              onClick={() => setShowEasterEgg(false)}
            >
              Continue →
            </button>

          </div>

        </div>

      )}


      {/* =====================================
          MAIN
      ===================================== */}

      <main>

        {/* =====================================
            HERO
        ===================================== */}

        <section
          className="hero-section"
          id="dashboard"
        >

          <div className="hero-content">

            <div className="badge">
              ✦ AI-POWERED CAREER ASSISTANT
            </div>

            <h1>
              Your career.
              <br />
              <span>
                Powered by AI.
              </span>
            </h1>

            <p>
              Build better resumes, discover the
              right jobs, and prepare smarter for
              interviews — all in one place.
            </p>

            <div className="hero-buttons">

              <a
                href="#resume"
                className="primary-btn"
              >
                Get Started →
              </a>

              <a
                href="#features"
                className="secondary-btn"
              >
                Explore Features
              </a>

            </div>

          </div>


          {/* HERO ANALYSIS CARD */}

          <div className="hero-card">

            <div className="card-header">

              <div>

                <span className="status-dot"></span>

                AI Resume Analysis

              </div>

              <span className="score">
                92%
              </span>

            </div>


            <div className="score-circle">

              <strong>
                92
              </strong>

              <span>
                /100
              </span>

            </div>


            <div className="analysis-item">

              <span>
                ✓
              </span>

              Strong technical skills

            </div>


            <div className="analysis-item">

              <span>
                ✓
              </span>

              Excellent project experience

            </div>


            <div className="analysis-item warning">

              <span>
                !
              </span>

              Improve professional summary

            </div>

          </div>

        </section>


        {/* =====================================
            STATS
        ===================================== */}

        <section className="stats">

          <div>
            <strong>
              10K+
            </strong>

            <span>
              Resumes Analyzed
            </span>
          </div>


          <div>
            <strong>
              8.7K+
            </strong>

            <span>
              Successful Applications
            </span>
          </div>


          <div>
            <strong>
              95%
            </strong>

            <span>
              User Satisfaction
            </span>
          </div>


          <div>
            <strong>
              24/7
            </strong>

            <span>
              AI Career Support
            </span>
          </div>

        </section>


        {/* =====================================
            RESUME ANALYZER
        ===================================== */}

        <section
          className="analyzer-section"
          id="resume"
        >

          <div className="section-heading">

            <span className="section-label">
              SMART ANALYSIS
            </span>

            <h2>
              Analyze your career potential
            </h2>

            <p>
              Upload your resume and add a job
              description to discover how well
              you match the role.
            </p>

          </div>


          <div className="analyzer-grid">

            {/* RESUME */}

            <div className="input-card">

              <div className="input-title">

                <div className="icon-box">
                  📄
                </div>

                <div>

                  <h3>
                    Your Resume
                  </h3>

                  <p>
                    Upload your latest resume
                  </p>

                </div>

              </div>


              <label className="upload-area">

                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => {

                    const selectedFile =
                      e.target.files?.[0]

                    if (selectedFile) {

                      setResume(selectedFile)

                      setAnalyzed(null)

                    }

                  }}
                />


                <div className="upload-icon">
                  ↑
                </div>


                {resume ? (

                  <>
                    <strong>
                      {resume.name}
                    </strong>

                    <span>
                      File selected successfully
                    </span>
                  </>

                ) : (

                  <>
                    <strong>
                      Drop your resume here
                    </strong>

                    <span>
                      or click to browse •
                      PDF, DOC, DOCX
                    </span>
                  </>

                )}

              </label>

            </div>


            {/* JOB DESCRIPTION */}

            <div className="input-card">

              <div className="input-title">

                <div className="icon-box">
                  💼
                </div>

                <div>

                  <h3>
                    Job Description
                  </h3>

                  <p>
                    Paste the role you're applying for
                  </p>

                </div>

              </div>


              <textarea
                placeholder="Paste the job description here..."
                value={jobDescription}
                onChange={(e) => {

                  setJobDescription(
                    e.target.value
                  )

                  setAnalyzed(null)

                }}
              />

            </div>

          </div>


          {/* ANALYZE */}

          <button
            className="analyze-btn"
            onClick={handleAnalyze}
            disabled={loading}
            type="button"
          >

            {loading ? (

              <>
                ⏳ Analyzing Resume...
              </>

            ) : (

              <>
                ✦ Analyze My Resume
              </>

            )}

          </button>


          {/* =====================================
              RESULTS
          ===================================== */}

          {analyzed && (

            <div className="result-card">

              <div className="result-content">

                <span className="result-label">
                  AI MATCH SCORE
                </span>


                <h2>
                  {analyzed.score ?? 0}% Match
                </h2>


                <p>
                  {analyzed.recommendation ||
                    'Your resume has been analyzed.'}
                </p>


                <div className="analysis-results">

                  <div>

                    <strong>
                      {analyzed.skillsMatch ?? 0}%
                    </strong>

                    <span>
                      Skills Match
                    </span>

                  </div>


                  <div>

                    <strong>
                      {analyzed.atsScore ?? 0}%
                    </strong>

                    <span>
                      ATS Score
                    </span>

                  </div>


                  <div>

                    <strong>
                      {analyzed.experienceMatch ?? 0}%
                    </strong>

                    <span>
                      Experience
                    </span>

                  </div>

                </div>


                {/* MATCHING SKILLS */}

                {analyzed.matchingSkills &&
                  analyzed.matchingSkills.length > 0 && (

                    <div className="result-section">

                      <h3>
                        ✓ Matching Skills
                      </h3>

                      <ul>

                        {analyzed.matchingSkills.map(
                          (skill, index) => (

                            <li key={index}>
                              ✓ {skill}
                            </li>

                          )
                        )}

                      </ul>

                    </div>

                  )}


                {/* STRENGTHS */}

                <div className="result-section">

                  <h3>
                    ✓ Strengths
                  </h3>

                  <ul>

                    {analyzed.strengths &&
                    analyzed.strengths.length > 0 ? (

                      analyzed.strengths.map(
                        (strength, index) => (

                          <li key={index}>
                            {strength}
                          </li>

                        )
                      )

                    ) : (

                      <li>
                        Resume uploaded successfully.
                      </li>

                    )}

                  </ul>

                </div>


                {/* MISSING SKILLS */}

                <div className="result-section">

                  <h3>
                    ⚠ Skills to Improve
                  </h3>

                  <ul>

                    {analyzed.missingSkills &&
                    analyzed.missingSkills.length > 0 ? (

                      analyzed.missingSkills.map(
                        (skill, index) => (

                          <li key={index}>
                            ⚠ {skill}
                          </li>

                        )
                      )

                    ) : (

                      <li>
                        No major missing skills detected.
                      </li>

                    )}

                  </ul>

                </div>


                {/* RESUME INFO */}

                {analyzed.resumeInfo && (

                  <div className="result-section">

                    <h3>
                      📄 Resume Information
                    </h3>

                    <ul>

                      <li>
                        File: {
                          analyzed.resumeInfo.fileName ||
                          'Not provided'
                        }
                      </li>

                      <li>
                        Extracted text: {
                          analyzed.resumeInfo
                            .extractedCharacters ?? 0
                        } characters
                      </li>

                    </ul>

                  </div>

                )}

              </div>


              <div className="result-score">
                {analyzed.score ?? 0}%
              </div>

            </div>

          )}

        </section>


        {/* =====================================
            FEATURES
        ===================================== */}

        <section
          className="features-section"
          id="features"
        >

          <div className="section-heading">

            <span className="section-label">
              EVERYTHING YOU NEED
            </span>

            <h2>
              Your personal AI career companion
            </h2>

          </div>


          <div className="feature-grid">

            <div className="feature-card">

              <div className="feature-icon">
                📄
              </div>

              <h3>
                AI Resume Builder
              </h3>

              <p>
                Create ATS-friendly resumes
                tailored to the jobs you want.
              </p>

            </div>


            <div className="feature-card">

              <div className="feature-icon">
                🎯
              </div>

              <h3>
                Job Matching
              </h3>

              <p>
                Find opportunities that match
                your skills, experience and
                career goals.
              </p>

            </div>


            <div className="feature-card">

              <div className="feature-icon">
                🤖
              </div>

              <h3>
                AI Interview Prep
              </h3>

              <p>
                Practice technical and HR
                interviews with an intelligent
                AI interviewer.
              </p>

            </div>


            <div className="feature-card">

              <div className="feature-icon">
                📊
              </div>

              <h3>
                Career Insights
              </h3>

              <p>
                Understand your strengths and
                identify the skills you need
                to improve.
              </p>

            </div>

          </div>

        </section>


        {/* =====================================
            CTA
        ===================================== */}

        <section
          className="cta-section"
          id="about"
        >

          <div>

            <span className="section-label">
              START YOUR JOURNEY
            </span>

            <h2>
              Ready to level up your career?
            </h2>

            <p>
              Let CareerFlow AI help you move
              from applying to getting hired.
            </p>

          </div>


          <a
            href="#resume"
            className="primary-btn"
          >
            Start for Free →
          </a>

        </section>

      </main>


      {/* =====================================
          FOOTER
      ===================================== */}

      <footer>

        <button
          className="logo logo-clickable"
          onClick={handleLogoClick}
          type="button"
        >

          <span className="logo-icon">
            ✦
          </span>

          Career<span>Flow</span>

          <small>
            AI
          </small>

        </button>


        <p>
          © 2026 CareerFlow AI.
          Built to help you get hired.
        </p>

      </footer>

    </div>
  )
}

export default App