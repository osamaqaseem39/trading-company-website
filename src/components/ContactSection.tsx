import React from 'react';
import GetAQuoteForm from './GetAQuoteForm';

const ContactSection = () => (
  <div className="max-w-7xl mx-auto py-12 px-4">
    <div className="text-center mb-12">
      <h1 className="font-bold mb-6 text-2xl sm:text-4xl md:text-5xl" style={{ color: '#001a33' }}>Contact Us</h1>
      <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto" style={{ color: '#001a33' }}>
        Get in touch with us for professional auto AC services and genuine parts. We&apos;re here to help with all your automotive air conditioning needs.
      </p>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <GetAQuoteForm title="Get a Quote" layout="single" />
      {/* Contact Information */}
      <div className="space-y-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#001a33' }}>Get in Touch</h2>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-wingzimpex-brand/10 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-wingzimpex-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold" style={{ color: '#001a33' }}>Phone</h3>
                <a href="tel:+971505475200" style={{ color: '#001a33', display: 'block' }}>+971 50 547 5200</a>
                <a href="tel:+971545897355" style={{ color: '#001a33', display: 'block' }}>+971 54 589 7355</a>
                <p className="text-sm" style={{ color: '#001a33' }}>Available 24/7 for emergency services</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold" style={{ color: '#001a33' }}>Email</h3>
                <a href="mailto:abdul.razzaq@wingzimpex.com" style={{ color: '#001a33', display: 'block' }}>abdul.razzaq@wingzimpex.com</a>
                <a href="mailto:kashif.naseem@wingzimpex.com" style={{ color: '#001a33', display: 'block' }}>kashif.naseem@wingzimpex.com</a>
                <p className="text-sm" style={{ color: '#001a33' }}>We&apos;ll respond within 24 hours</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold" style={{ color: '#001a33' }}>Address</h3>
                <p style={{ color: '#001a33' }}>6009 Dubai, United Arab Emirates</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#001a33] rounded-xl p-8 text-white">
          <h3 className="text-xl font-bold mb-4">24/7 Support</h3>
          <p className="mb-4">Need urgent assistance? Our team is available 24/7 for critical food and beverage trading support and logistics emergencies.</p>
          <a 
            href="tel:+971505475200" 
            className="inline-block bg-white text-[#001a33] px-6 py-3 rounded-lg font-semibold hover:bg-[#001a33] hover:text-white transition-colors"
          >
            Call Us: +971 50 547 5200
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default ContactSection; 