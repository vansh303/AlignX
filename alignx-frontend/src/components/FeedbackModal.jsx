"use client"

import { X } from "lucide-react"
import { useState } from "react"

export default function FeedbackModal({ isOpen, onClose }) {
  const [issueType, setIssueType] = useState("bug")
  const [description, setDescription] = useState("")
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    console.log({ issueType, description, email: email || "not provided" })
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setDescription("")
      setEmail("")
      setIssueType("bug")
      onClose()
    }, 2000)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-end md:justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose}></div>
      <div
        className="relative w-full md:w-96 rounded-t-2xl md:rounded-2xl p-6 max-h-96 overflow-y-auto"
        style={{
          backgroundColor: "rgba(15, 23, 42, 0.95)",
          backdropFilter: "blur(10px)",
          borderTopWidth: "1px",
          borderColor: "rgb(255 255 255 / 0.1)",
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Send Feedback</h2>
          <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-lg">
            <X size={20} />
          </button>
        </div>

        {submitted ? (
          <div className="text-center py-8">
            <div
              className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center"
              style={{ backgroundColor: "rgba(16, 185, 129, 0.2)" }}
            >
              <span style={{ color: "rgb(16, 185, 129)" }}>✓</span>
            </div>
            <p className="text-white font-medium">Thank you for your feedback!</p>
            <p className="text-white/60 text-sm mt-2">We appreciate your input.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-white/80 text-sm mb-2">Issue Type</label>
              <select
                value={issueType}
                onChange={(e) => setIssueType(e.target.value)}
                className="w-full px-3 py-2 rounded-lg text-white"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  borderColor: "rgb(255 255 255 / 0.1)",
                  borderWidth: "1px",
                }}
              >
                <option value="bug">Bug Report</option>
                <option value="feature">Feature Request</option>
                <option value="ux">UX Feedback</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-white/80 text-sm mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tell us what's on your mind..."
                className="w-full px-3 py-2 rounded-lg text-white placeholder-white/40 resize-none h-24"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  borderColor: "rgb(255 255 255 / 0.1)",
                  borderWidth: "1px",
                }}
              />
            </div>

            <div>
              <label className="block text-white/80 text-sm mb-2">Email (optional)</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-3 py-2 rounded-lg text-white placeholder-white/40"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  borderColor: "rgb(255 255 255 / 0.1)",
                  borderWidth: "1px",
                }}
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={!description.trim()}
              className="w-full py-2 rounded-lg font-medium text-white transition-all disabled:opacity-50"
              style={{
                background: "linear-gradient(to right, #0ea5e9, #06b6d4)",
                opacity: !description.trim() ? 0.5 : 1,
              }}
            >
              Send Feedback
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
