import Image from 'next/image';
import React from 'react';

type Feature = {
  title: string;
  description: string;
  image: string;
};

const features: Feature[] = [
  {
    title: 'Designed for Heavy Loads',
    description:
      'Engineered in compliance with IRC codes and railway standards to withstand demanding traffic conditions.',
    image: '/product/BoxCulvertProduct/transition/1.png',
  },
  {
    title: 'Built for Durability',
    description:
      'High-strength self-compacting concrete and FE500 reinforcement deliver long-lasting performance.',
    image: '/product/BoxCulvertProduct/transition/2.png',
  },
  {
    title: 'Hydraulic Efficiency',
    description:
      'Smooth interior surfaces and integrated base slab ensure efficient water flow and soil stability.',
    image: '/product/BoxCulvertProduct/transition/3.png',
  },
  {
    title: 'Fast & Easy Installation',
    description:
      'Self-explanatory handling system and precise joint design enable safe, speedy installation.',
    image: '/product/BoxCulvertProduct/transition/4.png',
  },
  {
    title: 'Leak-Proof Assurance',
    description:
      'Precision-engineered joints guarantee watertight connections, preventing leakage and maintenance issues.',
    image: '/product/BoxCulvertProduct/transition/5.png',
  },
  {
    title: 'Factory Precision Quality',
    description:
      'Controlled manufacturing and advanced casting techniques ensure uniformity, accuracy, and reduced on-site effort.',
    image: '/product/BoxCulvertProduct/transition/6.png',
  },
];

export default function AlternatingFeatures() {
  return (
    <section className="w-full bg-gradient-to-b from-gray-50 via-white to-gray-50 py-12 md:py-16">
      {/* Full-width container with gentle side padding */}
      <div className="w-full px-4 sm:px-6 md:px-10">
        <div className="space-y-6 md:space-y-8">
          {features.map((f, idx) => (
            <article
              key={f.title}
              className="rounded-xl bg-white shadow-sm overflow-hidden border border-gray-200"
            >
              <div
                className={`grid items-stretch gap-0 md:grid-cols-2 ${
                  idx % 2 === 0 ? '' : 'md:[&>div:first-child]:order-2'
                }`}
              >
                {/* Image */}
                <div className="relative min-h-[240px] sm:min-h-[280px] md:min-h-[360px] lg:min-h-[460px] bg-gray-100">
                  <Image
                    src={f.image}
                    alt={f.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain"
                    priority={idx < 2}
                  />
                  <div className="absolute inset-0 border border-gray-200" />
                </div>

                {/* Text */}
                <div className="p-5 md:p-8 flex items-center justify-center bg-white">
                  <div className="max-w-prose mx-auto text-center">
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">
                      {f.title}
                    </h3>
                    <p className="text-sm md:text-base leading-relaxed text-gray-700">
                      {f.description}
                    </p>
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