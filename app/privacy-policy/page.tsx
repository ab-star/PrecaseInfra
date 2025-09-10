import React from "react";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto w-full">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 style={{marginBottom: "3rem" , marginRight: "5rem"}} className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          This Privacy Policy explains how we collect, use, disclose, and protect your personal information when you use our website, services, and applications. We are committed to maintaining the highest standards of privacy and data protection in compliance with global regulations including GDPR, CCPA, and other applicable data protection laws.

We only collect personal data that is necessary to deliver our services, improve user experience, and ensure the security of our platform. This may include information such as your name, email address, contact details, usage data, and technical identifiers.

Your information is used strictly for legitimate business purposes, such as providing access to our services, personalizing your experience, communicating updates, ensuring compliance with legal requirements, and safeguarding against fraudulent or unauthorized activities.



          </p>
        </div>


      </div>
    </main>
  );
}