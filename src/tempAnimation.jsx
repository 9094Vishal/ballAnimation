import React, { useState, useEffect, useRef } from "react";

const BallAnimation = () => {
  let direction = 1;
  let x = 0;
  let y = 0;

  const [duration, setDuration] = useState(5);
  const startTimeRef = useRef(null);
  let start = new Date();
  const ball = useRef(null);
  const startAnimation = () => {
    start = new Date();
    animate();
  };

  const stopAnimation = () => {
    clearInterval(animatinId);
  };

  const resetAnimation = () => {
    x = 0;
    y = 0;
    ball.current.style.left = `${x}px`;
    ball.current.style.bottom = `${y}px`;
    direction = 1;
  };

  const handleInputChange = (e) => {
    setDuration(Number(e.target.value));
  };

  const ballSize = 20;
  const stepSize = 10;
  const containerWidth = 500;
  const containerHeight = 500;
  let animatinId;

  function animate() {
    // ball.current.style.animationDuration = `${duration}s`;
    ball.current.style.animation = `run ${duration}s`;
    startTimeRef.current = Date.now();
    animatinId = setInterval(() => {
      if (y < containerHeight - ballSize) {
        x += direction * stepSize;
        if (x >= containerWidth - ballSize || x <= 0) {
          direction *= -1;
          y += stepSize;
        }
        ball.current.style.left = `${x}px`;
        ball.current.style.bottom = `${y}px`;
      } else {
        console.log(
          `start: ${start.toLocaleTimeString()}, end: ${new Date().toLocaleTimeString()}`
        );
        stopAnimation();
        clearInterval(animatinId);
      }
    }, (duration * 1000) / 2401);
  }

  return (
    <div>
      <div className="box">
        <div ref={ball} className="ball"></div>
      </div>
      <button onClick={startAnimation}>Start</button>
      <button onClick={stopAnimation}>Stop</button>
      <button onClick={resetAnimation}>Reset</button>
      <input
        type="number"
        value={duration}
        onChange={handleInputChange}
        placeholder="Enter duration (ms)"
      />
    </div>
  );
};

export default BallAnimation;
