import { useState } from "react";
import { ArrowLeft, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import { mockLines } from "@/data/transit";

interface MetroMapScreenProps {
  onBack: () => void;
  onSelectLine: (line: typeof mockLines[0]) => void;
}

// Simplified schematic positions for SP metro/train lines
const lineSchematic: Record<string, { x1: number; y1: number; x2: number; y2: number }> = {
  l1: { x1: 50, y1: 10, x2: 50, y2: 90 },   // Azul - vertical
  l2: { x1: 20, y1: 55, x2: 80, y2: 55 },   // Verde - horizontal
  l3: { x1: 10, y1: 40, x2: 95, y2: 40 },   // Vermelha - horizontal
  l4: { x1: 15, y1: 20, x2: 55, y2: 70 },   // Amarela - diagonal
  l5: { x1: 25, y1: 60, x2: 55, y2: 95 },   // Lilás - diagonal
  l7: { x1: 45, y1: 5, x2: 45, y2: 35 },    // Rubi - vertical short
  l8: { x1: 5, y1: 35, x2: 40, y2: 35 },    // Diamante - horizontal
  l9: { x1: 15, y1: 45, x2: 40, y2: 85 },   // Esmeralda - diagonal
  l10: { x1: 55, y1: 40, x2: 80, y2: 70 },  // Turquesa - diagonal
  l11: { x1: 50, y1: 30, x2: 95, y2: 30 },  // Coral - horizontal
  l12: { x1: 55, y1: 25, x2: 90, y2: 25 },  // Safira - horizontal
  l13: { x1: 72, y1: 15, x2: 90, y2: 15 },  // Jade - short
  l15: { x1: 75, y1: 55, x2: 90, y2: 70 },  // Prata - diagonal
  lexp: { x1: 50, y1: 12, x2: 90, y2: 12 }, // Expresso - horizontal
};

// Key transfer stations with positions
const transferStations = [
  { name: "Sé", x: 50, y: 40, lines: ["l1", "l3"] },
  { name: "Luz", x: 50, y: 28, lines: ["l1", "l4", "l7", "l11"] },
  { name: "República", x: 42, y: 40, lines: ["l3", "l4"] },
  { name: "Pinheiros", x: 28, y: 52, lines: ["l4", "l9"] },
  { name: "Barra Funda", x: 35, y: 37, lines: ["l3", "l7", "l8"] },
  { name: "Ana Rosa", x: 50, y: 55, lines: ["l1", "l2"] },
  { name: "Paraíso", x: 50, y: 58, lines: ["l1", "l2"] },
  { name: "Brás", x: 58, y: 40, lines: ["l3", "l10", "l11", "l12"] },
  { name: "Tatuapé", x: 68, y: 38, lines: ["l3", "l11", "l12"] },
  { name: "Vila Prudente", x: 75, y: 55, lines: ["l2", "l15"] },
  { name: "Santo Amaro", x: 35, y: 72, lines: ["l5", "l9"] },
  { name: "Consolação", x: 38, y: 55, lines: ["l2", "l4"] },
  { name: "Tamanduateí", x: 62, y: 50, lines: ["l2", "l10"] },
  { name: "Eng. Goulart", x: 72, y: 22, lines: ["l12", "l13"] },
  { name: "Corinthians-Itaquera", x: 85, y: 38, lines: ["l3", "l11"] },
  { name: "Chácara Klabin", x: 55, y: 62, lines: ["l2", "l5"] },
  { name: "Paulista", x: 38, y: 48, lines: ["l2", "l4"] },
];

const MetroMapScreen = ({ onBack, onSelectLine }: MetroMapScreenProps) => {
  const [zoom, setZoom] = useState(1);
  const [selectedLineId, setSelectedLineId] = useState<string | null>(null);

  const handleLineClick = (lineId: string) => {
    setSelectedLineId(selectedLineId === lineId ? null : lineId);
  };

  const handleOpenLine = (lineId: string) => {
    const line = mockLines.find((l) => l.id === lineId);
    if (line) onSelectLine(line);
  };

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto">
      {/* Header */}
      <div className="px-5 pt-14 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground active:scale-95 transition-transform">
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-xl font-display font-bold text-foreground">Mapa da Rede</h1>
              <p className="text-xs text-muted-foreground">Metrô, trem e monotrilho de SP</p>
            </div>
          </div>
          <div className="flex gap-1.5">
            <button onClick={() => setZoom(Math.min(zoom + 0.25, 2))} className="w-9 h-9 rounded-lg bg-card transit-shadow flex items-center justify-center text-foreground active:scale-95">
              <ZoomIn size={16} />
            </button>
            <button onClick={() => setZoom(Math.max(zoom - 0.25, 0.75))} className="w-9 h-9 rounded-lg bg-card transit-shadow flex items-center justify-center text-foreground active:scale-95">
              <ZoomOut size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="px-3 overflow-auto" style={{ maxHeight: "calc(100vh - 200px)" }}>
        <div
          className="bg-card rounded-2xl transit-shadow p-4 transition-transform duration-300 origin-top-left"
          style={{ transform: `scale(${zoom})`, transformOrigin: "center top" }}
        >
          <svg viewBox="0 0 100 100" className="w-full" style={{ minHeight: 400 }}>
            {/* Grid background */}
            <defs>
              <pattern id="grid" width="5" height="5" patternUnits="userSpaceOnUse">
                <circle cx="2.5" cy="2.5" r="0.15" fill="hsl(var(--border))" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" rx="2" />

            {/* Lines */}
            {mockLines.map((line) => {
              const sch = lineSchematic[line.id];
              if (!sch) return null;
              const isSelected = selectedLineId === line.id;
              const isOther = selectedLineId && selectedLineId !== line.id;
              return (
                <g key={line.id}>
                  <line
                    x1={sch.x1}
                    y1={sch.y1}
                    x2={sch.x2}
                    y2={sch.y2}
                    stroke={line.color}
                    strokeWidth={isSelected ? 2.5 : 1.8}
                    strokeLinecap="round"
                    opacity={isOther ? 0.2 : 1}
                    className="cursor-pointer transition-all duration-200"
                    onClick={() => handleLineClick(line.id)}
                  />
                  {/* Line label */}
                  <text
                    x={(sch.x1 + sch.x2) / 2}
                    y={(sch.y1 + sch.y2) / 2 - 2}
                    textAnchor="middle"
                    fontSize="2.2"
                    fontWeight="600"
                    fill={line.color}
                    opacity={isOther ? 0.2 : 0.9}
                    className="pointer-events-none select-none"
                    style={{ fontFamily: "Space Grotesk, system-ui" }}
                  >
                    {line.name.replace("Linha ", "L").split(" - ")[0]}
                  </text>
                </g>
              );
            })}

            {/* Transfer stations */}
            {transferStations.map((station) => {
              const isRelevant = !selectedLineId || station.lines.includes(selectedLineId);
              return (
                <g key={station.name} opacity={isRelevant ? 1 : 0.15} className="transition-opacity duration-200">
                  <circle
                    cx={station.x}
                    cy={station.y}
                    r={1.8}
                    fill="white"
                    stroke="hsl(var(--foreground))"
                    strokeWidth="0.5"
                  />
                  <circle cx={station.x} cy={station.y} r={0.8} fill="hsl(var(--foreground))" />
                  <text
                    x={station.x + 2.5}
                    y={station.y + 0.8}
                    fontSize="1.8"
                    fill="hsl(var(--foreground))"
                    opacity={0.8}
                    className="pointer-events-none select-none"
                    style={{ fontFamily: "DM Sans, system-ui" }}
                  >
                    {station.name}
                  </text>
                </g>
              );
            })}

            {/* Status indicators */}
            {mockLines
              .filter((l) => l.status !== "ok")
              .map((line) => {
                const sch = lineSchematic[line.id];
                if (!sch) return null;
                const cx = (sch.x1 + sch.x2) / 2;
                const cy = (sch.y1 + sch.y2) / 2 + 2;
                return (
                  <g key={`status-${line.id}`}>
                    <circle
                      cx={cx}
                      cy={cy}
                      r={1.2}
                      fill={line.status === "critical" ? "hsl(var(--status-critical))" : "hsl(var(--status-warning))"}
                      className={line.status === "critical" ? "animate-pulse-dot" : ""}
                    />
                  </g>
                );
              })}
          </svg>
        </div>
      </div>

      {/* Line legend / Selected line info */}
      <div className="px-5 mt-4 pb-8">
        {selectedLineId ? (
          <div className="opacity-0 animate-fade-up" style={{ animationFillMode: "forwards" }}>
            {(() => {
              const line = mockLines.find((l) => l.id === selectedLineId);
              if (!line) return null;
              const statusLabel = line.status === "ok" ? "Normal" : line.status === "warning" ? "Atenção" : "Crítico";
              const statusColor = line.status === "ok" ? "text-status-ok" : line.status === "warning" ? "text-status-warning" : "text-status-critical";
              return (
                <div className="bg-card rounded-xl p-4 transit-shadow">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-display font-bold text-xs" style={{ backgroundColor: line.color }}>
                      {line.id.replace("l", "L")}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm text-foreground">{line.name}</h3>
                      <p className="text-xs text-muted-foreground">{line.stations.length} estações • <span className={`font-semibold ${statusColor}`}>{statusLabel}</span></p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">{line.statusMessage}</p>
                  <button
                    onClick={() => handleOpenLine(line.id)}
                    className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold active:scale-[0.98] transition-transform"
                  >
                    Ver detalhes da linha
                  </button>
                </div>
              );
            })()}
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {mockLines.slice(0, 10).map((line) => (
              <button
                key={line.id}
                onClick={() => handleLineClick(line.id)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-card transit-shadow text-xs font-medium text-foreground active:scale-95 transition-transform"
              >
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: line.color }} />
                {line.name.split(" - ")[1] || line.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MetroMapScreen;
