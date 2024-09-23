import { useState } from "react";
import "./App.css";

type TPoint = {
  x: number;
  y: number;
};

function App() {
  const [points, setPoints] = useState<TPoint[]>([]);
  const [popped, setPopped] = useState<TPoint[]>([]);

  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    //record x and y where we clicked
    const { clientX, clientY } = e;

    //set points with recorded click
    setPoints([
      ...points,
      {
        x: clientX,
        y: clientY,
      },
    ]);
  }

  function handleUndo() {
    //we remove the last inserted point set
    //we can use pop()
    const newPoints = [...points];
    const poppedPoint = newPoints.pop();
    console.log(poppedPoint);
    //i want to set points without the removed point

    if (!poppedPoint) return;
    setPopped([...popped, poppedPoint]);

    setPoints(newPoints);
  }

  function handleRedo() {
    //insert back the point that we popped
    //to do that we need to store the popped elements during undo
    const newPoppedPoints = [...popped];
    const poppedPoint = newPoppedPoints.pop();
    if (!poppedPoint) return;
    setPoints([...points, poppedPoint]);
    setPopped(newPoppedPoints);
  }
  return (
    <>
      <button
        disabled={points.length === 0}
        className="updateButton"
        onClick={handleUndo}
      >
        Undo
      </button>
      <button
        disabled={popped.length === 0}
        className="updateButton"
        onClick={handleRedo}
      >
        Redo
      </button>
      <div className="App" onClick={handleClick}>
        {points.map((point, pointIndex) => (
          <div
            key={pointIndex}
            className="point"
            style={{
              left: point.x - 5 + "px",
              top: point.y - 5 + "px",
            }}
          >
            o
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
