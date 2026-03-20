import { transportOptions, TransportType } from "@/data/transit";

interface TransportSelectorProps {
  selected: TransportType | null;
  onSelect: (type: TransportType | null) => void;
}

const TransportSelector = ({ selected, onSelect }: TransportSelectorProps) => {
  return (
    <div className="flex gap-3">
      {transportOptions.map((opt) => {
        const isActive = selected === opt.type;
        return (
          <button
            key={opt.type}
            onClick={() => onSelect(isActive ? null : opt.type)}
            className={`flex-1 flex flex-col items-center gap-2 py-4 px-3 rounded-2xl border-2 transition-all duration-200 ease-out active:scale-[0.97] ${
              isActive
                ? `${opt.bgClass} text-primary-foreground border-transparent transit-shadow-lg`
                : "bg-card text-foreground border-border hover:border-primary/30 transit-shadow"
            }`}
          >
            <opt.icon size={26} strokeWidth={1.8} />
            <span className="text-sm font-semibold">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default TransportSelector;
