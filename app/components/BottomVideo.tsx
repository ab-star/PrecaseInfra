import React from "react";

const BottomVideo = () => (
  <div className="w-full max-w-none" style={{background: 'transparent'}}>
    <div className="w-full aspect-video" style={{height: 'min(60vw, 680px)', minHeight: 400}}>
      <video
        src="https://pub-ff6f7349f0ca4f698e9006f92b5c1c8a.r2.dev/BoxVideo/BoxVideo1.mp4"
        autoPlay
        loop
        muted
        playsInline
        controls={false}
        className="w-full h-full object-cover"
        style={{ background: 'transparent', display: 'block', minHeight: 220 }}
      />
    </div>
  </div>
);

export default BottomVideo;
