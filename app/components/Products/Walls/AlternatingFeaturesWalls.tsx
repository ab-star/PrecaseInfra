import Image from 'next/image';
import React from 'react';

type Feature = {
  title: string;
  description: string;
  image: string;
};

// Use available images (01-05.png). If 06 exists later, it can be added.
const features: Feature[] = [
  {
    title: 'Integrated Wall Assembly',
    description:
      'Footing, column, and wall are cast as a single precast unit, ensuring strength and stability in one structure.',
    image: '/product/walls/images/01.png',
  },
  {
    title: 'Fast & Safe Installation',
    description:
      'Precast system enables rapid on-site erection, allowing higher installation quantities per day compared to conventional methods.',
    image: '/product/walls/images/02.png',
  },
  {
    title: 'Seamless Single-Piece Design',
    description:
      'Walls are cast in a single piece without joints, delivering superior strength and flawless continuity.',
    image: '/product/walls/images/03.png',
  },
  {
    title: 'Superior Surface Finish',
    description:
      'Factory-controlled casting ensures smooth, uniform surfaces that require minimal to no plastering.',
    image: '/product/walls/images/04.png',
  },
  {
    title: 'Dual-Application Advantage',
    description:
      'Compound walls can be combined over retaining walls—offering earth retention and secure boundary solutions in one system.',
    image: '/product/walls/images/05.png',
  },
];


export default function AlternatingFeaturesWalls() {
  return (
    <section
      className="w-full py-12 md:py-16 bg-center bg-cover"
      style={{ backgroundImage: "url(/product/Drain/background/uShapedDrainBg.jpg)" }}
    >
      <div className="w-full px-4 sm:px-6 md:px-10">

        <div className="space-y-6 md:space-y-8">
          {features.map((f, idx) => (
            <article key={f.title} className="bg-gray-100/70 shadow-sm ring-1 ring-black/5 overflow-hidden">
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
