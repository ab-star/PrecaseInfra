"use client";

export default function DebugImages() {
  return (
    <div className="p-8 bg-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-black">Image Debug Test</h1>
      
      <div className="space-y-8">
        {/* Test 1: Direct image */}
        <div>
          <h2 className="text-lg font-semibold mb-2 text-black">Test 1: Direct image with full path</h2>
          <div className="w-64 h-64 border-2 border-red-500 bg-gray-100">
            <img 
              src="/product/BoxCulvertProduct/transition/1.png"
              alt="Test 1"
              className="w-full h-full object-cover"
              onLoad={() => console.log('Image 1 loaded successfully')}
              onError={(e) => {
                console.error('Image 1 failed to load');
                e.currentTarget.style.backgroundColor = 'red';
                e.currentTarget.style.color = 'white';
                e.currentTarget.innerHTML = 'FAILED TO LOAD';
              }}
            />
          </div>
        </div>

        {/* Test 2: All images in grid */}
        <div>
          <h2 className="text-lg font-semibold mb-2 text-black">Test 2: All transition images</h2>
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map(num => (
              <div key={num} className="text-center">
                <p className="text-black mb-2">Image {num}</p>
                <div className="w-32 h-32 border border-gray-400 bg-gray-100">
                  <img 
                    src={`/product/BoxCulvertProduct/transition/${num}.png`}
                    alt={`Transition ${num}`}
                    className="w-full h-full object-cover"
                    onLoad={() => console.log(`Image ${num} loaded`)}
                    onError={(e) => {
                      console.error(`Image ${num} failed`);
                      e.currentTarget.style.backgroundColor = 'red';
                      e.currentTarget.style.color = 'white';
                      e.currentTarget.innerHTML = `ERR ${num}`;
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Test 3: Check what files browser can actually see */}
        <div>
          <h2 className="text-lg font-semibold mb-2 text-black">Test 3: Direct links</h2>
          {[1, 2, 3, 4, 5, 6].map(num => (
            <div key={num} className="mb-2">
              <a 
                href={`/product/BoxCulvertProduct/transition/${num}.png`}
                target="_blank"
                className="text-blue-600 underline mr-4"
              >
                Open image {num} in new tab
              </a>
              <span className="text-gray-600">
                /product/BoxCulvertProduct/transition/{num}.png
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
