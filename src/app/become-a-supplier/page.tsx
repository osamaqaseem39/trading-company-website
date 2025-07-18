"use client";
import React, { useState, useRef } from "react";
import axios from "axios";

const API_URL = "https://adminserver.wingzimpex.com/api/suppliers";

export default function BecomeASupplierPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    companyName: "",
    jobTitle: "",
    addressStreet: "",
    addressCity: "",
    addressZip: "",
    addressCountry: "",
    ingredientsSupplied: "",
    foodSafetyAccreditations: "",
    website: "",
    message: "",
    newsletterSubscribed: false,
  });
  const [brochure, setBrochure] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox" && e.target instanceof HTMLInputElement) {
      setForm((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size <= 300 * 1024 * 1024 && /pdf|docx?|pptx?$/i.test(file.name)) {
      setBrochure(file);
      setUploadError("");
    } else {
      setBrochure(null);
      setUploadError("Only PDF, DOC, DOCX, PPT, PPTX files up to 300MB are allowed.");
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.size <= 300 * 1024 * 1024 && /pdf|docx?|pptx?$/i.test(file.name)) {
      setBrochure(file);
      setUploadError("");
    } else {
      setBrochure(null);
      setUploadError("Only PDF, DOC, DOCX, PPT, PPTX files up to 300MB are allowed.");
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess(false);
    try {
      const formData = new FormData();
      formData.append("firstName", form.firstName);
      formData.append("lastName", form.lastName);
      formData.append("email", form.email);
      formData.append("phone", form.phone);
      formData.append("companyName", form.companyName);
      formData.append("jobTitle", form.jobTitle);
      formData.append("address.street", form.addressStreet);
      formData.append("address.city", form.addressCity);
      formData.append("address.zip", form.addressZip);
      formData.append("address.country", form.addressCountry);
      formData.append("ingredientsSupplied", form.ingredientsSupplied);
      formData.append("foodSafetyAccreditations", form.foodSafetyAccreditations);
      formData.append("website", form.website);
      formData.append("message", form.message);
      formData.append("newsletterSubscribed", String(form.newsletterSubscribed));
      if (brochure) formData.append("brochure", brochure);
      const res = await axios.post(API_URL, formData);
      if (res.status !== 201) throw new Error("Submission failed");
      setSuccess(true);
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        companyName: "",
        jobTitle: "",
        addressStreet: "",
        addressCity: "",
        addressZip: "",
        addressCountry: "",
        ingredientsSupplied: "",
        foodSafetyAccreditations: "",
        website: "",
        message: "",
        newsletterSubscribed: false,
      });
      setBrochure(null);
    } catch (err) {
      setError("There was an error submitting your request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-[#ede7de] flex justify-center">
      <div className="flex flex-col lg:flex-row gap-8 max-w-[1400px] w-full mx-auto">
        {/* Supplier Image Card */}
        <div className="flex-1 rounded-3xl overflow-hidden flex items-center justify-center min-h-[800px] relative bg-[#ede7de]">
          <img
            src="/images/supplier.jpg"
            alt="Become a Supplier"
            className="object-cover w-full h-full absolute inset-0 z-0"
            style={{ objectPosition: 'center' }}
          />
          <div className="relative z-10 bg-[#2d2d2d]/70 rounded-3xl p-12 flex flex-col justify-center items-center w-full h-full">
            <h2 className="font-bold text-white mb-6 text-center" style={{ fontSize: '60px' }}>
              Become a Supplier
            </h2>
            <p className="text-lg text-white mb-8 max-w-lg text-center">
              Join our trusted network of suppliers. Complete the form and our team will get back to you as soon as possible.
            </p>
          </div>
        </div>
        {/* Supplier Form Card */}
        <div className="flex-1 bg-white rounded-3xl shadow-lg p-8 md:p-12 flex flex-col justify-center min-h-[800px]">
          {success && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded text-center font-semibold">Thank you! We’ll get back to you soon.</div>}
          {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-center font-semibold">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-5" encType="multipart/form-data">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium mb-1" style={{ color: '#2d2d2d' }}>First Name*</label>
                <input id="firstName" name="firstName" value={form.firstName} onChange={handleChange} required placeholder="First Name" className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2d2d2d] text-[#2d2d2d]" />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium mb-1" style={{ color: '#2d2d2d' }}>Last Name*</label>
                <input id="lastName" name="lastName" value={form.lastName} onChange={handleChange} required placeholder="Last Name" className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2d2d2d] text-[#2d2d2d]" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1" style={{ color: '#2d2d2d' }}>Email Address*</label>
                <input id="email" name="email" value={form.email} onChange={handleChange} required type="email" placeholder="Email Address" className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2d2d2d] text-[#2d2d2d]" />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1" style={{ color: '#2d2d2d' }}>Phone Number*</label>
                <input id="phone" name="phone" value={form.phone} onChange={handleChange} required placeholder="Phone Number" className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2d2d2d] text-[#2d2d2d]" />
              </div>
            </div>
            <div>
              <label htmlFor="companyName" className="block text-sm font-medium mb-1" style={{ color: '#2d2d2d' }}>Company Name*</label>
              <input id="companyName" name="companyName" value={form.companyName} onChange={handleChange} required placeholder="Company Name" className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2d2d2d] text-[#2d2d2d]" />
            </div>
            <div>
              <label htmlFor="jobTitle" className="block text-sm font-medium mb-1" style={{ color: '#2d2d2d' }}>Job Title*</label>
              <input id="jobTitle" name="jobTitle" value={form.jobTitle} onChange={handleChange} required placeholder="Job Title" className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2d2d2d] text-[#2d2d2d]" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="addressStreet" className="block text-sm font-medium mb-1" style={{ color: '#2d2d2d' }}>Street Address*</label>
                <input id="addressStreet" name="addressStreet" value={form.addressStreet} onChange={handleChange} required placeholder="Street Address" className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2d2d2d] text-[#2d2d2d]" />
              </div>
              <div>
                <label htmlFor="addressCity" className="block text-sm font-medium mb-1" style={{ color: '#2d2d2d' }}>City*</label>
                <input id="addressCity" name="addressCity" value={form.addressCity} onChange={handleChange} required placeholder="City" className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2d2d2d] text-[#2d2d2d]" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="addressZip" className="block text-sm font-medium mb-1" style={{ color: '#2d2d2d' }}>ZIP / Postal Code*</label>
                <input id="addressZip" name="addressZip" value={form.addressZip} onChange={handleChange} required placeholder="ZIP / Postal Code" className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2d2d2d] text-[#2d2d2d]" />
              </div>
              <div>
                <label htmlFor="addressCountry" className="block text-sm font-medium mb-1" style={{ color: '#2d2d2d' }}>Country*</label>
                <input id="addressCountry" name="addressCountry" value={form.addressCountry} onChange={handleChange} required placeholder="Country" className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2d2d2d] text-[#2d2d2d]" />
              </div>
            </div>
            <div>
              <label htmlFor="ingredientsSupplied" className="block text-sm font-medium mb-1" style={{ color: '#2d2d2d' }}>What ingredients do you supply?*</label>
              <textarea id="ingredientsSupplied" name="ingredientsSupplied" value={form.ingredientsSupplied} onChange={handleChange} required placeholder="What ingredients do you supply?" className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2d2d2d] text-[#2d2d2d]" rows={2} />
            </div>
            <div>
              <label htmlFor="foodSafetyAccreditations" className="block text-sm font-medium mb-1" style={{ color: '#2d2d2d' }}>Please confirm your food safety accreditation(s)*</label>
              <textarea id="foodSafetyAccreditations" name="foodSafetyAccreditations" value={form.foodSafetyAccreditations} onChange={handleChange} required placeholder="Please confirm your food safety accreditation(s)" className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2d2d2d] text-[#2d2d2d]" rows={2} />
            </div>
            <div>
              <label className="block font-medium mb-1" style={{ color: '#2d2d2d' }}>Brochure or Presentation Upload</label>
              <div
                className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer bg-gray-50 hover:bg-[#ede7de] transition mb-2 text-[#2d2d2d]"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => fileInputRef.current?.click()}
                tabIndex={0}
                role="button"
                aria-label="Upload brochure or presentation"
              >
                {brochure ? (
                  <span className="font-medium text-[#2d2d2d]">{brochure.name}</span>
                ) : (
                  <span className="text-[#2d2d2d]">Drag & drop or click to browse<br />No file chosen<br />Max. file size: 300 MB.</span>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx,.ppt,.pptx"
                className="hidden"
                onChange={handleFileChange}
              />
              {uploadError && <div className="text-red-600 text-sm mt-1">{uploadError}</div>}
            </div>
            <div>
              <label htmlFor="website" className="block text-sm font-medium mb-1" style={{ color: '#2d2d2d' }}>Website</label>
              <input id="website" name="website" value={form.website} onChange={handleChange} placeholder="Website (https://)" className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2d2d2d] text-[#2d2d2d]" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1" style={{ color: '#2d2d2d' }}>Message*</label>
              <textarea id="message" name="message" value={form.message} onChange={handleChange} required placeholder="Message" className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2d2d2d] text-[#2d2d2d]" rows={3} />
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="newsletterSubscribed" name="newsletterSubscribed" checked={form.newsletterSubscribed} onChange={handleChange} className="mr-2" />
              <label htmlFor="newsletterSubscribed" className="text-sm" style={{ color: '#2d2d2d' }}>Subscribe to our newsletter?</label>
            </div>
            <div className="text-xs mb-2" style={{ color: '#2d2d2d' }}>By sending us your information, you agree to our Privacy Policy.</div>
            <button type="submit" className="bg-[#2d2d2d] text-white px-8 py-3 rounded font-semibold hover:bg-[#405a4d] transition w-full mt-2" disabled={submitting}>{submitting ? "Submitting..." : "Submit"}</button>
          </form>
        </div>
      </div>
    </section>
  );
} 