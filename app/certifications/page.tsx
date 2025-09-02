"use client"
import { useState, useEffect } from 'react';
import Head from 'next/head';

interface Certification {
  id: number;
  title: string;
  description: string;
  filePath: string;
  issueDate: string;
  issuingAuthority: string;
}

const CertificationsPage = () => {
  const [selectedCertification, setSelectedCertification] = useState<Certification | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Sample certifications data
  const certifications: Certification[] = [
    {
      id: 1,
      title: '3G Infratech - ISO 14001',
      description: 'Quality Management System certification demonstrating our commitment to consistent quality and continuous improvement.',
      filePath: '/certif/3G Infratech - ISO 14001.pdf',
      issueDate: 'March 15, 2023',
      issuingAuthority: 'International Organization for Standardization'
    },
    {
      id: 2,
      title: '3G Infratech - ISO 45001',
      description: 'Information Security Management System certification ensuring the highest standards of data protection and security.',
      filePath: '/certif/3G Infratech - ISO 45001.pdf',
      issueDate: 'April 22, 2023',
      issuingAuthority: 'International Organization for Standardization'
    },
    {
      id: 3,
      title: 'ISO 9001 2015',
      description: 'Service Organization Control compliance report verifying our security, availability, and confidentiality processes.',
      filePath: '/certif/ISO 9001 2015.pdf',
      issueDate: 'May 30, 2023',
      issuingAuthority: 'American Institute of CPAs'
    }
  ];

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const openPreview = (certification: Certification) => {
    setSelectedCertification(certification);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const closePreview = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'unset'; // Re-enable scrolling
    setTimeout(() => setSelectedCertification(null), 300);
  };

  // Handle click outside modal content to close
  const handleModalClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closePreview();
    }
  };

  return (
    <>
      <Head>
        <title>Our Certifications | Company Name</title>
        <meta name="description" content="View our company's certifications and compliance documents" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

  <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Certifications</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We maintain the highest standards of quality, security, and compliance across all our operations.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
              {certifications.map((cert) => (
                <div 
                  key={cert.id} 
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col"
                >
                  <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-700"></div>
                  <div className="p-6 flex-grow">
                    <div className="flex items-center mb-4">
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 ml-4">{cert.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-4">{cert.description}</p>
                    <div className="text-sm text-gray-500 mb-6">
                      <p>Issued by: {cert.issuingAuthority}</p>
                      <p>Date: {cert.issueDate}</p>
                    </div>
                  </div>
                  <div className="px-6 pb-6 mt-auto">
                    <div className="flex space-x-4">
                      <button
                        onClick={() => openPreview(cert)}
                        className="flex-1 flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Preview
                      </button>
                      <a
                        href={cert.filePath}
                        download
                        className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Download
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Preview Modal */}
        {selectedCertification && (
          <div 
            className={`fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50 transition-opacity duration-300 ${isModalOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onClick={handleModalClick}
          >
            <div 
              className={`bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden transform transition-transform duration-300 ${isModalOpen ? 'scale-100' : 'scale-95'}`}
            >
              <div className="flex justify-between items-center p-6 border-b border-gray-200">
                <h3 className="text-2xl font-semibold text-gray-800">{selectedCertification.title}</h3>
                <button
                  onClick={closePreview}
                  className="text-gray-500 hover:text-gray-700 transition-colors duration-200 p-2 rounded-full hover:bg-gray-100"
                  aria-label="Close modal"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="h-[70vh] p-6">
                <iframe 
                  src={selectedCertification.filePath} 
                  className="w-full h-full border rounded-lg"
                  title={`Preview of ${selectedCertification.title}`}
                  frameBorder="0"
                />
              </div>
              <div className="flex justify-between items-center p-6 border-t border-gray-200">
                <div>
                  <p className="text-sm text-gray-600">Issued by: {selectedCertification.issuingAuthority}</p>
                  <p className="text-sm text-gray-600">Date: {selectedCertification.issueDate}</p>
                </div>
                <a
                  href={selectedCertification.filePath}
                  download
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download PDF
                </a>
              </div>
            </div>
          </div>
        )}
      </main>

      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
      `}</style>
    </>
  );
};

export default CertificationsPage;