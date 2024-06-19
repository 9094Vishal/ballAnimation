import React, { useRef, useState } from "react";

const Anim = () => {
  let x = 0;
  const [duration, setDuration] = useState(5);
  const [ballHeight, setBallHeight] = useState(20);
  const [ballWidth, setBallWidth] = useState(20);
  const [boxHeight, setBoxHeight] = useState(500);
  const [boxWidth, setBoxWidth] = useState(500);
  let bottom = 0;
  const ball = useRef(null);
  let animationId = useRef(null);
  let start = new Date();
  const startAnimation = () => {
    start = new Date();
    anim();
  };

  const stopAnimation = () => {
    clearInterval(animationId);
  };

  const resetAnimation = () => {
    x = 0;
    bottom = 0;
    ball.current.style.left = `${x}px`;
    ball.current.style.bottom = `${bottom}px`;
    clearInterval(animationId);
  };

  const handleInputChange = (e) => {
    setDuration(Number(e.target.value));
  };
  const onHeightChange = (e) => {
    setBoxHeight(Number(e.target.value));
  };
  const onWidthChange = (e) => {
    setBoxWidth(Number(e.target.value));
  };
  const onBallHeightChange = (e) => {
    setBallHeight(Number(e.target.value));
  };
  const onBallWidthChange = (e) => {
    setBallWidth(Number(e.target.value));
  };
  const anim = () => {
    console.log("start time", start.toLocaleTimeString());
    // here 26 means total vartical and horizontal itration....
    ball.current.style.transition = `bottom ${
      (duration * 0.2) / 26
    }s ease-in-out ${(duration * 0.8) / 26}s, left ${
      (duration * 0.8) / 26
    }s ease-in-out`;

    animationId = setInterval(() => {
      // calculate box height and width
      let boxH = boxHeight - ballHeight;
      let boxw = boxWidth - ballWidth;

      let totalTravel = boxH / ballHeight + 2;
      console.log("====================================");
      console.log(totalTravel);
      console.log("====================================");
      // calclulating total steps

      if (bottom <= boxH) {
        x == 0 ? (x = boxw) : x >= boxw ? (x = 0) : "";
        ball.current.style.left = x + "px";
        setTimeout(() => {
          if (!(bottom >= boxH + 20)) ball.current.style.bottom = bottom + "px";
        }, (duration * 0.8) / 26);
        bottom += 20;
      } else {
        console.log(
          `start: ${start.toLocaleTimeString()}, end: ${new Date().toLocaleTimeString()}`
        );
        clearInterval(animationId);
      }
    }, (duration / 26) * 1000);
  };

  return (
    <div className="container">
      <div
        className="box"
        style={{ height: `${boxHeight}px`, width: `${boxWidth}px` }}
      >
        <div ref={ball} className={`ball`}></div>
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
      <div className="box-helper">
        <label htmlFor="height">
          Height:{" "}
          <input
            name="height"
            type="number"
            value={boxHeight}
            onChange={onHeightChange}
            placeholder="Enter duration (ms)"
          />
        </label>

        <label htmlFor="width">
          Width:{" "}
          <input
            name="width"
            type="number"
            value={boxWidth}
            onChange={onWidthChange}
            placeholder="Enter duration (ms)"
          />
        </label>
      </div>
      <div className="ball-helper">
        <label htmlFor="bheight">
          Ball Height:{" "}
          <input
            name="bheight"
            type="number"
            value={ballHeight}
            onChange={onBallHeightChange}
            placeholder="Enter duration (ms)"
          />
        </label>

        <label htmlFor="bwidth">
          Ball Width:{" "}
          <input
            name="bwidth"
            type="number"
            value={ballWidth}
            onChange={onBallWidthChange}
            placeholder="Enter duration (ms)"
          />
        </label>
      </div>
    </div>
  );
};

export default Anim;
