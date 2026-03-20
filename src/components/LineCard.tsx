import { Line } from "@/data/transit";
import { ChevronRight } from "lucide-react";

interface LineCardProps {
  line: Line;
  index: number;
  onClick: () => void;
}

const statusBadge = {
  ok: { bg: "bg-status-ok/10", text: "text-status-ok", label: "Normal" },
  warning: { bg: "bg-status-warning/10", text: "text-status-warning", label: "Atenção" },
  critical: { bg: "bg-status-critical/10", text: "text-status-critical", label: "Crítico" },
};

const LineCard = ({ line, index, onClick }: LineCardProps) => {
  const badge = statusBadge[line.status];

  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-4 p-4 bg-card rounded-xl transit-shadow hover:transit-shadow-lg transition-all duration-200 active:scale-[0.98] opacity-0 animate-fade-up"
      style={{ animationDelay: `${index * 70}ms`, animationFillMode: "forwards" }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-display font-bold text-sm shrink-0"
        style={{ backgroundColor: line.color }}
      >
        {line.id.replace("l", "L")}
      </div>
      <div className="flex-1 text-left min-w-0">
        <h3 className="font-semibold text-sm text-foreground truncate">{line.name}</h3>
        <p className="text-xs text-muted-foreground mt-0.5 truncate">{line.statusMessage}</p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${badge.bg} ${badge.text} uppercase tracking-wider`}>
          {badge.label}
        </span>
        <ChevronRight size={16} className="text-muted-foreground" />
      </div>
    </button>
  );
};

export default LineCard;
