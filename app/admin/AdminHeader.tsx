"use client";
import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function AdminHeader() {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin/login')) return null;
  return (
    <header className="bg-gray-800 text-white px-6 py-4 flex items-center justify-between">
      <h1 style={{ color: 'white' , marginLeft: "0.5rem" }} className="font-semibold tracking-wide">Admin Portal</h1>
      <nav aria-label="Admin navigation" className="flex items-center text-sm">
        <ul className="flex items-center">
          {[
            { href: '/admin/gallery', label: 'Gallery' },
            { href: '/admin/projects', label: 'Projects' },
            { href: '/admin/contacts', label: 'Contacts' },
          ].map((link, idx, arr) => {
            const isActive = pathname?.startsWith(link.href);
            return (
              <li key={link.href} className="flex items-center">
                <Link
                  href={link.href}
                  style={{padding: "0px 0.5rem" , color:"white"}}
                  prefetch={false}
                  aria-current={isActive ? 'page' : undefined}
                  className={[
                    'px-3 py-1.5 transition-colors',
                    isActive ? 'text-white font-medium' : 'text-white/85 hover:text-white',
                  ].join(' ')}
                >
                  {link.label}
                </Link>
                {idx < arr.length - 1 && (
                  <span className="mx-1.5 h-5 w-px bg-white/30" aria-hidden="true" />
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
