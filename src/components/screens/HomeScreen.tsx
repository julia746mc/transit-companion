import { useState } from "react";
import { Bell, ChevronRight, Route, Newspaper, Map, Twitter } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import TransportSelector from "@/components/TransportSelector";
import AlertCard from "@/components/AlertCard";
import LineCard from "@/components/LineCard";
import { TransportType, mockAlerts, mockLines, Line } from "@/data/transit";

interface HomeScreenProps {
  onViewAlerts: () => void;
  onSelectLine: (line: Line) => void;
  onOpenRoutePlanner: () => void;
  onOpenNotifications: () => void;
  onOpenNews: () => void;
  onOpenMetroMap: () => void;
  onOpenTwitterFeed: () => void;
}

const HomeScreen = ({ onViewAlerts, onSelectLine, onOpenRoutePlanner, onOpenNotifications, onOpenNews, onOpenMetroMap, onOpenTwitterFeed }: HomeScreenProps) => {
  const [search, setSearch] = useState("");
  const [transportFilter, setTransportFilter] = useState<TransportType | null>(null);

  const filteredAlerts = mockAlerts
    .filter((a) => !transportFilter || a.type === transportFilter)
    .slice(0, 3);

  const criticalCount = mockAlerts.filter((a) => a.severity === "critical").length;

  return (
    <div className="px-5">
      {/* Header */}
      <div className="pt-14 pb-4">
        <div className="flex items-center justify-between mb-1">
          <div>
            <p className="text-sm text-muted-foreground">Bom dia 👋</p>
            <h1 className="text-2xl font-display font-bold text-foreground mt-0.5 leading-none">
              Linha Certa
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenNotifications}
              className="relative w-11 h-11 rounded-xl bg-card transit-shadow flex items-center justify-center text-foreground hover:transit-shadow-lg transition-all active:scale-95"
            >
              <Bell size={20} />
              {criticalCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center animate-pulse-dot">
                  {criticalCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-5 opacity-0 animate-fade-up" style={{ animationDelay: "100ms", animationFillMode: "forwards" }}>
        <SearchBar value={search} onChange={setSearch} />
      </div>

      {/* Transport selector */}
      <div className="mb-5 opacity-0 animate-fade-up" style={{ animationDelay: "200ms", animationFillMode: "forwards" }}>
        <TransportSelector selected={transportFilter} onSelect={setTransportFilter} />
      </div>

      {/* Quick actions - 2x2 grid */}
      <div className="grid grid-cols-2 gap-3 mb-6 opacity-0 animate-fade-up" style={{ animationDelay: "280ms", animationFillMode: "forwards" }}>
        <button
          onClick={onOpenRoutePlanner}
          className="flex items-center gap-3 p-4 bg-primary text-primary-foreground rounded-xl transit-shadow-lg active:scale-[0.98] transition-transform"
        >
          <Route size={20} />
          <div className="text-left">
            <p className="text-sm font-semibold">Planejar rota</p>
            <p className="text-[10px] opacity-70">Origem → Destino</p>
          </div>
        </button>
        <button
          onClick={onOpenMetroMap}
          className="flex items-center gap-3 p-4 bg-transit-metro text-primary-foreground rounded-xl transit-shadow-lg active:scale-[0.98] transition-transform"
        >
          <Map size={20} />
          <div className="text-left">
            <p className="text-sm font-semibold">Mapa</p>
            <p className="text-[10px] opacity-70">Rede completa</p>
          </div>
        </button>
        <button
          onClick={onOpenTwitterFeed}
          className="flex items-center gap-3 p-4 bg-card text-foreground rounded-xl transit-shadow border-2 border-border active:scale-[0.98] transition-transform"
        >
          <Twitter size={20} className="text-muted-foreground" />
          <div className="text-left">
            <p className="text-sm font-semibold">Feed X</p>
            <p className="text-[10px] text-muted-foreground">Tempo real</p>
          </div>
        </button>
        <button
          onClick={onOpenNews}
          className="flex items-center gap-3 p-4 bg-card text-foreground rounded-xl transit-shadow border-2 border-border active:scale-[0.98] transition-transform"
        >
          <Newspaper size={20} className="text-muted-foreground" />
          <div className="text-left">
            <p className="text-sm font-semibold">Notícias</p>
            <p className="text-[10px] text-muted-foreground">Novidades SP</p>
          </div>
        </button>
      </div>

      {/* Recent alerts */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display font-semibold text-base text-foreground">Alertas recentes</h2>
          <button
            onClick={onViewAlerts}
            className="flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors active:scale-95"
          >
            Ver todos <ChevronRight size={14} />
          </button>
        </div>
        <div className="space-y-3">
          {filteredAlerts.map((alert, i) => (
            <AlertCard key={alert.id} alert={alert} index={i} />
          ))}
        </div>
      </div>

      {/* Quick lines */}
      <div className="mb-6">
        <h2 className="font-display font-semibold text-base text-foreground mb-3">Linhas favoritas</h2>
        <div className="space-y-2.5">
          {mockLines.slice(0, 3).map((line, i) => (
            <LineCard key={line.id} line={line} index={i} onClick={() => onSelectLine(line)} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
