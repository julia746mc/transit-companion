import { mockNews } from "@/data/transit";
import { Calendar, ChevronRight } from "lucide-react";

const NewsScreen = () => {
  return (
    <div className="px-5">
      <div className="pt-14 pb-4">
        <h1 className="text-2xl font-display font-bold text-foreground">Notícias</h1>
        <p className="text-sm text-muted-foreground mt-1">Novidades do transporte em SP</p>
      </div>

      <div className="space-y-4">
        {mockNews.map((news, i) => (
          <article
            key={news.id}
            className="bg-card rounded-xl p-4 transit-shadow hover:transit-shadow-lg transition-all active:scale-[0.99] cursor-pointer opacity-0 animate-fade-up"
            style={{ animationDelay: `${i * 80}ms`, animationFillMode: "forwards" }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary uppercase tracking-wider">
                {news.category}
              </span>
              <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                <Calendar size={10} />
                {news.date}
              </span>
            </div>
            <h3 className="font-semibold text-sm text-foreground leading-snug mb-1.5">{news.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{news.summary}</p>
            <div className="flex justify-end mt-3">
              <span className="flex items-center gap-1 text-xs font-medium text-primary">
                Ler mais <ChevronRight size={14} />
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default NewsScreen;
