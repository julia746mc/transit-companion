import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import LineCard from "@/components/LineCard";
import TransportSelector from "@/components/TransportSelector";
import { TransportType, mockLines, Line } from "@/data/transit";

interface SearchScreenProps {
  onSelectLine: (line: Line) => void;
}

const recentSearches = ["Sé", "Pinheiros", "Linha 9", "Brás"];

const SearchScreen = ({ onSelectLine }: SearchScreenProps) => {
  const [search, setSearch] = useState("");
  const [transportFilter, setTransportFilter] = useState<TransportType | null>(null);

  const filteredLines = mockLines.filter((line) => {
    const matchesTransport = !transportFilter || line.type === transportFilter;
    const matchesSearch = !search || line.name.toLowerCase().includes(search.toLowerCase()) ||
      line.stations.some((s) => s.name.toLowerCase().includes(search.toLowerCase()));
    return matchesTransport && matchesSearch;
  });

  return (
    <div className="px-5">
      <div className="pt-14 pb-4">
        <h1 className="text-2xl font-display font-bold text-foreground">Buscar</h1>
      </div>

      <div className="mb-4">
        <SearchBar value={search} onChange={setSearch} />
      </div>

      <div className="mb-5">
        <TransportSelector selected={transportFilter} onSelect={setTransportFilter} />
      </div>

      {!search && (
        <div className="mb-6 opacity-0 animate-fade-up" style={{ animationDelay: "100ms", animationFillMode: "forwards" }}>
          <h2 className="font-display font-semibold text-sm text-muted-foreground mb-3 uppercase tracking-wider">Buscas recentes</h2>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((term) => (
              <button
                key={term}
                onClick={() => setSearch(term)}
                className="px-4 py-2 rounded-full bg-card border border-border text-sm text-foreground hover:border-primary/30 transition-colors active:scale-95"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-2.5">
        {filteredLines.map((line, i) => (
          <LineCard key={line.id} line={line} index={i} onClick={() => onSelectLine(line)} />
        ))}
        {filteredLines.length === 0 && search && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-sm">Nenhum resultado para "{search}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchScreen;
