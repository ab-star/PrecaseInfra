"use client"
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaFacebookF, FaTwitter, FaLinkedinIn, FaTimes, FaCookie, FaShieldAlt } from "react-icons/fa";

const branches = [
  {
    city: "Mumbai",
    address: "2nd Floor, ABC Tower, Bandra East, Mumbai, MH 400051",
  },
  {
    city: "Delhi",
    address: "Suite 12, Connaught Place, New Delhi, DL 110001",
  },
  {
    city: "Bangalore",
    address: "#45, MG Road, Bengaluru, KA 560001",
  },
  {
    city: "Chennai",
    address: "Plot 8, Anna Salai, Chennai, TN 600002",
  },
];

const Footer = () => {
  const [showCookieConsent, setShowCookieConsent] = useState(false);
  const [openPolicy, setOpenPolicy] = useState<null | 'privacy' | 'terms' | 'cookie'>(null);

  useEffect(() => {
    // Check if user has already accepted cookies
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      setTimeout(() => setShowCookieConsent(true), 2000);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowCookieConsent(false);
  };

  const rejectCookies = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    setShowCookieConsent(false);
  };

  const closePolicy = () => setOpenPolicy(null);

  const getPolicyContent = (type: 'privacy' | 'terms' | 'cookie') => {
    if (type === 'privacy') {
      return {
        title: 'Privacy Policy',
        body: (
          <div className="space-y-4">
            <p>
              This Privacy Policy explains how 3ginfratech (&quot;we&quot;, &quot;us&quot;) collects, uses, and protects your information.
              We collect basic usage data to improve our services. We do not sell your personal information.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li>Information you provide (e.g., contact details)</li>
              <li>Automatic data (e.g., device, pages visited, approximate location)</li>
              <li>Used for: service improvement, security, and analytics</li>
            </ul>
            <p>
              You can contact us to access, update, or delete your information. We retain data only as long as needed.
            </p>
            <p className="text-white/60 text-sm">Effective date: {new Date().toLocaleDateString()}</p>
          </div>
        ),
      };
    }
    if (type === 'terms') {
      return {
        title: 'Terms of Service',
        body: (
          <div className="space-y-4">
            <p>
              By accessing or using our website, you agree to these Terms. If you do not agree, please do not use the site.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li>Use the site lawfully and respectfully</li>
              <li>Content is provided “as is” without warranties</li>
              <li>We may update or discontinue features without notice</li>
              <li>Limitation of liability to the maximum extent permitted by law</li>
            </ul>
            <p>
              These Terms are governed by applicable local laws. Changes will be posted here with an updated effective date.
            </p>
            <p className="text-white/60 text-sm">Effective date: {new Date().toLocaleDateString()}</p>
          </div>
        ),
      };
    }
    return {
      title: 'Cookie Policy',
      body: (
        <div className="space-y-4">
          <p>
            We use cookies and similar technologies to operate the site, measure performance, and personalize content.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-white/80">
            <li>Strictly necessary cookies for core functionality</li>
            <li>Analytics cookies to understand site usage</li>
            <li>Preference cookies to remember your choices</li>
          </ul>
          <p>
            You can control cookies via your browser settings. Disabling some cookies may affect site functionality.
          </p>
          <p className="text-white/60 text-sm">Effective date: {new Date().toLocaleDateString()}</p>
        </div>
      ),
    };
  };

  return (
    <>
      <footer
        className="relative z-[90] w-[100dvw] ml-[calc(50%-50dvw)] mr-[calc(50%-50dvw)] overflow-hidden text-white flex flex-col md:flex-row gap-16 md:gap-0 justify-between items-start shadow-2xl border-t-0 px-6 sm:px-8 md:px-10 lg:px-16 py-16"
        style={{
          background:
            "url('/product/Drain/background/uShapedDrainBg.jpg') center/cover no-repeat, linear-gradient(135deg, #1e293b 60%, #181e29 100%)",
          minHeight: "520px",
          fontSize: "1.25rem",
          fontFamily: "Segoe UI, Arial, Helvetica Neue, Helvetica, sans-serif",
          letterSpacing: "0.02em",
          fontWeight: 500,
          padding: "2rem",
          paddingRight: "3rem",	
        }}
      >
        {/* Geometric/abstract background shapes */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute left-1/4 top-10 w-72 h-72 bg-gradient-to-tr from-blue-900/30 to-indigo-700/10 rounded-full blur-3xl custom-pulse-slow" />
          <div className="absolute right-0 bottom-0 w-60 h-60 bg-gradient-to-br from-amber-600/20 to-pink-500/10 rounded-full blur-2xl custom-float" />
        </div>
        
        {/* Left: Branding & Contact */}
        <div className="relative z-10 flex-1 flex flex-col gap-8 items-start">
          <div className="flex items-center gap-4 mb-4">
            <span
              className="text-4xl font-extrabold tracking-wider drop-shadow-lg custom-pulse-slow"
              style={{
                textShadow: "0 0 32px #fff6,0 2px 8px #38bdf8",
              }}
            >
              <Image
                src="/brandIcon.jpeg"
                alt="Logo"
                width={56}
                height={56}
                className="w-14 h-14 inline-block mr-2 drop-shadow-lg rounded-full"
                style={{ filter: "drop-shadow(0 0 16px #fff8)" }}
              />
            </span>
          </div>
          <div
            className="text-xl font-semibold text-white/90 leading-relaxed mb-2"
            style={{ fontFamily: "inherit" }}
          >
            Head Office:
            <br />
            101, Silvertech House, Main Street, Andheri West,
            <br />
            Mumbai, Maharashtra 400053, India
          </div>
          <div
            className="flex flex-col gap-8 text-lg text-white/90 w-full"
            style={{ fontFamily: "inherit" }}
          >
            <div
              className="w-full max-w-3xl mx-auto p-16 rounded-[2.5rem] shadow-2xl border-2 border-white/20 bg-[url('/product/Drain/background/uShapedDrainBg.jpg')] bg-cover bg-center bg-no-repeat flex flex-col items-center"
              style={{
                backgroundColor: "rgba(20,24,36,0.98)",
                boxShadow: "0 16px 64px 0 #000c",
              }}
            >
              <div className="flex items-center gap-6 sm:gap-8 md:gap-12 mb-12">
                <FaPhoneAlt className="text-6xl text-amber-300 drop-shadow-2xl" />
                <span
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-widest select-all break-words break-all md:break-normal"
                  style={{
                    color: "#fff",
                    background: "#181e29",
                    borderRadius: "0.5rem",
                    padding: "0.25em 0.7em",
                    boxShadow: "0 2px 16px 0 #000a",
                    letterSpacing: "0.08em",
                  }}
                >
                  +91 22 1234 5678
                </span>
              </div>
              <div className="flex items-center gap-6 sm:gap-8 md:gap-12">
                <FaEnvelope className="text-6xl text-blue-300 drop-shadow-2xl" />
                <span
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-widest select-all break-words break-all md:break-normal"
                  style={{
                    color: "#fff",
                    background: "#181e29",
                    borderRadius: "0.5rem",
                    padding: "0.25em 0.7em",
                    boxShadow: "0 2px 16px 0 #000a",
                    letterSpacing: "0.08em",
                  }}
                >
                  info@flajisil.com
                </span>
              </div>
            </div>
            <div className="flex gap-6 mt-8 justify-center w-full">
              <a
                href="#"
                className="group hover:text-blue-400 transition-all"
              >
                <FaFacebookF className="text-3xl group-hover:scale-125 custom-pulse-slow" />
              </a>
              <a
                href="#"
                className="group hover:text-blue-300 transition-all"
              >
                <FaTwitter className="text-3xl group-hover:scale-125 custom-pulse-slow" />
              </a>
              <a
                href="#"
                className="group hover:text-blue-500 transition-all"
              >
                <FaLinkedinIn className="text-3xl group-hover:scale-125 custom-pulse-slow" />
              </a>
            </div>
          </div>
        </div>
        
        {/* Right: Branches */}
        <div className="relative z-10 flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8 w-full max-w-2xl">
          <div className="col-span-full mb-4">
            <h4
              className="text-3xl font-extrabold text-white mb-4 tracking-wide"
              style={{ fontFamily: "inherit" }}
            >
              Branch Offices
            </h4>
          </div>
          {branches.map((branch) => (
            <div key={branch.city} className="flex items-start gap-4 group">
              <span className="mt-1 text-2xl text-amber-400 group-hover:scale-110 group-hover:text-blue-400 transition-all custom-float">
                <FaMapMarkerAlt />
              </span>
              <div>
                <div
                  className="font-bold text-xl text-white mb-1"
                  style={{ fontFamily: "inherit" }}
                >
                  {branch.city}
                </div>
                <div
                  className="text-white/90 text-lg leading-snug"
                  style={{ fontFamily: "inherit" }}
                >
                  {branch.address}
                </div>
              </div>
            </div>
          ))}
          
          {/* Policy Links Section */}
          <div className="col-span-full mt-8 pt-8 border-t border-white/20">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2 text-blue-300">
                <FaShieldAlt className="text-xl" />
                <span className="font-medium">Privacy & Security</span>
              </div>
              
              <div className="flex flex-wrap justify-center gap-6 text-white/80">
                <button type="button" onClick={() => setOpenPolicy('privacy')} className="hover:text-amber-300 transition-colors text-sm sm:text-base underline-offset-2 hover:underline">
                  Privacy Policy
                </button>
                <button type="button" onClick={() => setOpenPolicy('terms')} className="hover:text-amber-300 transition-colors text-sm sm:text-base underline-offset-2 hover:underline">
                  Terms of Service
                </button>
                <button type="button" onClick={() => setOpenPolicy('cookie')} className="hover:text-amber-300 transition-colors text-sm sm:text-base underline-offset-2 hover:underline">
                  Cookie Policy
                </button>
                {/* <a href="/refund-policy" className="hover:text-amber-300 transition-colors text-sm sm:text-base">
                  Refund Policy
                </a> */}
              </div>
              
              <div className="text-white/60 text-sm">
                © {new Date().getFullYear()} 3ginfratech. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Policy Modal */}
      {openPolicy && (
        <div
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="policy-modal-title"
          onClick={closePolicy}
        >
          <div
            className="relative bg-[#0f172a] text-white w-full max-w-3xl max-h-[80vh] overflow-y-auto rounded-2xl shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closePolicy}
              className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
              aria-label="Close policy modal"
            >
              <FaTimes />
            </button>
            <div className="px-6 py-5 border-b border-white/10">
              <h2 id="policy-modal-title" className="text-2xl font-bold">
                {getPolicyContent(openPolicy).title}
              </h2>
            </div>
            <div className="p-6 text-base leading-relaxed">
              {getPolicyContent(openPolicy).body}
            </div>
          </div>
        </div>
      )}

      {/* Cookie Consent Banner */}
      {showCookieConsent && (
        <div className="fixed bottom-6 left-6 right-6 md:left-10 md:right-10 z-50 bg-gray-900/95 backdrop-blur-md border border-blue-700/30 rounded-xl shadow-2xl p-5 custom-fade-in">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex items-start gap-3 flex-1">
              <div className="bg-blue-900/50 p-2 rounded-full mt-1">
                <FaCookie className="text-2xl text-blue-300" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold mb-1">We Use Cookies</h3>
                <p className="text-gray-300 text-sm">
                  We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
                  By clicking &quot;Accept All&quot;, you consent to our use of cookies.{" "}
                  <button type="button" onClick={() => setOpenPolicy('cookie')} className="text-blue-300 hover:text-blue-200 underline">
                    Learn more
                  </button>
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <button 
                onClick={rejectCookies}
                className="px-4 py-2 text-sm rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-800 transition-colors"
              >
                Reject All
              </button>
              <button 
                onClick={acceptCookies}
                className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-colors flex items-center justify-center gap-2"
              >
                <FaCookie className="text-sm" />
                Accept All
              </button>
            </div>
            
            <button 
              onClick={rejectCookies}
              className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors"
              aria-label="Close cookie consent"
            >
              <FaTimes />
            </button>
          </div>
        </div>
      )}

      {/* Global styles for animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        .custom-float {
          animation: float 2.8s ease-in-out infinite;
        }
        
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
        .custom-pulse-slow {
          animation: pulse-slow 2.5s ease-in-out infinite;
        }
        
        @keyframes fade-in {
          from { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        .custom-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default Footer;