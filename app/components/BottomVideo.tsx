import React from "react";

const BottomVideo = () => (
  <div className="w-full max-w-none" style={{background: 'transparent'}}>
    <div className="w-full aspect-video" style={{height: 'min(60vw, 420px)', minHeight: 220}}>
      <iframe
        width="100%"
        height="100%"
        src="https://www.youtube.com/embed/A59tIuMV5Sg?si=iNJAlkxRR2ErGuHK&autoplay=1&mute=1&loop=1&playlist=A59tIuMV5Sg"
        title="YouTube video player"
        frameBorder="0"
        allow="autoplay; encrypted-media; fullscreen"
        allowFullScreen
        className="w-full h-full"
        style={{ background: 'transparent', display: 'block', minHeight: 220 }}
      ></iframe>
    </div>
  </div>
);

export default BottomVideo;
