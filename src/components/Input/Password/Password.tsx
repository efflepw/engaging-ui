import "./Password.css";

import { useEffect, useRef, useState } from "react";

const Password = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [password, setPassword] = useState("password");
  const [blur, setBlur] = useState(6);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const context = canvas.getContext("2d");

    if (!context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.filter = `blur(${blur}px)`;
    context.font = "24px Montserrat";
    context.letterSpacing = "1.5px";
    context.fillText(password, 15, 25);
  }, [password, blur]);

  const onRevealClick = () => {
    setBlur(blur == 0 ? 6 : 0);
  };

  return (
    <div className="password-input-container">
      <input
        className="password-input"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
      />
      <canvas
        ref={canvasRef}
        className="password-input-canvas"
        width={260}
        height={34}
      />

      <button onClick={onRevealClick}>Reveal</button>
    </div>
  );
};

export default Password;
