"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function AdminNavbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="nav">
        <div className="container">
          
          {/* Logo */}
          <div className="logo">
            <div className="logoIcon"></div>
            <span>Admin</span>
          </div>

          {/* Desktop Links */}
          <div className="links">
            <Link href="/admin/gallery" className={`link ${pathname === "/" ? "active" : ""}`}>
              Gallery
            </Link>

            <Link
              href="/admin/contacts"
              className={`link ${pathname === "/about" ? "active" : ""}`}
            >
              Contacts
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="menuButton"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="mobileMenu">
            <Link href="/" className="mobileLink">Home</Link>
            <Link href="/about" className="mobileLink">About</Link>
          </div>
        )}
      </nav>

      <style jsx>{`
        .nav {
          width: 100%;
          background: white;
          box-shadow: 0 2px 10px rgba(0,0,0,0.08);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .container {
          max-width: 1200px;
          margin: auto;
          padding: 0 20px;
          height: 70px;

          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo {
          display: flex;
          align-items: center;
          font-weight: 600;
          font-size: 18px;
          color: #333;
        }

        .logoIcon {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          margin-right: 10px;

          background: linear-gradient(
            135deg,
            #4285f4,
            #34a853,
            #fbbc05,
            #ea4335
          );
        }

        .links {
          display: flex;
          gap: 30px;
        }

        .link {
          text-decoration: none;
          color: #666;
          font-weight: 500;
          padding-bottom: 6px;
          transition: all 0.2s ease;
        }

        .link:hover {
          color: #1976d2;
        }

        .active {
          color: #1976d2;
          border-bottom: 2px solid #1976d2;
        }

        .menuButton {
          display: none;
          font-size: 24px;
          background: none;
          border: none;
          cursor: pointer;
        }

        .mobileMenu {
          display: none;
        }

        @media (max-width: 768px) {
          .links {
            display: none;
          }

          .menuButton {
            display: block;
          }

          .mobileMenu {
            display: flex;
            flex-direction: column;
            background: white;
            border-top: 1px solid #eee;
          }

          .mobileLink {
            padding: 16px 20px;
            text-decoration: none;
            color: #333;
            border-bottom: 1px solid #eee;
          }

          .mobileLink:hover {
            background: #f5f5f5;
          }
        }
      `}</style>
    </>
  );
}