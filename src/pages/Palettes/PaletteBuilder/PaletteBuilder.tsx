import { useEffect, useRef, useState } from "react";
import { Palette } from "../../../utils/palette";

const rainbowPalette = new Palette([
  "#ff0000",
  "#ffff00",
  "#00ff00",
  "#00ffff",
  "#0000ff",
  "#ff00ff",
  "#ff0000",
]);

const whitePalette = new Palette(["#fff", "#ffffff00"], 180);

const WIDTH = 196;
const HEIGHT = 128;

const PaletteBuilder = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selected, setSelected] = useState<number | null>(null);

  // const [colorAlpha, setColorAlpha] = useState<number>(256);
  // const [gradientColor, setGradientColor] = useState<number | null>(null);
  // const [selectedColor, setSelectedColor] = useState<number | null>(null);

  const [colors, setColors] = useState<string[]>(["#fff", "#cb95fd", "#000"]);
  const [angle] = useState<number>(90);

  const palette = new Palette(colors, angle);

  const addColor = () => {
    setColors((colors) => [...colors, "#fff"]);
    setSelected(null);
  };

  // const updateColor = (newColor: string) => {
  //   setColors((colors) => colors.map((c, i) => (i == selected ? newColor : c)));
  //   setSelected(null);
  // };

  const selectColor = (i: number) => {
    setSelected((selected) => (i == selected ? null : i));
  };

  const deleteColor = (i: number) => {
    if (colors.length > 2) {
      setColors((colors) => colors.filter((_, index) => index !== i));
      setSelected(null);
    }
  };

  const drawGradient = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    const colorGradient = ctx.createLinearGradient(0, 0, WIDTH, 0);
    colorGradient.addColorStop(0, "white");
    colorGradient.addColorStop(1, "red");
    ctx.fillStyle = colorGradient;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    const blackGradient = ctx.createLinearGradient(0, 0, 0, HEIGHT);
    blackGradient.addColorStop(0, "transparent");
    blackGradient.addColorStop(1, "black");
    ctx.fillStyle = blackGradient;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
  };

  useEffect(() => {
    if (canvasRef.current) {
      drawGradient(canvasRef.current);
    }
  }, []);

  return (
    <div>
      <div className="py-8 flex gap-8 justify-between">
        <div className="flex gap-4 flex-wrap">
          {colors.map((color, i) => (
            <div className="flex flex-col gap-2 h-32">
              <div
                className={`w-10 rounded-lg border-2 cursor-pointer flex-1 ${
                  selected == i ? "border-black" : "border-[#fff8]"
                }`}
                style={{ backgroundColor: color }}
                onClick={() => selectColor(i)}
              ></div>
              <div
                className={`w-10 h-10 border-2 border-white rounded-lg flex justify-center items-center`}
                onClick={() => deleteColor(i)}
              >
                <span className="rotate-[45deg] text-white text-4xl cursor-pointer">
                  +
                </span>
              </div>
            </div>
          ))}
          <div
            className="flex justify-center items-center w-10 h-32 border-2 rounded-lg cursor-pointer text-4xl text-white border-white"
            onClick={addColor}
          >
            <span>+</span>
          </div>
        </div>
        <div className="flex gap-4">
          <div
            className="w-32 h-32 rounded-lg"
            style={{ backgroundColor: selected ? colors[selected] : "#fff" }}
          ></div>
          <canvas className="w-48 h-32 rounded-lg " ref={canvasRef}></canvas>
          <div
            className="w-10 h-32 rounded-lg"
            style={{ background: rainbowPalette.getLinearGradient() }}
          ></div>
          <div
            className="w-10 h-32 rounded-lg"
            style={{
              background: `${whitePalette.getLinearGradient()}`,
            }}
          ></div>
        </div>
      </div>
      <div className="flex gap-4">
        <div
          className="h-32 rounded-lg flex-1"
          style={{
            background: `${palette.getLinearGradient()}`,
          }}
        ></div>
        <div className="w-32 h-32 bg-white rounded-lg flex justify-center items-center">
          <div className="flex justify-center items-center w-28 h-28 border-2 border-black rounded-full border-dashed">
            <span className="text-black text-4xl select-none">{angle}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaletteBuilder;
