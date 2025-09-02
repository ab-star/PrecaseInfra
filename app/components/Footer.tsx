"use client"
import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, IconButton, Link } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import { FaCookie, FaTimes } from "react-icons/fa";
import Image from "next/image";

// Footer rebuilt using MUI components with responsive layout and modern styling

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
      <Box
        component="footer"
        sx={{
          position: "relative",
          zIndex: 90,
          width: { xs: "100%", md: "100dvw" },
          ml: { xs: 0, md: "calc(50% - 50dvw)" },
          mr: { xs: 0, md: "calc(50% - 50dvw)" },
          overflow: "hidden",
          color: "#ffffff",
          backgroundImage:
            "url('/product/Drain/background/uShapedDrainBg.jpg'), linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.1) 60%)",
          backgroundSize: "cover, cover",
          backgroundPosition: { xs: "center top, center", md: "center, center" },
          backgroundRepeat: "no-repeat, no-repeat",
          minHeight: { xs: 300, md: 460 },
          backgroundColor: 'transparent',
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <Box sx={{ maxWidth: 1200, mx: "auto", px: { xs: 2, sm: 3, md: 6 }, py: { xs: 4, md: 8 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: { xs: 2.5, md: 4 } }}>
            <Image
              src="/brandIcon.jpeg"
              alt="Company Logo"
              width={48}
              height={48}
              style={{ borderRadius: 12, boxShadow: "0 6px 20px rgba(0,0,0,0.15)" }}
              priority
            />
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr 1fr 1fr' }, gap: { xs: 3, md: 6 } }}>
            <Box>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 2, color: '#ffffff' }}>
                Contact Us
              </Typography>
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2, mb: 2 }}>
                <IconButton size="small" sx={{ bgcolor: "rgba(255,255,255,0.15)", color: "#fff", "&:hover": { bgcolor: "rgba(255,255,255,0.3)", transform: "scale(1.05)" }, transition: "all .2s" }} aria-label="location">
                  <LocationOnIcon />
                </IconButton>
                <Typography variant="body1" sx={{ lineHeight: 1.6, color: 'rgba(255,255,255,0.92)', fontSize: { xs: 14, md: 16 } }}>
                  1st Floor, 66, Lambe Hanuman Rd, Matavadi, Hans Society,<br />
                  Varachha, Surat, Gujarat 395006
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                <IconButton size="small" sx={{ bgcolor: "rgba(255,255,255,0.15)", color: "#fff", "&:hover": { bgcolor: "rgba(255,255,255,0.3)", transform: "scale(1.05)" }, transition: "all .2s" }} aria-label="phone">
                  <PhoneIcon />
                </IconButton>
                <Link href="tel:+919825680891" underline="hover" sx={{ color: "common.white", "&:hover": { color: "primary.light" } }}>
                  098256 80891
                </Link>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <IconButton size="small" sx={{ bgcolor: "rgba(255,255,255,0.15)", color: "#fff", "&:hover": { bgcolor: "rgba(255,255,255,0.3)", transform: "scale(1.05)" }, transition: "all .2s" }} aria-label="email">
                  <EmailIcon />
                </IconButton>
                <Link href="mailto:info@companyname.com" underline="hover" sx={{ color: "common.white", "&:hover": { color: "primary.light" }, fontSize: { xs: 14, md: 16 } }}>
                  info@companyname.com
                </Link>
              </Box>
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 2, color: '#ffffff' }}>
                Hours
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <AccessTimeIcon color="primary" />
                <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.92)', fontSize: { xs: 14, md: 16 } }}>Opens ⋅ 10 am</Typography>
              </Box>
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 2, color: '#ffffff' }}>
                Policies
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Link component="button" type="button" onClick={() => setOpenPolicy('privacy')} underline="hover" sx={{ textAlign: 'left', color: "rgba(255,255,255,0.85)", "&:hover": { color: "#fff" }, fontSize: { xs: 14, md: 16 } }}>
                  Privacy Policy
                </Link>
                <Link component="button" type="button" onClick={() => setOpenPolicy('terms')} underline="hover" sx={{ textAlign: 'left', color: "rgba(255,255,255,0.85)", "&:hover": { color: "#fff" }, fontSize: { xs: 14, md: 16 } }}>
                  Terms of Service
                </Link>
                <Link component="button" type="button" onClick={() => setOpenPolicy('cookie')} underline="hover" sx={{ textAlign: 'left', color: "rgba(255,255,255,0.85)", "&:hover": { color: "#fff" }, fontSize: { xs: 14, md: 16 } }}>
                  Cookie Policy
                </Link>
              </Box>
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 2, color: '#ffffff' }}>
                Follow Us
              </Typography>
              <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                <IconButton
                  component="a"
                  href="https://www.linkedin.com/company/3g-infratech/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  size="small"
                  sx={{ bgcolor: "rgba(255,255,255,0.15)", color: "#fff", "&:hover": { bgcolor: "rgba(255,255,255,0.3)", transform: "scale(1.05)" }, transition: "all .2s" }}
                >
                  <LinkedInIcon />
                </IconButton>
                <IconButton
                  component="a"
                  href="https://youtube.com/@3ginfratech"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  size="small"
                  sx={{ bgcolor: "rgba(255,255,255,0.15)", color: "#fff", "&:hover": { bgcolor: "rgba(255,255,255,0.3)", transform: "scale(1.05)" }, transition: "all .2s" }}
                >
                  <YouTubeIcon />
                </IconButton>
                <IconButton
                  component="a"
                  href="https://www.facebook.com/share/17Uvj2fVk3/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  size="small"
                  sx={{ bgcolor: "rgba(255,255,255,0.15)", color: "#fff", "&:hover": { bgcolor: "rgba(255,255,255,0.3)", transform: "scale(1.05)" }, transition: "all .2s" }}
                >
                  <FacebookIcon />
                </IconButton>
                <IconButton
                  component="a"
                  href="https://www.instagram.com/3ginfratech"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  size="small"
                  sx={{ bgcolor: "rgba(255,255,255,0.15)", color: "#fff", "&:hover": { bgcolor: "rgba(255,255,255,0.3)", transform: "scale(1.05)" }, transition: "all .2s" }}
                >
                  <InstagramIcon />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box sx={{ borderTop: "1px solid", borderColor: "divider", bgcolor: "#f9fafb" }}>
          <Box sx={{ maxWidth: 1200, mx: "auto", px: { xs: 2, sm: 4, md: 6 }, py: { xs: 1.5, md: 2 } }}>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: { xs: "center", md: "left" }, fontSize: { xs: 12, md: 14 } }}>
              © 2025 Your Company Name. All rights reserved.
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Policy Modal (MUI) */}
      <Dialog
        open={!!openPolicy}
        onClose={closePolicy}
        fullWidth
        maxWidth="md"
        aria-labelledby="policy-modal-title"
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pr: 1 }}>
          <Typography id="policy-modal-title" variant="h6" fontWeight={700}>
            {openPolicy ? getPolicyContent(openPolicy).title : ''}
          </Typography>
          <IconButton aria-label="Close" onClick={closePolicy} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent
          dividers
          sx={{
            bgcolor: 'background.paper',
            maxHeight: { xs: '70vh', md: '75vh' },
            px: { xs: 3, md: 5 },
            py: { xs: 2, md: 3 },
          }}
        >
          <Box sx={{ '& p': { color: 'text.primary' } }}>
            {openPolicy ? getPolicyContent(openPolicy).body : null}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={closePolicy} variant="contained" sx={{ textTransform: 'none' }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Cookie Consent Banner */}
      {showCookieConsent && (
        <div  className="fixed bottom-4 left-4 right-4 md:left-10 md:right-10 z-50 bg-gray-900/95 backdrop-blur-md border border-blue-700/30 rounded-xl shadow-2xl p-4 md:p-5 custom-fade-in">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4">
            <div className="flex items-start gap-3 flex-1">
              <div className="bg-blue-900/50 p-1.5 md:p-2 rounded-full mt-1">
                <FaCookie className="text-xl md:text-2xl text-blue-300" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold mb-1 text-sm md:text-base">We Use Cookies</h3>
                <p className="text-gray-300 text-xs md:text-sm">
                  We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
                  By clicking &quot;Accept All&quot;, you consent to our use of cookies.{" "}
                  <button type="button" onClick={() => setOpenPolicy('cookie')} className="text-blue-300 hover:text-blue-200 underline">
                    Learn more
                  </button>
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 md:gap-3 w-full md:w-auto">
              <button 
                onClick={rejectCookies}
                className="px-3 py-2 text-xs md:text-sm rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-800 transition-colors"
              >
                Reject All
              </button>
              <button 
                onClick={acceptCookies}
                className="px-3 py-2 text-xs md:text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-colors flex items-center justify-center gap-2"
              >
                <FaCookie className="text-xs md:text-sm" />
                Accept All
              </button>
            </div>
            
            <button 
              onClick={rejectCookies}
              className="absolute top-2 right-2 md:top-3 md:right-3 text-gray-400 hover:text-white transition-colors"
              aria-label="Close cookie consent"
            >
              <FaTimes />
            </button>
          </div>
        </div>
      )}

  {/* Global styles for animations (kept for cookie banner fade) */}
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