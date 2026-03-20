import { useState } from "react";
import { ArrowLeft, X } from "lucide-react";
import { transportOptions, mockLines, TransportType } from "@/data/transit";

interface ReportAlertFormProps {
  onBack: () => void;
  onSubmit: () => void;
}

const severityOptions = [
  { value: "warning" as const, label: "Atenção", description: "Lentidão, aglomeração", color: "bg-status-warning" },
  { value: "critical" as const, label: "Crítico", description: "Parado, interrompido", color: "bg-status-critical" },
];

const ReportAlertForm = ({ onBack, onSubmit }: ReportAlertFormProps) => {
  const [transportType, setTransportType] = useState<TransportType | null>(null);
  const [lineId, setLineId] = useState("");
  const [severity, setSeverity] = useState<"warning" | "critical" | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const filteredLines = mockLines.filter((l) => !transportType || l.type === transportType);

  const canSubmit = transportType && lineId && severity && title.trim().length > 3;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitted(true);
    setTimeout(onSubmit, 1500);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background max-w-md mx-auto flex items-center justify-center px-8">
        <div className="text-center opacity-0 animate-fade-up" style={{ animationFillMode: "forwards" }}>
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-xl font-display font-bold text-foreground mb-2">Alerta enviado!</h2>
          <p className="text-sm text-muted-foreground">Obrigado por contribuir. Outros passageiros poderão confirmar seu alerta.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto pb-8">
      <div className="px-5 pt-14 pb-4">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={onBack} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground active:scale-95 transition-transform">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-display font-bold text-foreground">Reportar alerta</h1>
        </div>
        <p className="text-sm text-muted-foreground">Ajude outros passageiros informando problemas em tempo real.</p>
      </div>

      <form onSubmit={handleSubmit} className="px-5 space-y-5">
        {/* Transport type */}
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">Tipo de transporte</label>
          <div className="flex gap-2">
            {transportOptions.map((opt) => (
              <button
                key={opt.type}
                type="button"
                onClick={() => { setTransportType(opt.type); setLineId(""); }}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all active:scale-95 ${
                  transportType === opt.type ? `${opt.bgClass} text-white` : "bg-card border-2 border-border text-foreground"
                }`}
              >
                <opt.icon size={16} />
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Line selection */}
        {transportType && (
          <div className="opacity-0 animate-fade-up" style={{ animationFillMode: "forwards" }}>
            <label className="text-sm font-medium text-foreground mb-2 block">Linha</label>
            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
              {filteredLines.map((line) => (
                <button
                  key={line.id}
                  type="button"
                  onClick={() => setLineId(line.id)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-left transition-all active:scale-95 ${
                    lineId === line.id ? "bg-primary/10 border-2 border-primary text-foreground" : "bg-card border-2 border-border text-foreground"
                  }`}
                >
                  <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: line.color }} />
                  <span className="truncate text-xs font-medium">{line.name.replace("Linha ", "L")}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Severity */}
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">Severidade</label>
          <div className="flex gap-3">
            {severityOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setSeverity(opt.value)}
                className={`flex-1 p-3 rounded-xl text-left transition-all active:scale-95 ${
                  severity === opt.value ? "border-2 border-primary transit-shadow-lg" : "border-2 border-border"
                } bg-card`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className={`w-3 h-3 rounded-full ${opt.color}`} />
                  <span className="text-sm font-semibold text-foreground">{opt.label}</span>
                </div>
                <p className="text-[10px] text-muted-foreground">{opt.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Title */}
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">Título do alerta</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value.slice(0, 80))}
            placeholder="Ex: Trem parado na estação Sé"
            className="w-full px-4 py-3 rounded-xl bg-card border-2 border-border text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/40 transition-colors"
          />
          <p className="text-[10px] text-muted-foreground mt-1 text-right">{title.length}/80</p>
        </div>

        {/* Description */}
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">Detalhes (opcional)</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value.slice(0, 300))}
            placeholder="Descreva a situação com mais detalhes..."
            rows={3}
            className="w-full px-4 py-3 rounded-xl bg-card border-2 border-border text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/40 transition-colors resize-none"
          />
          <p className="text-[10px] text-muted-foreground mt-1 text-right">{description.length}/300</p>
        </div>

        <button
          type="submit"
          disabled={!canSubmit}
          className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-base disabled:opacity-40 active:scale-[0.98] transition-all transit-shadow"
        >
          Enviar alerta
        </button>
      </form>
    </div>
  );
};

export default ReportAlertForm;
