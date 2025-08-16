import React from "react";

const PresenceSection = () => {
  return (
    <section
    className="w-full flex items-center justify-center py-32 px-4 md:px-12 relative"
      style={{
        minHeight: "520px",
  backgroundImage: "url(/concrete1.webp)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.10)"
      }}
    >
      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-between gap-16 p-8 md:p-14">
        {/* Left: Text */}
        <div className="flex-1 flex flex-col items-start justify-center text-left p-2 md:p-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-4 drop-shadow-lg">Our Presence Across India</h2>
          <p className="text-lg md:text-xl text-gray-800 mb-6 max-w-lg">
            With a robust network and projects spanning the nation, Fuji Silvertech has established a strong presence in key regions. Our commitment to quality and innovation drives us to deliver excellence everywhere we go.
          </p>
          <ul className="list-disc pl-6 text-base text-blue-800 opacity-80 space-y-1">
            <li>Pan-India project delivery</li>
            <li>Strategic locations in major cities</li>
            <li>Trusted by leading infrastructure partners</li>
          </ul>
        </div>
        {/* Right: Indian Map */}
        <div className="flex-1 flex items-center justify-end">
          <img
            src="/Home/IndiaMap.webp"
            alt="India Map"
            className="w-full max-w-md h-auto rounded-2xl shadow-2xl border-4 border-white/80 bg-white/60"
            style={{ minWidth: "260px", maxHeight: "400px", padding: 12 }}
          />
        </div>
      </div>
    </section>
  );
};

export default PresenceSection;
