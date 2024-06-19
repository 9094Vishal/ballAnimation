import React, { useEffect, useRef, useState } from "react";

const TransitionExample = () => {
  const ballRef = useRef(null);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    // Apply the transition after the component mounts
    const ball = ballRef.current;
    if (ball) {
      ball.style.transition = "left 2s ease";
      ball.style.left = "500px"; // Start the transition
    }

    // Update position during the transition
    const updatePosition = () => {
      if (ball) {
        const rect = ball.getBoundingClientRect();
        setPosition(rect.left);
      }
    };

    // Set up an interval to check the position
    const interval = setInterval(updatePosition, 100);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "500px",
        height: "100px",
        border: "1px solid black",
      }}
    >
      <div
        ref={ballRef}
        style={{
          position: "absolute",
          left: "0px",
          width: "50px",
          height: "50px",
          backgroundColor: "red",
          borderRadius: "50%",
        }}
      ></div>
      <p>Ball position: {position}px</p>
    </div>
  );
};

export default TransitionExample;
