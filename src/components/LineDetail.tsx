import { Line } from "@/data/transit";
import { ArrowLeft, Share2, Bell } from "lucide-react";

interface LineDetailProps {
  line: Line;
  onBack: () => void;
}

const statusColor = {
  ok: "bg-status-ok",
  warning: "bg-status-warning",
  critical: "bg-status-critical",
};

const LineDetail = ({ line, onBack }: LineDetailProps) => {
  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div
        className="relative px-5 pt-14 pb-6"
        style={{ backgroundColor: line.color }}
      >
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white active:scale-95 transition-transform"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white active:scale-95 transition-transform">
              <Bell size={18} />
            </button>
            <button className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white active:scale-95 transition-transform">
              <Share2 size={18} />
            </button>
          </div>
        </div>
        <h1 className="text-white font-display font-bold text-xl leading-tight">{line.name}</h1>
        <p className="text-white/80 text-sm mt-1">{line.stations.length} estações</p>
      </div>

      {/* Status Banner */}
      <div className="px-5 -mt-3">
        <div className={`flex items-center gap-3 p-4 rounded-xl text-white ${statusColor[line.status]}`}>
          <div className="w-2.5 h-2.5 rounded-full bg-white/80 animate-pulse-dot" />
          <span className="text-sm font-medium">{line.statusMessage}</span>
        </div>
      </div>

      {/* Stations */}
      <div className="px-5 mt-6">
        <h2 className="font-display font-semibold text-base text-foreground mb-4">Estações</h2>
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-[15px] top-4 bottom-4 w-0.5 rounded-full"
            style={{ backgroundColor: line.color }}
          />

          <div className="space-y-0">
            {line.stations.map((station, i) => (
              <div
                key={station.name}
                className="flex items-start gap-4 py-3 opacity-0 animate-fade-up"
                style={{ animationDelay: `${i * 40 + 200}ms`, animationFillMode: "forwards" }}
              >
                {/* Station dot */}
                <div className="relative z-10 shrink-0">
                  <div
                    className={`w-[30px] h-[30px] rounded-full border-[3px] flex items-center justify-center ${
                      station.isTransfer ? "bg-white" : "bg-white"
                    }`}
                    style={{ borderColor: line.color }}
                  >
                    {station.isTransfer && (
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: line.color }} />
                    )}
                  </div>
                </div>

                {/* Station info */}
                <div className="pt-1">
                  <span className={`text-sm ${station.isTransfer ? "font-semibold text-foreground" : "text-foreground/80"}`}>
                    {station.name}
                  </span>
                  {station.isTransfer && station.transferLines && (
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {station.transferLines.map((tl) => (
                        <span
                          key={tl}
                          className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground"
                        >
                          {tl}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LineDetail;
