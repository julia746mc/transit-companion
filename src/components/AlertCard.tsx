import { Alert } from "@/data/transit";
import { transportOptions } from "@/data/transit";
import { ThumbsUp, Clock, Share2 } from "lucide-react";
import { useState } from "react";

interface AlertCardProps {
  alert: Alert;
  index: number;
}

const severityStyles = {
  ok: "border-l-status-ok bg-status-ok/5",
  warning: "border-l-status-warning bg-status-warning/5",
  critical: "border-l-status-critical bg-status-critical/5",
};

const severityDot = {
  ok: "bg-status-ok",
  warning: "bg-status-warning",
  critical: "bg-status-critical",
};

const AlertCard = ({ alert, index }: AlertCardProps) => {
  const transport = transportOptions.find((t) => t.type === alert.type);
  const [shared, setShared] = useState(false);

  const shareToTwitter = () => {
    const text = encodeURIComponent(`⚠️ ${alert.title} - ${alert.line}\n${alert.description}\n\n#LinhaCerta #TransporteSP`);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank", "width=550,height=420");
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  };

  return (
    <div
      className={`rounded-xl border-l-4 p-4 transit-shadow bg-card ${severityStyles[alert.severity]} opacity-0 animate-fade-up`}
      style={{ animationDelay: `${index * 80}ms`, animationFillMode: "forwards" }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <div className={`w-2 h-2 rounded-full ${severityDot[alert.severity]} ${alert.severity === "critical" ? "animate-pulse-dot" : ""}`} />
            {transport && (
              <span className={`text-xs font-semibold ${transport.colorClass} uppercase tracking-wider`}>
                {transport.label}
              </span>
            )}
            <span className="text-xs text-muted-foreground">•</span>
            <span className="text-xs text-muted-foreground truncate">{alert.line}</span>
          </div>
          <h3 className="font-semibold text-sm text-foreground leading-snug mb-1">
            {alert.title}
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {alert.description}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/60">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {alert.timeAgo}
          </span>
          <span>por {alert.reportedBy}</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={shareToTwitter}
            className={`flex items-center gap-1.5 text-xs font-medium transition-colors active:scale-95 ${
              shared ? "text-status-ok" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Share2 size={12} />
            <span className="hidden sm:inline">{shared ? "Compartilhado!" : "X"}</span>
          </button>
          <button className="flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors active:scale-95">
            <ThumbsUp size={13} />
            <span>{alert.confirmations}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertCard;
