import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

const SearchBar = ({ value, onChange, placeholder = "Buscar linha, estação ou rota..." }: SearchBarProps) => {
  const [focused, setFocused] = useState(false);

  return (
    <div
      className={`flex items-center gap-3 bg-card rounded-2xl px-4 py-3.5 border-2 transition-all duration-200 transit-shadow ${
        focused ? "border-primary/40 transit-shadow-lg" : "border-transparent"
      }`}
    >
      <Search size={20} className="text-muted-foreground shrink-0" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
      />
      <button className="shrink-0 w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors active:scale-95">
        <SlidersHorizontal size={16} />
      </button>
    </div>
  );
};

export default SearchBar;
