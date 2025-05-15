import React, { useEffect, useState } from "react";

export default function LoadingScreen({ progress }) {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    // Trigger fade-in on mount
    setTimeout(() => setFadeIn(true), 50); // slight delay for smoothness
  }, []);

  return (
    <div className={`fixed inset-0 flex flex-col items-center justify-center  transition-opacity duration-[1400ms] ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
      <div className="rounded-full overflow-hidden w-24 h-24 mb-8 shadow-lg">
        <img
          src="/assets/images/sjonlee.JPG"
          alt="Loading"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden mt-8">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{
            width: `${progress}%`,
            background: `
              linear-gradient(
                90deg,
                #e0e0e0 0%,
                #b0b0b0 20%,
                #f5f5f5 40%,
                #a0a0a0 60%,
                #e0e0e0 80%,
                #ffffff 100%
              )
            `,
            boxShadow: "0 0 12px 2px #b0b0b088, 0 1px 8px 0 #fff8"
          }}
        />
      </div>
      <div className="mt-4 text-white font-mono">{Math.floor(progress)}%</div>
    </div>
  );
}
