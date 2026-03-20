import { useState } from "react";
import LineCard from "@/components/LineCard";
import TransportSelector from "@/components/TransportSelector";
import { TransportType, mockLines, Line } from "@/data/transit";

interface LinesScreenProps {
  onSelectLine: (line: Line) => void;
}

const LinesScreen = ({ onSelectLine }: LinesScreenProps) => {
  const [transportFilter, setTransportFilter] = useState<TransportType | null>(null);

  const filtered = mockLines.filter((l) => !transportFilter || l.type === transportFilter);

  return (
    <div className="px-5">
      <div className="pt-14 pb-4">
        <h1 className="text-2xl font-display font-bold text-foreground">Linhas</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Status em tempo real de todas as linhas
        </p>
      </div>

      <div className="mb-5">
        <TransportSelector selected={transportFilter} onSelect={setTransportFilter} />
      </div>

      <div className="space-y-2.5">
        {filtered.map((line, i) => (
          <LineCard key={line.id} line={line} index={i} onClick={() => onSelectLine(line)} />
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-sm">Nenhuma linha encontrada</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LinesScreen;
