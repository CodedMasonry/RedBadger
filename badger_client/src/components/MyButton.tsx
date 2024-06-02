import { useState } from "react";

export default function MyButton() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div>
      <button
        className="bg-slate-800 transition-all hover:bg-cyan-800 rounded-sm p-2 text-white"
        onMouseDown={handleClick}
      >
        It's a button
      </button>

      <p>Clicks: {count}</p>
    </div>
  );
}
