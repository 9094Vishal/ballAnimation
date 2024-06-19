import React, { useEffect, useRef, useState } from "react";

const Anim = () => {
  let x = 0;
  let x2 = 0;
  const [duration, setDuration] = useState(5);
  const [ballHeight, setBallHeight] = useState(20);
  const [ballWidth, setBallWidth] = useState(20);
  const [boxHeight, setBoxHeight] = useState(500);
  const [boxWidth, setBoxWidth] = useState(500);
  const [obstacles, setObstacles] = useState([{}]);
  let position = 0;
  let direction = 1;
  let bottom = 0;
  const ball = useRef(null);
  const obstacle = useRef(null);

  let animationId = useRef(null);
  let animationId1 = useRef(null);
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
  //   useEffect(() => {
  //     obstacle.current.style.left = "480px";
  //     obstacle.current.style.bottom = "200px";
  //     console.log(obstacle.current.style.left);
  //     console.log(ball.current.style.left);
  //   }, []);
  const updatePosition = () => {
    if (ball.current) {
      const rect = ball.current.getBoundingClientRect();
      position = rect.left;
      console.log(position);
    }
  };
  const anim = () => {
    // calculate box height and width
    let boxH = boxHeight - ballHeight;
    let boxw = boxWidth - ballWidth;

    // calclulating total steps
    let totalTravel = boxH / ballHeight + 2;
    console.log((duration * 0.8) / totalTravel);
    console.log("start time", start.toLocaleTimeString());

    ball.current.style.transition = `bottom ${
      (duration * 0.2) / totalTravel
    }s ease-in-out ${(duration * 0.8) / totalTravel}s, left ${
      (duration * 0.8) / totalTravel
    }s ease-in-out`;

    console.log((duration / totalTravel) * 1000);
    console.log((((duration * 0.8) / totalTravel) * 1000) / 48);
    x2 = 20;
    animationId1 = setInterval(() => {
      if (bottom <= boxH) {
        x2 <= 0
          ? ((direction = 1),
            (bottom += Math.floor(
              (ballHeight * ballWidth) / ((ballHeight + ballWidth) / 2)
            )))
          : x2 >= 500
          ? ((direction = -1),
            (bottom += Math.floor(
              (ballHeight * ballWidth) / ((ballHeight + ballWidth) / 2)
            )))
          : "";
        console.log(x2 * direction);
        x2 += direction * 26;
        obstacle.current.style.left = x2 + "px";
        setTimeout(() => {
          if (
            !(
              bottom >=
              boxH +
                Math.floor(
                  (ballHeight * ballWidth) / ((ballHeight + ballWidth) / 2)
                )
            )
          )
            obstacle.current.style.bottom = bottom + "px";
        }, (duration / totalTravel) * 1000);
      } else {
        console.log(
          `start: ${start.toLocaleTimeString()}, end: ${new Date().toLocaleTimeString()}`
        );
        clearInterval(animationId);
        clearInterval(animationId1);
      }
    }, ((duration / totalTravel) * 1000) / 25);
    animationId1 = setInterval(() => {
      updatePosition();
    }, ((duration / totalTravel) * 1000) / 25);
    animationId = setInterval(() => {
      if (bottom <= boxH) {
        x == 0 ? (x = boxw) : x >= boxw ? (x = 0) : "";
        ball.current.style.left = x + "px";
        setTimeout(() => {
          if (
            !(
              bottom >=
              boxH +
                Math.floor(
                  (ballHeight * ballWidth) / ((ballHeight + ballWidth) / 2)
                )
            )
          )
            ball.current.style.bottom = bottom + "px";
        }, (duration * 0.8) / totalTravel);

        bottom += Math.floor(
          (ballHeight * ballWidth) / ((ballHeight + ballWidth) / 2)
        );
      } else {
        console.log(
          `start: ${start.toLocaleTimeString()}, end: ${new Date().toLocaleTimeString()}`
        );
        clearInterval(animationId);
        clearInterval(animationId1);
      }
    }, (duration / totalTravel) * 1000);
  };

  return (
    <div className="container">
      <div
        className="box"
        style={{ height: `${boxHeight}px`, width: `${boxWidth}px` }}
      >
        <div
          ref={ball}
          className={`ball`}
          style={{ height: `${ballHeight}px`, width: `${ballWidth}px` }}
        ></div>
        <div
          ref={obstacle}
          className="obstacle"
          style={{ height: `${ballHeight}px`, width: `${ballWidth}px` }}
        ></div>
      </div>
      <div className=" input-helper">
        <div className="btn">
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

        <div className="box-helper ">
          <label htmlFor="height">
            Height:
            <input
              name="height"
              type="number"
              value={boxHeight}
              onChange={onHeightChange}
              placeholder="Enter duration (ms)"
            />
          </label>

          <label htmlFor="width">
            Width:
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
            Ball Height:
            <input
              name="bheight"
              type="number"
              value={ballHeight}
              onChange={onBallHeightChange}
              placeholder="Enter duration (ms)"
            />
          </label>

          <label htmlFor="bwidth">
            Ball Width:
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
    </div>
  );
};

export default Anim;
