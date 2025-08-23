export default function VideoTest() {
  return (
    <div className="w-full h-screen">
      <h1 className="text-center text-2xl p-4">Video Test Page</h1>
      <div className="w-full h-96 bg-gray-200 relative">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          controls
          src="https://pub-ff6f7349f0ca4f698e9006f92b5c1c8a.r2.dev/BoxVideo/BoxVideo1.mp4"
        >
          Video not supported
        </video>
      </div>
      <p className="text-center p-4">If you see a video above, it works!</p>
    </div>
  );
}
