"use client";
import {useState, useEffect} from "react";

function MainComponent() {
  const [splashes, setSplashes] = useState([]);
  const [smallSplashes, setSmallSplashes] = useState([]);
  const [particles, setParticles] = useState([]);
  const [availableColors, setAvailableColors] = useState([
    "#8A2BE2", // Purple
    "#FF4500", // Orange
    "#32CD32", // Green
    "#1E90FF", // Blue
    "#FF1493", // Pink
    "#40E0D0", // Turquoise
    "#FFD700", // Yellow
    "#FF7F50", // Coral
    "#FF00FF", // Magenta
    "#008080", // Teal
    "#DC143C", // Crimson
    "#4B0082", // Indigo
    "#EE82EE", // Violet
  ]);
  const [showMessage, setShowMessage] = useState(false);
  const getRandomColor = () => {
    if (availableColors.length === 0) return "#000000";
    const randomIndex = Math.floor(Math.random() * availableColors.length);
    const color = availableColors[randomIndex];
    setAvailableColors((prev) =>
      prev.filter((_, index) => index !== randomIndex)
    );
    return color;
  };

  useEffect(() => {
    const createParticle = () => ({
      id: Math.random(),
      x: Math.random() * 100,
      y: Math.random() * 100,
      color: `${
        availableColors[Math.floor(Math.random() * availableColors.length)]
      }33`,
      size: Math.random() * 8 + 3,
    });
    const initialParticles = Array.from({ length: 12 })
      .fill(null)
      .map(createParticle);
    setParticles(initialParticles);

    const interval = setInterval(() => {
      setParticles((prev) =>
        prev.map((particle) => ({
          ...particle,
          x: (particle.x + 0.1) % 100,
          y: (particle.y + 0.05) % 100,
        }))
      );
    }, 50);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const baseX = ((e.clientX - rect.left) / rect.width) * 100;
    const baseY = ((e.clientY - rect.top) / rect.height) * 100;

    const numSplashes = Math.min(
      Math.floor(Math.random() * 4) + 5,
      availableColors.length
    );
    const remainingColors = availableColors.length - numSplashes;
    const numSmallSplashes = Math.min(
      Math.floor(Math.random() * 4) + 12,
      remainingColors
    );

    for (let i = 0; i < numSplashes; i++) {
      const delay = i * 50;
      const angle = (Math.PI * 2 * i) / numSplashes;
      const distance = Math.random() * 3 + 2;

      setTimeout(() => {
        setSplashes((prev) => [
          ...prev,
          {
            id: Math.random(),
            x: baseX + Math.cos(angle) * distance,
            y: baseY + Math.sin(angle) * distance,
            color: getRandomColor(),
            size: Math.random() * 100 + 50,
            rotation: Math.random() * 360,
            delay: delay,
          },
        ]);
      }, delay);
    }

    for (let i = 0; i < numSmallSplashes; i++) {
      const delay = 200 + i * 30;
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 15 + 5;

      setTimeout(() => {
        setSmallSplashes((prev) => [
          ...prev,
          {
            id: Math.random(),
            x: baseX + Math.cos(angle) * distance,
            y: baseY + Math.sin(angle) * distance,
            color: getRandomColor(),
            size: Math.random() * 50 + 50,
            rotation: Math.random() * 360,
            delay: delay,
          },
        ]);
      }, delay);
    }
  };
  const handleBalloonClick = (e) => {
    e.stopPropagation();
    setShowMessage(true);

    const createSplash = (x, y, delay) => ({
      id: Math.random(),
      x,
      y,
      color: getRandomColor(),
      size: Math.random() * 200 + 200,
      rotation: Math.random() * 360,
      delay,
    });

    const createSmallSplash = (x, y, delay) => ({
      id: Math.random(),
      x,
      y,
      color: getRandomColor(),
      size: Math.random() * 50 + 50,
      rotation: Math.random() * 360,
      delay,
    });

    const splashPositions = [
      { x: 15, y: 15 },
      { x: 85, y: 15 },
      { x: 15, y: 50 },
      { x: 85, y: 50 },
      { x: 15, y: 85 },
      { x: 85, y: 85 },
      { x: 50, y: 30 },
      { x: 50, y: 50 },
      { x: 50, y: 70 },
    ].slice(0, Math.min(9, availableColors.length));

    splashPositions.forEach(({ x, y }, index) => {
      setTimeout(() => {
        setSplashes((prev) => [...prev, createSplash(x, y, index * 50)]);

        const remainingColors = availableColors.length - (index + 1);
        const numSmallSplashes = Math.min(3, remainingColors);

        for (let i = 0; i < numSmallSplashes; i++) {
          const angle = Math.random() * Math.PI * 2;
          const distance = Math.random() * 10 + 5;
          const smallX = x + Math.cos(angle) * distance;
          const smallY = y + Math.sin(angle) * distance;

          setTimeout(() => {
            setSmallSplashes((prev) => [
              ...prev,
              createSmallSplash(smallX, smallY, 200 + i * 30),
            ]);
          }, 200 + i * 30);
        }
      }, index * 50);
    });
  };

  const resetCelebration = () => {
    setSplashes([]);
    setSmallSplashes([]);
    setShowMessage(false);
    setAvailableColors([
      "#8A2BE2", // Purple
      "#FF4500", // Orange
      "#32CD32", // Green
      "#1E90FF", // Blue
      "#FF1493", // Pink
      "#40E0D0", // Turquoise
      "#FFD700", // Yellow
      "#FF7F50", // Coral
      "#FF00FF", // Magenta
      "#008080", // Teal
      "#DC143C", // Crimson
      "#4B0082", // Indigo
      "#EE82EE", // Violet
    ]);
  };

  return (
    <div className="relative w-full h-screen bg-white overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full opacity-10"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            transform: "translate(-50%, -50%)",
            mixBlendMode: "multiply",
          }}
        />
      ))}

      {splashes.map((splash) => (
        <div
          key={splash.id}
          className="absolute"
          style={{
            left: `${splash.x}%`,
            top: `${splash.y}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div
            className="absolute"
            style={{
              width: `${splash.size}px`,
              height: `${splash.size}px`,
              backgroundColor: splash.color,
              borderRadius: "50%",
              animation: `splash 0.8s forwards ${splash.delay}ms`,
              opacity: 0.7,
              transform: `rotate(${splash.rotation}deg)`,
              transition: "all 0.4s ease-out",
              mixBlendMode: "multiply",
            }}
          />
        </div>
      ))}

      {smallSplashes.map((splash) => (
        <div
          key={splash.id}
          className="absolute"
          style={{
            left: `${splash.x}%`,
            top: `${splash.y}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div
            className="absolute"
            style={{
              width: `${splash.size}px`,
              height: `${splash.size}px`,
              backgroundColor: splash.color,
              borderRadius: "50%",
              animation: `smallSplash 0.6s forwards ${splash.delay}ms`,
              opacity: 0.6,
              transform: `rotate(${splash.rotation}deg)`,
              transition: "all 0.3s ease-out",
              mixBlendMode: "multiply",
            }}
          />
        </div>
      ))}

      {!showMessage && (
        <div
          className="absolute left-1/2 transform -translate-x-1/2 cursor-pointer hover:scale-105 transition-transform duration-300"
          style={{
            animation: "float-balloon 15s linear infinite",
          }}
          onClick={handleBalloonClick}
        >
          <div
            className="relative"
            style={{
              width: "100px",
              height: "125px",
              backgroundColor: "#FF4500",
              borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          />
          <div
            className="absolute"
            style={{
              width: "4px",
              height: "60px",
              backgroundColor: "#666",
              left: "50%",
              transform: "translateX(-50%)",
              top: "125px",
            }}
          />
          <p className="text-xl text-gray-700 mt-16 text-center font-crimson-text animate-bounce">
            Pop me!
          </p>
        </div>
      )}

      {showMessage && (
        <div
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
          style={{
            width: "500px",
            padding: "40px",
            background: "#FFFFFF",
            borderRadius: "20px",
            transform: "rotate(-2deg)",
            animation:
              "messageFloat 3s ease-in-out infinite, borderGlow 2s linear infinite",
            transition: "transform 0.3s ease",
            boxShadow:
              "0 10px 30px rgba(0,0,0,0.15), 0 0 15px rgba(255,69,0,0.3), 0 0 25px rgba(138,43,226,0.3), 0 0 35px rgba(50,205,50,0.3), 0 0 45px rgba(30,144,255,0.3)",
            border: "3px solid transparent",
            backgroundClip: "padding-box",
          }}
        >
          <div className="text-center">
            <h1
              className="text-8xl font-bold mb-8 font-crimson-text"
              style={{
                background:
                  "linear-gradient(45deg, #FF4500, #8A2BE2, #32CD32, #1E90FF, #FF1493)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundSize: "300% 300%",
                animation: "gradientText 5s ease infinite",
                textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
              }}
            >
              Happy Holi 
            </h1>
            <p
              className="text-4xl mt-6 font-crimson-text"
              style={{
                background: "linear-gradient(45deg, #FF4500, #8A2BE2)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
              }}
            >
              I Ashirbad Wish you a Holi filled with vibrant colors, happiness, and fun!
            </p>
          </div>
        </div>
      )}

  
     <div className="absolute bottom-7 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg border border-gray-300 bg-white bg-opacity-10 backdrop-blur-md shadow-md">
      <div
          className="text-lg font-crimson-text"
          style={{
            fontSize: "24px",
            background: "linear-gradient(45deg, #FF4500, #8A2BE2, #32CD32, #1E90FF)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundSize: "300% 300%",
            animation: "gradientText 5s ease infinite",
            textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
            fontWeight: "bold",
          }}
        >
        Created by @Ashirbad Routray
      </div>
    </div>

      <style jsx global>{`
        @keyframes splash {
          0% {
            transform: scale(0.8) rotate(0deg);
          }
          50% {
            transform: scale(1.4) rotate(180deg);
          }
          100% {
            transform: scale(1) rotate(360deg);
          }
        }
        
        @keyframes smallSplash {
          0% {
            transform: scale(0.6) rotate(0deg);
          }
          50% {
            transform: scale(1.2) rotate(90deg);
          }
          100% {
            transform: scale(1) rotate(180deg);
          }
        }
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes gradientText {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes gradientBg {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes borderGlow {
          0% { border-color: rgba(255,69,0,0.5); }
          25% { border-color: rgba(138,43,226,0.5); }
          50% { border-color: rgba(50,205,50,0.5); }
          75% { border-color: rgba(30,144,255,0.5); }
          100% { border-color: rgba(255,69,0,0.5); }
        }

        @keyframes messageFloat {
          0%, 100% { transform: translate(-50%, -50%) rotate(-2deg); }
          50% { transform: translate(-50%, -52%) rotate(-1deg); }
        }

        @keyframes float-balloon {
          0% {
            transform: translate(-50%, 100%) rotate(0deg);
          }
          25% {
            transform: translate(-52%, 50%) rotate(-2deg);
          }
          50% {
            transform: translate(-50%, 0%) rotate(0deg);
          }
          75% {
            transform: translate(-48%, -50%) rotate(2deg);
          }
          100% {
            transform: translate(-50%, -100%) rotate(0deg);
          }
        }

        @keyframes glassAppear {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.9) rotate(-5deg);
          }
          100% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1) rotate(-2deg);
          }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1) translateX(-50%); }
          50% { transform: scale(1.05) translateX(-50%); }
        }

        @keyframes reveal {
          0% { 
            opacity: 0; 
            transform: translate(-50%, -30%) scale(0.8); 
          }
          100% { 
            opacity: 1; 
            transform: translate(-50%, -50%) scale(1); 
          }
        }
      `}</style>
    </div>
  );
}

export default MainComponent;