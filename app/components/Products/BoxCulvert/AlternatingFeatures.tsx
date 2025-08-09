import Image from 'next/image';
import React from 'react';

type Feature = {
  title: string;
  description: string;
  image: string;
};

const features: Feature[] = [
  {
    title: 'Smooth Interior Surface',
    description:
      'The interior surface is finished to facilitate smooth water flow, reduce friction, and minimize sediment deposition over time.',
    image: '/product/BoxCulvertProduct/transition/1.png',
  },
  {
    title: 'Integrated Base Slab',
    description:
      'A monolithic base slab integrates with the sidewalls to create a solid foundation that resists differential settlement and uplift.',
    image: '/product/BoxCulvertProduct/transition/2.png',
  },
  {
    title: 'Thick Sidewalls',
    description:
      'Optimized wall thickness provides excellent load-bearing capacity under highway and railway loading conditions, ensuring long-term stability.',
    image: '/product/BoxCulvertProduct/transition/3.png',
  },
  {
    title: 'Precision Casting',
    description:
      'High-performance self-compacting concrete and controlled curing deliver tight dimensional tolerances and a premium finish.',
    image: '/product/BoxCulvertProduct/transition/4.png',
  },
  {
    title: 'Reinforced Corners',
    description:
      'Critical junctions are reinforced to manage stress concentrations and improve durability against impact and cyclic loads.',
    image: '/product/BoxCulvertProduct/transition/5.png',
  },
  {
    title: 'Precise Joint Detail',
    description:
      'Joint geometry is engineered for snug fitment and reliable sealing, helping prevent leakage and simplifying on‑site installation.',
    image: '/product/BoxCulvertProduct/transition/6.png',
  },
];

export default function AlternatingFeatures() {
  return (
    <section className="w-full bg-gradient-to-b from-gray-50 via-white to-gray-50 py-12 md:py-16">
      {/* Full-width container with gentle side padding */}
      <div className="w-full px-4 sm:px-6 md:px-10">
  <h2 className="text-2xl my-2 md:text-3xl font-bold tracking-tight text-gray-900 mb-8 md:mb-12 text-center">
        </h2>

        <div className="space-y-6 md:space-y-8">
          {features.map((f, idx) => (
            <article
              key={f.title}
              className="rounded-xl bg-gray-100/70 shadow-sm ring-1 ring-black/5 overflow-hidden"
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
                  <div className="absolute inset-0 ring-1 ring-black/10" />
                </div>

                {/* Text */}
                <div className="p-5 md:p-8 flex items-center justify-center">
                  <div className="max-w-prose mx-auto text-center">
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                      {f.title}
                    </h3>
                    <p className="mt-2 text-sm md:text-base leading-relaxed text-gray-700">
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
