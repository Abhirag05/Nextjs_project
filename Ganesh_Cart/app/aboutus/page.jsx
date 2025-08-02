"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { assets } from "@/assets/assets";
import Image from "next/image";

import { useState } from "react";

function FAQ() {
  const [open, setOpen] = useState(null);
  const faqs = [
    {
      question: "Are your spare parts genuine and compatible with my vehicle/machine?",
      answer: "Yes, all our spare parts are sourced from trusted manufacturers and thoroughly checked for compatibility. If you need help verifying fitment, our team is here to assist."
    },
    {
      question: "Do you provide installation or technical support for parts?",
      answer: "Absolutely! Our experts can guide you through installation and offer technical advice to ensure you get the most from your purchase."
    },
    {
      question: "How do I find the right part for my specific model?",
      answer: "You can search by model number or contact our support with your vehicle/machine details. We'll help you identify and choose the correct part."
    },
    {
      question: "What warranty or guarantee do you offer on spare parts?",
      answer: "Most of our parts come with a manufacturer warranty. Please check the product page or contact us for specific warranty information."
    },
    {
      question: "Can you source rare or hard-to-find spare parts?",
      answer: "Yes, we specialize in sourcing even rare or discontinued parts. Let us know what you need, and we’ll do our best to find it for you."
    },
    {
      question: "How fast is shipping for urgent repairs?",
      answer: "We offer expedited shipping options for urgent needs. Most orders are processed within 24 hours to minimize your downtime."
    }
  ];
  const toggle = idx => setOpen(open === idx ? null : idx);
  return (
    <div className="space-y-4 max-w-5xl w-full mx-auto">
      {faqs.map((faq, idx) => (
        <div key={idx} className="border border-orange-200 rounded-xl overflow-hidden">
          <button
            className="w-full px-6 py-4 text-left flex justify-between items-center bg-white hover:bg-orange-50 focus:outline-none"
            onClick={() => toggle(idx)}
          >
            <span className="text-lg font-medium text-orange-700">{faq.question}</span>
            <span className="text-orange-700 text-xl">{open === idx ? "-" : "+"}</span>
          </button>
          {open === idx && (
            <div className="px-6 pb-4 pt-2 bg-orange-50">
              <p className="text-black">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default function AboutUs() {
  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen flex flex-col gap-16 pb-12">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-orange-600 to-orange-400 text-white py-20 px-6 flex flex-col items-center justify-center">
          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-extrabold mb-4 drop-shadow-lg">About Us</h1>
            <p className="text-lg md:text-xl font-medium mb-6 drop-shadow">Empowering your shopping experience with quality products, unbeatable prices, and exceptional service.</p>
            <div className="flex justify-center gap-3">
              <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-semibold">Trusted by 10,000+ customers</span>
              <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-semibold">Since 2010</span>
            </div>
          </div>
        </section>

        {/* Who We Are */}
        <section className="max-w-5xl mx-auto bg-white rounded-2xl shadow p-8 md:p-12 flex flex-col md:flex-row gap-10 items-center">
                  <Image
            src={assets.ganesh_spare_parts}
            alt="Our Team"
            width={400}
            height={300}
            className="rounded-xl w-full md:w-1/3 object-cover shadow-md"
          />
          <div>
            <h2 className="text-2xl font-bold text-orange-600 mb-3">Who We Are</h2>
            <p className="text-black mb-4">Ganesh Cart is a dedicated team of spare parts specialists, committed to providing high-quality components for a wide range of vehicles and machinery. With years of experience in the industry, we ensure that every part you find on our platform is reliable, genuine, and competitively priced. Our passion is to keep your engines running  with fast delivery and expert support every step of the way.</p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2"><span className="w-2 h-2 bg-orange-500 rounded-full inline-block" /> <span className="text-black">Mission: To make genuine and affordable spare parts accessible to everyone through technology and trust.</span></li>
              <li className="flex items-center gap-2"><span className="w-2 h-2 bg-orange-500 rounded-full inline-block" /> <span className="text-black">Vision: To become India’s most trusted and innovative online marketplace for spare parts.</span></li>
            </ul>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-orange-600 mb-8 text-center">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-xl transition">
              <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl text-orange-700">🛒</span>
              </div>
              <h3 className="font-bold text-lg text-orange-700 mb-2">Genuine & Reliable Parts</h3>
              <p className="text-black">Every part is sourced from trusted manufacturers, ensuring quality and compatibility for your vehicle or machinery.</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-xl transition">
              <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl text-orange-700">💸</span>
              </div>
              <h3 className="font-bold text-lg text-orange-700 mb-2">Expert Guidance</h3>
              <p className="text-black">Our knowledgeable team helps you find the exact part you need, with detailed product info and technical support.</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-xl transition">
              <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl text-orange-700">🤝</span>
              </div>
              <h3 className="font-bold text-lg text-orange-700 mb-2">Fast Shipping & Support</h3>
              <p className="text-black">We offer quick dispatch and dedicated after-sales support to keep your projects running smoothly.</p>
            </div>
          </div>
        </section>

       

        {/* FAQ Section */}
        <section className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-orange-700 mt-2">Frequently Asked Questions</h2>
          </div>
          <FAQ />
        </section>

        {/* Contact Us CTA */}
        <section className="max-w-2xl mx-auto text-center mt-16">
          <h2 className="text-2xl font-semibold text-orange-700 mb-2">Get in Touch</h2>
          <p className="text-black mb-4">Have questions or feedback? We’d love to hear from you!</p>
          <button
            onClick={() => window.location.href = '/Contact'}
            className="inline-block px-8 py-3 bg-orange-700 text-white text-lg font-semibold rounded-lg shadow hover:bg-orange-800 transition"
          >
            Contact Us
          </button>
        </section>
      </div>
      <Footer />
    </>
  );
}