import { useState } from "react";
import AlertCard from "@/components/AlertCard";
import { mockAlerts, TransportType, transportOptions } from "@/data/transit";

interface AlertsScreenProps {
  onReportAlert: () => void;
}

const AlertsScreen = ({ onReportAlert }: AlertsScreenProps) => {
  const [filter, setFilter] = useState<TransportType | null>(null);

  const filtered = mockAlerts.filter((a) => !filter || a.type === filter);

  return (
    <div className="px-5">
      <div className="pt-14 pb-4">
        <h1 className="text-2xl font-display font-bold text-foreground">Alertas</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Informações em tempo real pela comunidade
        </p>
      </div>

      {/* Filter chips */}
      <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
        <button
          onClick={() => setFilter(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium shrink-0 transition-all active:scale-95 ${
            !filter
              ? "bg-primary text-primary-foreground"
              : "bg-card border border-border text-foreground hover:border-primary/30"
          }`}
        >
          Todos
        </button>
        {transportOptions.map((opt) => (
          <button
            key={opt.type}
            onClick={() => setFilter(filter === opt.type ? null : opt.type)}
            className={`px-4 py-2 rounded-full text-sm font-medium shrink-0 transition-all active:scale-95 flex items-center gap-2 ${
              filter === opt.type
                ? `${opt.bgClass} text-white`
                : "bg-card border border-border text-foreground hover:border-primary/30"
            }`}
          >
            <opt.icon size={14} />
            {opt.label}
          </button>
        ))}
      </div>

      {/* Alert report button */}
      <button
        onClick={onReportAlert}
        className="w-full mb-5 py-3.5 rounded-xl bg-accent text-accent-foreground font-semibold text-sm transit-shadow hover:transit-shadow-lg transition-all active:scale-[0.98]"
      >
        + Reportar alerta
      </button>

      <div className="space-y-3">
        {filtered.map((alert, i) => (
          <AlertCard key={alert.id} alert={alert} index={i} />
        ))}
      </div>
    </div>
  );
};

export default AlertsScreen;
