"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError("All fields are required.");
      return;
    }
    // Here you could send the form to a backend or email service
    setSubmitted(true);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-16">
        <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-orange-600 mb-6 text-center">Contact Us</h1>
        {submitted ? (
          <div className="text-center text-orange-700 text-xl font-semibold py-10">
            Thank you for reaching out! We will get back to you soon.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                name="name"
                id="name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
                placeholder="Your Name"
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                id="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <textarea
                name="message"
                id="message"
                value={form.message}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
                rows={5}
                placeholder="Type your message here..."
              />
            </div>
            {error && <div className="text-red-600 text-sm">{error}</div>}
            <button
              type="submit"
              className="w-full py-3 bg-orange-700 text-white font-semibold rounded-lg shadow hover:bg-orange-800 transition"
            >
              Send Message
            </button>
          </form>
        )}
        </div>
      </div>
      <Footer />
    </>
  );
}
