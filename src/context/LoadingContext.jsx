<<<<<<< HEAD
import React, { createContext, useContext, useState, useEffect } from 'react';

const LoadingContext = createContext();

export const useLoading = () => useContext(LoadingContext);
=======
import React, { createContext, useState, useContext, useEffect, useRef } from "react";

// Create context with defaults
const LoadingContext = createContext({
  loading: true,
  progress: 0,
  setLoading: () => {},
});
>>>>>>> dev

// Font loading utility with timeout and polling
const loadFonts = async () => {
<<<<<<< HEAD
  try {
    // Create a font loading checker
    const fontLoader = () => {
      return new Promise((resolve) => {
        const testElement = document.createElement('div');
        testElement.style.position = 'absolute';
        testElement.style.visibility = 'hidden';
        testElement.style.fontFamily = "Hermaiona, serif";
        testElement.style.fontSize = "0px";
        document.body.appendChild(testElement);
        testElement.innerHTML = "Font loading test";

        // Check if font is loaded every 100ms
        const checkFont = () => {
          // Try to apply the font and check if it worked
          if (document.fonts && document.fonts.check) {
            if (document.fonts.check("1em Hermaiona")) {
              document.body.removeChild(testElement);
              resolve(true);
              return;
            }
          }
          setTimeout(checkFont, 100);
        };
        checkFont();
      });
    };

    // Set a timeout for font loading
    const timeoutPromise = new Promise((resolve) => {
      setTimeout(() => resolve(false), 5000); // 5 second timeout
    });

    // Race the font loading against the timeout
    const fontLoaded = await Promise.race([fontLoader(), timeoutPromise]);
    if (!fontLoaded) {
      console.warn("Font loading timed out");
    }
    return fontLoaded;
  } catch (error) {
    console.warn("Font loading issue:", error);
    return false;
  }
=======
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
>>>>>>> dev
};

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const fontsLoaded = useRef(false);
  const modelLoaded = useRef(false);
  const intervalId = useRef(null);
  const fontCheckIntervalId = useRef(null);

<<<<<<< HEAD
  useEffect(() => {
      let current = 0;
    const increment = () => {
      if (current < 98) {
        current += 1;
        setProgress(current);
        setTimeout(increment, 20);
      }
    };

    // Start loading fonts immediately
    loadFonts().then((loaded) => {
      setFontsLoaded(loaded);
      if (loaded) {
              setProgress(100);
        setTimeout(() => setLoading(false), 500);
            }
    });

    increment();
  }, []);

=======
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

>>>>>>> dev
  return (
    <LoadingContext.Provider value={{ loading, progress, fontsLoaded }}>
      {children}
    </LoadingContext.Provider>
  );
};
<<<<<<< HEAD
=======

// Hook for consuming context
export const useLoading = () => useContext(LoadingContext);

export default LoadingContext;
>>>>>>> dev
