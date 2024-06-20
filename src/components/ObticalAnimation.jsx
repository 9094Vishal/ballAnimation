import React, { useEffect, useRef, useState } from "react";
import { to } from "react-spring";

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

  const anim = () => {
    // calculate box height and width
    let boxH = boxHeight - ballHeight;
    let boxw = boxWidth - ballWidth;

    // calclulating total steps
    let totalMove = (ballHeight * ballWidth) / ((ballHeight + ballWidth) / 2);
    let ratio = (boxH * boxw) / ((boxH + boxw) / 2);
    let totalTravel = ratio / totalMove;
    let totalInterwal = ((duration / totalTravel) * 1000) / totalTravel;
    console.log("total move", totalMove);
    console.log("total ratio", ratio);
    console.log("total travel", totalTravel);
    console.log("total interval", totalInterwal);
    console.log("start time", start.toLocaleTimeString());

    animationId1 = setInterval(() => {
      x2 += direction * totalMove;
      x2 <= 0 ? (direction = 1) : x2 >= boxw ? (direction = -1) : "";
      console.log("loop times");

      obstacle.current.style.left = x2 + "px";

      if (x2 <= 0 || x2 >= boxw) {
        if (bottom >= boxH) {
          console.log(
            `start: ${start.toLocaleTimeString()}, end: ${new Date().toLocaleTimeString()}`
          );
          clearInterval(animationId1);
          return;
        } else {
          bottom += totalMove;
          obstacle.current.style.bottom = bottom + "px";
        }
      }
    }, totalInterwal);

    // ball.current.style.transition = `bottom ${
    //   (duration * 0.2) / totalTravel
    // }s ease-in-out ${(duration * 0.8) / totalTravel}s, left ${
    //   (duration * 0.8) / totalTravel
    // }s ease-in-out`;

    //red ball
    // animationId = setInterval(() => {
    //   if (bottom <= boxH) {
    //     x == 0 ? (x = boxw) : x >= boxw ? (x = 0) : "";
    //     ball.current.style.left = x + "px";
    //     setTimeout(() => {
    //       if (
    //         !(
    //           bottom >=
    //           boxH +
    //             Math.floor(
    //               (ballHeight * ballWidth) / ((ballHeight + ballWidth) / 2)
    //             )
    //         )
    //       )
    //         ball.current.style.bottom = bottom + "px";
    //     }, (duration * 0.8) / totalTravel);

    //     bottom += Math.floor(
    //       (ballHeight * ballWidth) / ((ballHeight + ballWidth) / 2)
    //     );
    //   } else {
    //     console.log(
    //       `start: ${start.toLocaleTimeString()}, end: ${new Date().toLocaleTimeString()}`
    //     );
    //     clearInterval(animationId);
    //     clearInterval(animationId1);
    //   }
    // }, (duration / totalTravel) * 1000);
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
