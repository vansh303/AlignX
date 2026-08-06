"use client"
import { useState } from "react"

export default function Feedback({ onNavigate }) {
  const [formData, setFormData] = useState({
    issueType: "Bug",
    description: "",
    email: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Feedback submitted:", formData)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ issueType: "Bug", description: "", email: "" })
    }, 3000)
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Share Your Feedback</h1>
          <p className="text-xl text-white/60">Help us improve AlignX by sharing your thoughts and experiences</p>
        </div>

        <div
          className="rounded-3xl p-8"
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.5)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgb(255 255 255 / 0.1)",
          }}
        >
          {submitted ? (
            <div className="text-center py-12">
              <div
                className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                style={{ backgroundColor: "rgba(16, 185, 129, 0.1)" }}
              >
                <svg className="w-8 h-8" style={{ color: "rgb(16, 185, 129)" }} fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-2">Thank you!</h2>
              <p className="text-white/60">Your feedback has been received. We appreciate your input.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Issue Type</label>
                <select
                  name="issueType"
                  value={formData.issueType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg text-white transition-colors focus:outline-none"
                  style={{
                    backgroundColor: "rgba(30, 41, 59, 0.5)",
                    border: "1px solid rgb(255 255 255 / 0.1)",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "rgb(14, 165, 233)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgb(255 255 255 / 0.1)")}
                >
                  <option value="Bug">Bug Report</option>
                  <option value="Exercise">Exercise Feedback</option>
                  <option value="Camera">Camera Issue</option>
                  <option value="UI/UX">UI/UX Suggestion</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Please describe your feedback in detail..."
                  rows="6"
                  required
                  className="w-full px-4 py-3 rounded-lg text-white placeholder-white/40 resize-none transition-colors focus:outline-none"
                  style={{
                    backgroundColor: "rgba(30, 41, 59, 0.5)",
                    border: "1px solid rgb(255 255 255 / 0.1)",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "rgb(14, 165, 233)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgb(255 255 255 / 0.1)")}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Email (Optional)</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 rounded-lg text-white placeholder-white/40 transition-colors focus:outline-none"
                  style={{
                    backgroundColor: "rgba(30, 41, 59, 0.5)",
                    border: "1px solid rgb(255 255 255 / 0.1)",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "rgb(14, 165, 233)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgb(255 255 255 / 0.1)")}
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg font-semibold text-white transition-all hover:shadow-lg"
                style={{
                  background: "linear-gradient(to right, #0ea5e9, #06b6d4)",
                  boxShadow: "0 0 0 0 transparent",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 0 20px rgba(14, 165, 233, 0.5)")}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 0 0 0 transparent")}
              >
                Submit Feedback
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
