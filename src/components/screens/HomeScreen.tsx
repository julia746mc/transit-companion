import { useState } from "react";
import { Bell, ChevronRight, MapPin } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import TransportSelector from "@/components/TransportSelector";
import AlertCard from "@/components/AlertCard";
import LineCard from "@/components/LineCard";
import { TransportType, mockAlerts, mockLines, Line } from "@/data/transit";

interface HomeScreenProps {
  onViewAlerts: () => void;
  onSelectLine: (line: Line) => void;
}

const HomeScreen = ({ onViewAlerts, onSelectLine }: HomeScreenProps) => {
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
          <button
            onClick={onViewAlerts}
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

      {/* Search */}
      <div className="mb-5 opacity-0 animate-fade-up" style={{ animationDelay: "100ms", animationFillMode: "forwards" }}>
        <SearchBar value={search} onChange={setSearch} />
      </div>

      {/* Transport selector */}
      <div className="mb-6 opacity-0 animate-fade-up" style={{ animationDelay: "200ms", animationFillMode: "forwards" }}>
        <TransportSelector selected={transportFilter} onSelect={setTransportFilter} />
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
          {mockLines.slice(0, 2).map((line, i) => (
            <LineCard key={line.id} line={line} index={i} onClick={() => onSelectLine(line)} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
