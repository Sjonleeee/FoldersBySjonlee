import React, { createContext, useState, useContext, useEffect } from "react";

// Create context
const LoadingContext = createContext({
  loading: true,
  progress: 0,
  setLoading: () => {},
});

// Font loading check using FontFaceObserver
const loadFonts = async () => {
  // We'll use a timeout promise to make sure we don't wait forever
  const timeoutPromise = new Promise((resolve) => setTimeout(resolve, 3000)); // 3 second timeout

  try {
    // Create a font loading checker
    const fontLoader = () => {
      return new Promise((resolve) => {
        // Create a test element
        const testElement = document.createElement("span");
        testElement.style.fontFamily = "Hermaiona, serif";
        testElement.style.fontSize = "0px";
        testElement.style.visibility = "hidden";
        testElement.innerHTML = "Font loading test";
        document.body.appendChild(testElement);

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

    // Race the font loading against the timeout
    await Promise.race([fontLoader(), timeoutPromise]);
    return true;
  } catch (error) {
    console.warn("Font loading issue:", error);
    return false; // Continue even if font failed to load
  }
};

// Provider component
export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Font loading effect
  useEffect(() => {
    loadFonts().then(() => setFontsLoaded(true));
  }, []);

  // Simulate loading progress
  useEffect(() => {
    if (loading) {
      let current = 0;
      const interval = setInterval(() => {
        // Increment by smaller amounts to allow time for font loading
        current += 3;
        setProgress(current);

        // Only complete loading when fonts are ready and progress >= 100
        if (current >= 100 && fontsLoaded) {
          clearInterval(interval);
          setTimeout(() => {
            setLoading(false);
          }, 800); // Delay hiding loader for transition
        } else if (current >= 98 && !fontsLoaded) {
          // Hold at 98% until fonts are loaded
          clearInterval(interval);

          // Check for fonts every 100ms
          const fontCheckInterval = setInterval(() => {
            if (fontsLoaded) {
              setProgress(100);
              clearInterval(fontCheckInterval);
              setTimeout(() => {
                setLoading(false);
              }, 800); // Delay hiding loader for transition
            }
          }, 100);
        }
      }, 120);

      return () => clearInterval(interval);
    }
  }, [loading, fontsLoaded]);

  return (
    <LoadingContext.Provider value={{ loading, progress, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

// Custom hook for using the loading context
export const useLoading = () => useContext(LoadingContext);

export default LoadingContext;
