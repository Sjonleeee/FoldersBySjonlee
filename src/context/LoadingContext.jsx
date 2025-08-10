import React, { createContext, useState, useContext, useEffect, useRef } from "react";

// Create context with defaults
const LoadingContext = createContext({
  loading: true,
  progress: 0,
  setLoading: () => {},
});

// Font loading utility with timeout and polling
const loadFonts = async () => {
  const timeout = new Promise((resolve) => setTimeout(resolve, 3000)); // 3 seconds timeout

  const fontCheck = new Promise((resolve) => {
    const testEl = document.createElement("span");
    testEl.style.fontFamily = "Hermaiona, serif";
    testEl.style.fontSize = "0";
    testEl.style.visibility = "hidden";
    testEl.textContent = "Font loading test";
    document.body.appendChild(testEl);

    const check = () => {
      if (document.fonts?.check("1em Hermaiona")) {
        document.body.removeChild(testEl);
        resolve(true);
      } else {
        setTimeout(check, 100);
      }
    };

    check();
  });

  // Race font loading vs timeout
  await Promise.race([fontCheck, timeout]).catch((e) => {
    console.warn("Font loading issue:", e);
  });

  return true; // Always resolve true to avoid blocking
};

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const fontsLoaded = useRef(false);
  const modelLoaded = useRef(false);
  const intervalId = useRef(null);
  const fontCheckIntervalId = useRef(null);

  // Load fonts once
  useEffect(() => {
    loadFonts().then(() => {
      fontsLoaded.current = true;
    });
  }, []);

  // Preload 3D model once
  useEffect(() => {
    import("@react-three/drei").then(({ useGLTF }) => {
      useGLTF.preload?.("/assets/model/3LOCKEDIN.glb");
      // Simulate small delay for real loading
      setTimeout(() => {
        modelLoaded.current = true;
      }, 400);
    });
  }, []);

  // Manage loading progress animation
  useEffect(() => {
    if (!loading) return;

    let current = 0;

    intervalId.current = setInterval(() => {
      current += 3;
      setProgress(current);

      if (current >= 100 && fontsLoaded.current && modelLoaded.current) {
        clearInterval(intervalId.current);
        setTimeout(() => setLoading(false), 800);
      } else if (
        current >= 98 &&
        (!fontsLoaded.current || !modelLoaded.current)
      ) {
        clearInterval(intervalId.current);

        fontCheckIntervalId.current = setInterval(() => {
          if (fontsLoaded.current && modelLoaded.current) {
            setProgress(100);
            clearInterval(fontCheckIntervalId.current);
            setTimeout(() => setLoading(false), 800);
          }
        }, 100);
      }
    }, 120);

    return () => {
      clearInterval(intervalId.current);
      clearInterval(fontCheckIntervalId.current);
    };
  }, [loading]);

  return (
    <LoadingContext.Provider value={{ loading, progress, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

// Hook for consuming context
export const useLoading = () => useContext(LoadingContext);

export default LoadingContext;
