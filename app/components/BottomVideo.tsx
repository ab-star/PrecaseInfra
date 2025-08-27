import React from "react";

const BottomVideo = () => (
  <section className="relative w-[100dvw] overflow-hidden bg-black ml-[calc(50%-50dvw)] mr-[calc(50%-50dvw)] flex items-center justify-center min-h-[50svh] md:min-h-[60svh]">
    <video
      src="https://pub-ff6f7349f0ca4f698e9006f92b5c1c8a.r2.dev/BoxVideo/BoxVideo1.mp4"
      autoPlay
      loop
      muted
      playsInline
      controls={false}
  className="w-[100dvw] h-auto max-w-none mx-auto object-contain"
      style={{ background: 'transparent', display: 'block' }}
    />
  </section>
);

export default BottomVideo;
