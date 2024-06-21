import React, { useEffect, useRef, useState } from "react";

const Anim = () => {
  let left = 0;
  const [duration, setDuration] = useState(5);
  const [ballHeight, setBallHeight] = useState(20);
  const [ballWidth, setBallWidth] = useState(20);
  const [boxHeight, setBoxHeight] = useState(500);
  const [boxWidth, setBoxWidth] = useState(500);
  const [obstacles, setObstacles] = useState([]);
  const [obstacleLeftInput, setobstacleLeftInput] = useState(0);
  const [obstacleBottomInput, setobstacleBottomtInput] = useState(0);
  let position = 0;
  let direction = 1;
  let bottom = 0;
  const ball = useRef(null);
  let animationId = useRef(null);
  let start = new Date();

  const handleObsticalLeftChange = (e) => {
    setobstacleLeftInput(Number(e.target.value));
  };
  const handleObsticalBootmChange = (e) => {
    setobstacleBottomtInput(Number(e.target.value));
  };

  const addObstical = (e) => {
    e.preventDefault();

    if (
      obstacleLeftInput % ballHeight == 0 &&
      obstacleBottomInput % ballHeight == 0
    ) {
      setObstacles((pr) => [
        ...pr,
        { left: obstacleLeftInput, top: obstacleBottomInput },
      ]);
      // position = obstacles.length;
      setObstacles((pr) =>
        pr.sort((a, b) => {
          if (b.top === a.top) {
            return a.left - b.left; // Ascending order for 'left'
          }
          return b.top - a.top; // Descending order for 'top'
        })
      );
    } else {
      alert("Obstical Value must be modulo by ball size");
    }
  };
  const startAnimation = () => {
    clearInterval(animationId);
    if (obstacles.length >= duration) {
      alert("Duration must be grater then Obsticals");
    } else {
      start = new Date();
      anim();
    }
  };

  const stopAnimation = () => {
    clearInterval(animationId);
  };

  const resetAnimation = () => {
    position = 0;
    left = 0;
    bottom = 0;
    ball.current.style.left = `${left}px`;
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
    // calculate box height and width
    let boxH = boxHeight - ballHeight;
    let boxw = boxWidth - ballWidth;

    // calclulating total steps
    let totalMove = (ballHeight * ballWidth) / ((ballHeight + ballWidth) / 2);
    let ratio = (boxH * boxw) / ((boxH + boxw) / 2);
    let totalTravel = ratio / totalMove;
    let totalInterwal =
      (((duration - obstacles.length) / totalTravel) * 1000) / totalTravel;

    console.log("start time", start.toLocaleTimeString());

    animationId = setInterval(() => {
      left += direction * totalMove;
      left <= 0 ? (direction = 1) : left >= boxw ? (direction = -1) : "";
      let data = obstacles.filter((item) => boxH - item.top == bottom);
      if (data)
        for (let index = 0; index < data.length; index++) {
          if (
            (direction == 1 &&
              left == data[index]?.left - ballWidth &&
              bottom == boxH - data[index]?.top) ||
            (direction == -1 &&
              left == data[index]?.left + ballWidth &&
              bottom == boxH - data[index]?.top)
          ) {
            clearInterval(animationId);
            setTimeout(() => {
              // position++;
              anim();
            }, 1000);
          }
        }

      ball.current.style.left = left + "px";

      if (left <= 0 || left >= boxw) {
        if (bottom >= boxH) {
          console.log(
            `start: ${start.toLocaleTimeString()}, end: ${new Date().toLocaleTimeString()}`
          );
          clearInterval(animationId);
          return;
        } else {
          bottom += totalMove;
          ball.current.style.bottom = bottom + "px";
        }
      }
    }, totalInterwal);
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
        {obstacles.map((item, ind) => {
          return (
            <div
              key={ind}
              className="obstacle"
              style={{
                height: `${ballHeight}px`,
                width: `${ballWidth}px`,
                left: `${item?.left}px`,
                top: `${item?.top}px`,
              }}
            ></div>
          );
        })}
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
        <form action="">
          <div className="ball-helper">
            <label htmlFor="bheight">
              Obstical x:
              <input
                name="bheight"
                type="number"
                value={obstacleLeftInput}
                onChange={handleObsticalLeftChange}
                placeholder="Enter Obstical left"
              />
            </label>

            <label htmlFor="bwidth">
              Obstical y:
              <input
                name="bwidth"
                type="number"
                value={obstacleBottomInput}
                onChange={handleObsticalBootmChange}
                placeholder="Enter Obstical bottom"
              />
            </label>
            <button type="button" onClick={addObstical}>
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Anim;
