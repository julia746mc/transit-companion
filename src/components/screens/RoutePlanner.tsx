import { useState } from "react";
import { ArrowLeft, ArrowUpDown, Clock, ArrowRight, Footprints } from "lucide-react";
import { allStations, mockRouteResults, RouteResult } from "@/data/transit";

interface RoutePlannerProps {
  onBack: () => void;
}

const RoutePlanner = ({ onBack }: RoutePlannerProps) => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [originSuggestions, setOriginSuggestions] = useState<string[]>([]);
  const [destSuggestions, setDestSuggestions] = useState<string[]>([]);
  const [focusedField, setFocusedField] = useState<"origin" | "dest" | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<RouteResult | null>(null);

  const filterStations = (query: string) =>
    query.length > 1
      ? allStations.filter((s) => s.toLowerCase().includes(query.toLowerCase())).slice(0, 5)
      : [];

  const handleOriginChange = (val: string) => {
    setOrigin(val);
    setOriginSuggestions(filterStations(val));
    setShowResults(false);
  };

  const handleDestChange = (val: string) => {
    setDestination(val);
    setDestSuggestions(filterStations(val));
    setShowResults(false);
  };

  const swap = () => {
    setOrigin(destination);
    setDestination(origin);
    setShowResults(false);
  };

  const search = () => {
    if (origin && destination) {
      setShowResults(true);
      setOriginSuggestions([]);
      setDestSuggestions([]);
      setFocusedField(null);
    }
  };

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto pb-24">
      {/* Header */}
      <div className="bg-primary px-5 pt-14 pb-8 rounded-b-3xl">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={onBack} className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center text-primary-foreground active:scale-95 transition-transform">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-display font-bold text-primary-foreground">Planejar rota</h1>
        </div>

        <div className="relative">
          {/* Origin */}
          <div className="relative mb-3">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-status-ok border-2 border-primary-foreground" />
            <input
              type="text"
              value={origin}
              onChange={(e) => handleOriginChange(e.target.value)}
              onFocus={() => setFocusedField("origin")}
              placeholder="Estação de origem"
              className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-primary-foreground/15 text-primary-foreground placeholder:text-primary-foreground/50 text-sm outline-none border-2 border-transparent focus:border-primary-foreground/30 transition-colors"
            />
          </div>

          {/* Destination */}
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-3 h-3 rounded-sm bg-accent border-2 border-primary-foreground" />
            <input
              type="text"
              value={destination}
              onChange={(e) => handleDestChange(e.target.value)}
              onFocus={() => setFocusedField("dest")}
              placeholder="Estação de destino"
              className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-primary-foreground/15 text-primary-foreground placeholder:text-primary-foreground/50 text-sm outline-none border-2 border-transparent focus:border-primary-foreground/30 transition-colors"
            />
          </div>

          {/* Swap button */}
          <button
            onClick={swap}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary-foreground text-primary flex items-center justify-center active:scale-95 transition-transform transit-shadow"
          >
            <ArrowUpDown size={18} />
          </button>

          {/* Dotted line between inputs */}
          <div className="absolute left-[22px] top-[48px] h-[12px] border-l-2 border-dashed border-primary-foreground/40" />
        </div>

        <button
          onClick={search}
          disabled={!origin || !destination}
          className="w-full mt-4 py-3.5 rounded-xl bg-primary-foreground text-primary font-semibold text-sm disabled:opacity-40 active:scale-[0.98] transition-all transit-shadow"
        >
          Buscar rotas
        </button>
      </div>

      {/* Suggestions */}
      {focusedField === "origin" && originSuggestions.length > 0 && (
        <div className="px-5 mt-2">
          <div className="bg-card rounded-xl transit-shadow border border-border overflow-hidden">
            {originSuggestions.map((s) => (
              <button key={s} onClick={() => { setOrigin(s); setOriginSuggestions([]); }} className="w-full text-left px-4 py-3 text-sm text-foreground hover:bg-secondary transition-colors border-b border-border last:border-0 active:scale-[0.99]">
                {s}
              </button>
            ))}
          </div>
        </div>
      )}
      {focusedField === "dest" && destSuggestions.length > 0 && (
        <div className="px-5 mt-2">
          <div className="bg-card rounded-xl transit-shadow border border-border overflow-hidden">
            {destSuggestions.map((s) => (
              <button key={s} onClick={() => { setDestination(s); setDestSuggestions([]); }} className="w-full text-left px-4 py-3 text-sm text-foreground hover:bg-secondary transition-colors border-b border-border last:border-0 active:scale-[0.99]">
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Route Results */}
      {showResults && !selectedRoute && (
        <div className="px-5 mt-5">
          <h2 className="font-display font-semibold text-base text-foreground mb-3">Rotas viáveis</h2>
          <div className="space-y-3">
            {mockRouteResults.map((route, i) => (
              <button
                key={route.id}
                onClick={() => setSelectedRoute(route)}
                className="w-full bg-card rounded-xl p-4 transit-shadow hover:transit-shadow-lg transition-all active:scale-[0.98] text-left opacity-0 animate-fade-up"
                style={{ animationDelay: `${i * 80}ms`, animationFillMode: "forwards" }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-muted-foreground" />
                    <span className="font-display font-bold text-lg text-foreground">{route.duration}</span>
                  </div>
                  <span className="text-sm font-medium text-accent">{route.fare}</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-muted-foreground">{route.departureTime}</span>
                  <ArrowRight size={12} className="text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{route.arrivalTime}</span>
                  <span className="text-xs text-muted-foreground ml-auto">{route.transfers} baldeação(ões)</span>
                </div>
                <div className="flex items-center gap-1">
                  {route.steps.map((step, j) => (
                    <div key={j} className="flex items-center gap-1">
                      <div className="h-2 rounded-full flex-1 min-w-[30px]" style={{ backgroundColor: step.lineColor, width: `${step.stations * 8}px` }} />
                      {j < route.steps.length - 1 && (
                        <Footprints size={10} className="text-muted-foreground mx-0.5" />
                      )}
                    </div>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Route Detail */}
      {selectedRoute && (
        <div className="px-5 mt-5">
          <button onClick={() => setSelectedRoute(null)} className="text-sm text-primary font-medium mb-4 flex items-center gap-1 active:scale-95">
            <ArrowLeft size={14} /> Voltar às rotas
          </button>
          <div className="bg-card rounded-xl p-5 transit-shadow">
            <div className="flex items-center justify-between mb-4">
              <span className="font-display font-bold text-xl text-foreground">{selectedRoute.duration}</span>
              <span className="text-sm font-medium text-accent">{selectedRoute.fare}</span>
            </div>
            <div className="space-y-0">
              {selectedRoute.steps.map((step, i) => (
                <div key={i} className="opacity-0 animate-fade-up" style={{ animationDelay: `${i * 100}ms`, animationFillMode: "forwards" }}>
                  {/* Step start */}
                  <div className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-4 h-4 rounded-full border-[3px]" style={{ borderColor: step.lineColor }} />
                      <div className="w-0.5 h-12" style={{ backgroundColor: step.lineColor }} />
                    </div>
                    <div className="pt-0">
                      <p className="text-sm font-semibold text-foreground">{step.from}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        <span className="font-medium" style={{ color: step.lineColor }}>{step.line}</span> • {step.stations} estações • {step.duration}
                      </p>
                    </div>
                  </div>
                  {/* Transfer or end */}
                  {i < selectedRoute.steps.length - 1 && (
                    <div className="flex items-center gap-3 py-2">
                      <div className="flex flex-col items-center">
                        <div className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center">
                          <Footprints size={11} className="text-muted-foreground" />
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">Baldeação em {step.to}</p>
                    </div>
                  )}
                  {i === selectedRoute.steps.length - 1 && (
                    <div className="flex items-start gap-3">
                      <div className="w-4 h-4 rounded-sm border-[3px]" style={{ borderColor: step.lineColor }} />
                      <p className="text-sm font-semibold text-foreground">{step.to}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoutePlanner;
