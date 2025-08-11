import Image from 'next/image';
import React from 'react';

type Feature = {
  title: string;
  description: string;
  image: string;
};

// Use available images (01-05.png). If 06 exists later, it can be added.
const features: Feature[] = [
  { title: 'Precision Modular Panels', description: 'Factory-cast panels ensure consistent dimensions and rapid on-site assembly.', image: '/product/walls/images/01.png' },
  { title: 'Robust Reinforcement', description: 'Optimized reinforcement layouts provide excellent bending and shear performance.', image: '/product/walls/images/02.png' },
  { title: 'Smooth Architectural Finish', description: 'Clean surfaces ready for paint or cladding with minimal prep.', image: '/product/walls/images/03.png' },
  { title: 'Fast Erection Details', description: 'Integrated lifting and connection details reduce crane time and labor.', image: '/product/walls/images/04.png' },
  { title: 'Service-Friendly Routing', description: 'Concealed provisions allow easy MEP routing without rework.', image: '/product/walls/images/05.png' },
];

export default function AlternatingFeaturesWalls() {
  return (
    <section className="w-full bg-gradient-to-b from-gray-50 via-white to-gray-50 py-12 md:py-16">
      <div className="w-full px-4 sm:px-6 md:px-10">

        <div className="space-y-6 md:space-y-8">
          {features.map((f, idx) => (
            <article key={f.title} className="rounded-xl bg-gray-100/70 shadow-sm ring-1 ring-black/5 overflow-hidden">
              <div className={`grid items-stretch gap-0 md:grid-cols-2 ${idx % 2 === 0 ? '' : 'md:[&>div:first-child]:order-2'}`}>
                <div className="relative min-h-[240px] sm:min-h-[280px] md:min-h-[360px] lg:min-h-[460px] bg-gray-100">
                  <Image src={f.image} alt={f.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain" priority={idx < 2} />
                  <div className="absolute inset-0 ring-1 ring-black/10" />
                </div>
                <div className="p-5 md:p-8 flex items-center justify-center">
                  <div className="max-w-prose mx-auto text-center">
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900">{f.title}</h3>
                    <p className="mt-2 text-sm md:text-base leading-relaxed text-gray-700">{f.description}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
