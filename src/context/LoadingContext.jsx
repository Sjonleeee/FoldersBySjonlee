import React, { createContext, useContext, useState, useEffect } from 'react';

const LoadingContext = createContext();

export const useLoading = () => useContext(LoadingContext);

// Font loading check using FontFaceObserver
const loadFonts = async () => {
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
};

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [fontsLoaded, setFontsLoaded] = useState(false);

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

  return (
    <LoadingContext.Provider value={{ loading, progress, fontsLoaded }}>
      {children}
    </LoadingContext.Provider>
  );
};
