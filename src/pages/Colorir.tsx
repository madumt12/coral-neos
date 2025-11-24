import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "../components/ui/button";

import coral1 from "../assets/desenho-coral1.png";
import coral2 from "../assets/desenho-coral2.avif";
import coral3 from "../assets/desenho-coral3.jpg";

type Tool = "brush" | "fine" | "marker" | "spray" | "eraser" | "bucket";

const FIXED_COLORS = [
  "#FF0000", // Vermelho
  "#FF7F00", // Laranja
  "#FFFF00", // Amarelo
  "#00FF00", // Verde
  "#0000FF", // Azul
  "#4B0082", // Anil
  "#8B00FF", // Violeta
  "#000000", // Preto
];

// imagens controladas apenas pelo ReefKids
const IMAGES: Record<string, string> = {
  1: coral1,
  2: coral2,
  3: coral3,
  // fallback local (opcional)
  uploaded: "/mnt/data/A_2D_digital_illustration_showcases_an_underwater_.png",
};

const Colorir: React.FC = () => {
  const [params] = useSearchParams();
  const imgId = params.get("img") ?? "1";

  const baseRef = useRef<HTMLCanvasElement | null>(null);
  const overlayRef = useRef<HTMLCanvasElement | null>(null);

  const [currentColor, setCurrentColor] = useState(FIXED_COLORS[0]);
  const [size, setSize] = useState(6);
  const [tool, setTool] = useState<Tool>("brush");
  const [isDrawing, setIsDrawing] = useState(false);
  const [scale, setScale] = useState(1);
  const [gradientActive, setGradientActive] = useState(false);

  const historyRef = useRef<ImageData[]>([]);
  const redoRef = useRef<ImageData[]>([]);

  useEffect(() => {
    const base = baseRef.current!;
    const overlay = overlayRef.current!;
    if (!base || !overlay) return;

    const bctx = base.getContext("2d")!;
    const octx = overlay.getContext("2d")!;

    const img = new Image();
    img.src = IMAGES[imgId] ?? IMAGES["1"];

    img.onload = () => {
      base.width = img.naturalWidth;
      base.height = img.naturalHeight;
      overlay.width = img.naturalWidth;
      overlay.height = img.naturalHeight;

      bctx.clearRect(0, 0, base.width, base.height);
      bctx.drawImage(img, 0, 0);

      octx.clearRect(0, 0, overlay.width, overlay.height);
      historyRef.current = [octx.getImageData(0, 0, overlay.width, overlay.height)];
      redoRef.current = [];
    };

    octx.globalCompositeOperation = "source-over";
  }, [imgId]);

  // ---------------------- HISTÓRICO ----------------------
  const pushHistory = () => {
    const overlay = overlayRef.current!;
    const octx = overlay.getContext("2d")!;
    try {
      const snap = octx.getImageData(0, 0, overlay.width, overlay.height);
      historyRef.current.push(snap);
      if (historyRef.current.length > 70) historyRef.current.shift();
      redoRef.current = [];
    } catch (e) {
      console.warn("pushHistory:", e);
    }
  };

  const handleUndo = () => {
    if (historyRef.current.length <= 1) return;
    const overlay = overlayRef.current!;
    const octx = overlay.getContext("2d")!;
    const last = historyRef.current.pop();
    if (!last) return;
    redoRef.current.push(last);
    const previous = historyRef.current[historyRef.current.length - 1];
    octx.putImageData(previous, 0, 0);
  };

  const handleRedo = () => {
    if (!redoRef.current.length) return;
    const overlay = overlayRef.current!;
    const octx = overlay.getContext("2d")!;
    const next = redoRef.current.pop()!;
    historyRef.current.push(next);
    octx.putImageData(next, 0, 0);
  };

  // ---------------------- ZOOM ----------------------
  const zoomIn = () => setScale((s) => Math.min(3, +(s + 0.1).toFixed(2)));
  const zoomOut = () => setScale((s) => Math.max(0.5, +(s - 0.1).toFixed(2)));
  const zoomReset = () => setScale(1);

  // ---------------------- CLICK POS ----------------------
  const getPointerPos = (clientX: number, clientY: number) => {
    const overlay = overlayRef.current!;
    const rect = overlay.getBoundingClientRect();
    return {
      x: Math.round((clientX - rect.left) / scale),
      y: Math.round((clientY - rect.top) / scale),
    };
  };

  // ---------------------- SPRAY ----------------------
  const doSpray = (cx: number, cy: number) => {
    const octx = overlayRef.current!.getContext("2d")!;
    const density = Math.max(12, size * 2);
    for (let i = 0; i < density; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * size;
      const x = cx + Math.cos(angle) * radius;
      const y = cy + Math.sin(angle) * radius;
      octx.fillRect(x, y, 1, 1);
    }
  };

  // ---------------------- GRADIENT HELPERS ----------------------
  const makeGradientForCtx = (ctx: CanvasRenderingContext2D) => {
    const canvas = overlayRef.current!;
    const g = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    g.addColorStop(0, "#ff0000");
    g.addColorStop(0.2, "#ff7f00");
    g.addColorStop(0.4, "#ffd300");
    g.addColorStop(0.6, "#00c2a8");
    g.addColorStop(0.8, "#3b82f6");
    g.addColorStop(1, "#8b5cf6");
    return g;
  };

  // ---------------------- BALDE (respeita linhas do base e usa gradiente se ativo) ----------------------
  const floodFillOverlay = (startX: number, startY: number) => {
    const base = baseRef.current!;
    const overlay = overlayRef.current!;
    const bctx = base.getContext("2d")!;
    const octx = overlay.getContext("2d")!;

    // read pixels
    const baseData = bctx.getImageData(0, 0, base.width, base.height);
    const overlayData = octx.getImageData(0, 0, overlay.width, overlay.height);

    const width = overlay.width;
    const height = overlay.height;
    const startIdx = (startY * width + startX) * 4;

    // detect base line: pixels escuros (ajuste thresholds se necessário)
    const isBaseLine = (idx: number) => {
      const br = baseData.data[idx];
      const bg = baseData.data[idx + 1];
      const bb = baseData.data[idx + 2];
      const ba = baseData.data[idx + 3];
      return ba > 200 && br < 100 && bg < 100 && bb < 100;
    };

    // create combined "visible" pixel for flood decision:
    // if base has line treat as wall color (unique), else use overlay pixel
    const combinedAt = (x: number, y: number) => {
      const i = (y * width + x) * 4;
      if (isBaseLine(i)) {
        return [0, 0, 0, 255]; // wall
      }
      return [overlayData.data[i], overlayData.data[i + 1], overlayData.data[i + 2], overlayData.data[i + 3]];
    };

    const target = combinedAt(startX, startY);

    // get fill color: if gradient active sample gradient at position, else use currentColor
    let fillRGBA: [number, number, number, number] = [0, 0, 0, 255];
    const fillRgb = hexToRgb(currentColor);
    if (!fillRgb) return;

    if (!gradientActive) {
      fillRGBA = [fillRgb[0], fillRgb[1], fillRgb[2], 255];
    } else {
      // sample gradient by drawing it into a temp canvas
      const temp = document.createElement("canvas");
      temp.width = width;
      temp.height = height;
      const tctx = temp.getContext("2d")!;
      const g = makeGradientForCtx(tctx);
      tctx.fillStyle = g as any;
      tctx.fillRect(0, 0, width, height);
      const sample = tctx.getImageData(startX, startY, 1, 1).data;
      fillRGBA = [sample[0], sample[1], sample[2], sample[3]];
    }

    // quick no-op
    if (target[0] === fillRGBA[0] && target[1] === fillRGBA[1] && target[2] === fillRGBA[2] && target[3] === fillRGBA[3]) return;

    // stack fill but respect base lines (walls)
    const stack: [number, number][] = [[startX, startY]];
    while (stack.length) {
      const [x, y] = stack.pop()!;
      if (x < 0 || y < 0 || x >= width || y >= height) continue;
      const idx = (y * width + x) * 4;

      // if base has line here -> wall -> skip
      if (isBaseLine(idx)) continue;

      const comb = combinedAt(x, y);
      if (comb[0] === target[0] && comb[1] === target[1] && comb[2] === target[2] && comb[3] === target[3]) {
        // write fill into overlay data
        overlayData.data[idx] = fillRGBA[0];
        overlayData.data[idx + 1] = fillRGBA[1];
        overlayData.data[idx + 2] = fillRGBA[2];
        overlayData.data[idx + 3] = fillRGBA[3];

        stack.push([x + 1, y]);
        stack.push([x - 1, y]);
        stack.push([x, y + 1]);
        stack.push([x, y - 1]);
      }
    }

    octx.putImageData(overlayData, 0, 0);
  };

  const hexToRgb = (h: string) => {
    const c = h.replace("#", "");
    if (c.length !== 6) return null;
    const num = parseInt(c, 16);
    return [(num >> 16) & 255, (num >> 8) & 255, num & 255] as [number, number, number];
  };

  // ---------------------- DESENHO ----------------------
  const applySettings = (octx: CanvasRenderingContext2D) => {
    octx.lineCap = "round";
    octx.lineJoin = "round";
    octx.globalAlpha = 1;

    switch (tool) {
      case "brush": {
        octx.globalCompositeOperation = "source-over";
        octx.lineWidth = size;
        if (gradientActive) {
          octx.strokeStyle = makeGradientForCtx(octx) as any;
        } else {
          octx.strokeStyle = currentColor;
        }
        break;
      }

      case "fine": {
        octx.globalCompositeOperation = "source-over";
        octx.lineWidth = Math.max(1, Math.round(size / 3));
        octx.strokeStyle = currentColor;
        break;
      }

      case "marker": {
        octx.globalCompositeOperation = "source-over";
        octx.lineWidth = size * 1.6;
        octx.globalAlpha = 0.35;
        octx.strokeStyle = currentColor;
        break;
      }

      case "spray": {
        octx.globalCompositeOperation = "source-over";
        octx.fillStyle = currentColor;
        break;
      }

      case "eraser": {
        octx.globalCompositeOperation = "destination-out";
        octx.lineWidth = size;
        break;
      }

      case "bucket":
        break;
    }
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    const overlay = overlayRef.current!;
    overlay.setPointerCapture(e.pointerId);

    const octx = overlay.getContext("2d")!;
    const pos = getPointerPos(e.clientX, e.clientY);

    pushHistory();

    if (tool === "bucket") {
      floodFillOverlay(pos.x, pos.y);
      return;
    }

    applySettings(octx);

    if (tool === "spray") {
      doSpray(pos.x, pos.y);
    } else {
      octx.beginPath();
      octx.moveTo(pos.x, pos.y);
    }

    setIsDrawing(true);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDrawing) return;
    const octx = overlayRef.current!.getContext("2d")!;
    const pos = getPointerPos(e.clientX, e.clientY);

    if (tool === "spray") {
      doSpray(pos.x, pos.y);
      return;
    }

    octx.lineTo(pos.x, pos.y);
    octx.stroke();
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    const overlay = overlayRef.current!;
    const octx = overlay.getContext("2d")!;

    if (isDrawing) {
      octx.closePath();
      setIsDrawing(false);
      pushHistory();
    }

    try {
      overlay.releasePointerCapture(e.pointerId);
    } catch {}
  };

  // ---------------------- SALVAR ----------------------
  const handleSave = () => {
    const base = baseRef.current!;
    const overlay = overlayRef.current!;

    const final = document.createElement("canvas");
    final.width = base.width;
    final.height = base.height;

    const ctx = final.getContext("2d")!;
    ctx.drawImage(base, 0, 0);
    ctx.drawImage(overlay, 0, 0);

    const a = document.createElement("a");
    a.download = "colorir.png";
    a.href = final.toDataURL();
    a.click();
  };

  const handleReset = () => {
    const overlay = overlayRef.current!;
    const octx = overlay.getContext("2d")!;
    octx.clearRect(0, 0, overlay.width, overlay.height);
    historyRef.current = [octx.getImageData(0, 0, overlay.width, overlay.height)];
    redoRef.current = [];
  };

  // ---------------------- TRAÇO (AUMENTAR/ DIMINUIR) ----------------------
  const increaseSize = () => setSize((s) => Math.min(200, s + 2));
  const decreaseSize = () => setSize((s) => Math.max(1, s - 2));
  const setSizeFromInput = (v: number) => setSize(Math.max(1, Math.min(200, v)));
  

  // ---------------------- GRADIENT TOGGLE ----------------------
  const toggleGradient = () => setGradientActive((g) => !g);

  // ----------------------------------------------------

  return (
    <div className="min-h-screen px-4 py-10 max-w-6xl mx-auto text-center">
      <h1 className="text-4xl font-bold text-primary mb-6">🎨 Colorir Coral</h1>

      {/* TOOLS */}
      <div className="flex flex-wrap justify-center gap-3 mb-4">
        {FIXED_COLORS.map((c) => (
          <button
            key={c}
            onClick={() => {
              setCurrentColor(c);
              setGradientActive(false);
            }}
            className={`w-8 h-8 rounded-full border ${currentColor === c && !gradientActive ? "ring-4 ring-black" : ""}`}
            style={{ backgroundColor: c }}
          />
        ))}
        <button
          onClick={() => setGradientActive(true)}
          className={`px-3 py-1 rounded ${gradientActive ? "ring-4 ring-primary" : "bg-gray-200"}`}
        >
          Gradiente
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-6 items-center">
        <div className="flex items-center gap-2">
          <Button onClick={decreaseSize}>−</Button>
          <input
            type="range"
            min={1}
            max={200}
            value={size}
            onChange={(e) => setSizeFromInput(Number(e.target.value))}
            className="w-48"
          />
          <Button onClick={increaseSize}>+</Button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm">Tamanho: {size}px</span>
          <Button onClick={toggleGradient} className={gradientActive ? "bg-indigo-600 text-white" : ""}>
            {gradientActive ? "Gradiente: ON" : "Gradiente: OFF"}
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-6">
        <Button onClick={() => setTool("brush")} className={tool === "brush" ? "bg-primary" : ""}>Pincel</Button>
        <Button onClick={() => setTool("fine")} className={tool === "fine" ? "bg-primary" : ""}>Caneta fina</Button>
        <Button onClick={() => setTool("marker")} className={tool === "marker" ? "bg-primary" : ""}>Marca-texto</Button>
        <Button onClick={() => setTool("spray")} className={tool === "spray" ? "bg-primary" : ""}>Spray</Button>
        <Button onClick={() => setTool("eraser")} className={tool === "eraser" ? "bg-red-400" : ""}>Borracha</Button>
        <Button onClick={() => setTool("bucket")} className={tool === "bucket" ? "bg-yellow-300" : ""}>Balde</Button>
      </div>

      {/* CONTROLS */}
      <div className="flex flex-wrap justify-center gap-3 mb-4">
        <Button onClick={handleUndo}>↩ Desfazer</Button>
        <Button onClick={handleRedo}>↪ Refazer</Button>
        <Button onClick={zoomIn}>➕ Zoom</Button>
        <Button onClick={zoomOut}>➖ Zoom</Button>
        <Button onClick={zoomReset}>🔄 Reset Zoom</Button>
        <Button onClick={handleSave} className="bg-green-600">💾 Salvar</Button>
        <Button onClick={handleReset} className="bg-red-500">Reset</Button>
      </div>

      {/* DESENHO — ZOOM SAFE */}
      <div
        className="relative mx-auto border rounded-lg shadow-lg bg-white"
        style={{
          width: "100%",
          maxWidth: "900px",
          height: "auto",
          overflow: "auto",
          padding: "8px",
        }}
      >
        <div
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            width: "fit-content",
          }}
        >
          <canvas ref={baseRef} style={{ position: "absolute", zIndex: 1 }} />
          <canvas
            ref={overlayRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            style={{ position: "relative", zIndex: 2 }}
          />
        </div>
      </div>
    </div>
  );
};

export default Colorir;
