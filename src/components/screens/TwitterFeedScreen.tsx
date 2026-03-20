import { useState } from "react";
import { ArrowLeft, RefreshCw, Heart, MessageCircle, Repeat2, ExternalLink } from "lucide-react";

interface TwitterFeedScreenProps {
  onBack: () => void;
}

interface Tweet {
  id: string;
  author: string;
  handle: string;
  avatar: string;
  content: string;
  time: string;
  likes: number;
  retweets: number;
  replies: number;
  isVerified?: boolean;
}

const mockTweets: Tweet[] = [
  {
    id: "tw1",
    author: "CPTM Oficial",
    handle: "@ABORDO_CPTM",
    avatar: "CP",
    content: "🚆 Linha 9-Esmeralda: Operação normal em toda a extensão. Intervalo médio de 6 minutos. #CPTM #TransporteSP",
    time: "5 min",
    likes: 23,
    retweets: 8,
    replies: 4,
    isVerified: true,
  },
  {
    id: "tw2",
    author: "Metrô SP",
    handle: "@metabordo",
    avatar: "MS",
    content: "⚠️ Linha 3-Vermelha: Velocidade reduzida entre as estações Sé e Brás devido a manutenção corretiva. Previsão de normalização: 30 min. #MetroSP",
    time: "12 min",
    likes: 45,
    retweets: 67,
    replies: 22,
    isVerified: true,
  },
  {
    id: "tw3",
    author: "SPTrans",
    handle: "@sabordo",
    avatar: "ST",
    content: "🚌 Desvio temporário na região da Av. Paulista. Linhas 8700, 917H e 875A com itinerário alterado. Consulte o app para rotas alternativas.",
    time: "20 min",
    likes: 12,
    retweets: 31,
    replies: 8,
    isVerified: true,
  },
  {
    id: "tw4",
    author: "Ricardo M.",
    handle: "@ricardom_sp",
    avatar: "RM",
    content: "Linha 11 parada em Guaianases há 15 min. Pessoal saindo do trem e indo pro ponto de ônibus. Tá complicado hoje! 😤 #TransporteSP #CPTM",
    time: "25 min",
    likes: 89,
    retweets: 42,
    replies: 15,
  },
  {
    id: "tw5",
    author: "Transporte SP",
    handle: "@transportesp",
    avatar: "TS",
    content: "📢 Nova estação da Linha 2-Verde será inaugurada em 2027! A estação Vila Formosa vai conectar o bairro à rede de metrô. #ExpansaoMetro #SP",
    time: "1h",
    likes: 234,
    retweets: 112,
    replies: 45,
    isVerified: true,
  },
  {
    id: "tw6",
    author: "Camila S.",
    handle: "@camilatransit",
    avatar: "CS",
    content: "Faria Lima LOTADA no sentido Luz agora. Se puder, evite o horário entre 8h e 9h30 pela Linha 4. #DicaTransporte",
    time: "35 min",
    likes: 56,
    retweets: 23,
    replies: 7,
  },
];

const TwitterFeedScreen = ({ onBack }: TwitterFeedScreenProps) => {
  const [tweets] = useState(mockTweets);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto pb-8">
      {/* Header */}
      <div className="px-5 pt-14 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground active:scale-95 transition-transform">
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-xl font-display font-bold text-foreground">Feed X / Twitter</h1>
              <p className="text-xs text-muted-foreground">Transporte em tempo real</p>
            </div>
          </div>
          <button
            onClick={refresh}
            className={`w-10 h-10 rounded-xl bg-card transit-shadow flex items-center justify-center text-foreground active:scale-95 transition-all ${isRefreshing ? "animate-spin" : ""}`}
          >
            <RefreshCw size={18} />
          </button>
        </div>
      </div>

      {/* Hashtag filters */}
      <div className="px-5 mb-4 flex gap-2 overflow-x-auto pb-1">
        {["#TransporteSP", "#MetroSP", "#CPTM", "#SPTrans"].map((tag) => (
          <button key={tag} className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold shrink-0 active:scale-95 transition-transform">
            {tag}
          </button>
        ))}
      </div>

      {/* Info banner */}
      <div className="px-5 mb-4">
        <div className="p-3 rounded-xl bg-accent/10 border border-accent/20">
          <p className="text-xs text-accent-foreground">
            <span className="font-semibold">💡 Dica:</span> Conecte sua conta X para ver tweets personalizados e compartilhar alertas diretamente.
          </p>
        </div>
      </div>

      {/* Tweets */}
      <div className="px-5 space-y-3">
        {tweets.map((tweet, i) => (
          <div
            key={tweet.id}
            className="bg-card rounded-xl p-4 transit-shadow opacity-0 animate-fade-up"
            style={{ animationDelay: `${i * 70}ms`, animationFillMode: "forwards" }}
          >
            {/* Author */}
            <div className="flex items-start gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-display font-bold text-xs shrink-0">
                {tweet.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-semibold text-foreground truncate">{tweet.author}</span>
                  {tweet.isVerified && (
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-primary shrink-0" fill="currentColor">
                      <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z" />
                    </svg>
                  )}
                </div>
                <span className="text-xs text-muted-foreground">{tweet.handle} • {tweet.time}</span>
              </div>
            </div>

            {/* Content */}
            <p className="text-sm text-foreground leading-relaxed mb-3">{tweet.content}</p>

            {/* Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-border/40">
              <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors active:scale-95">
                <MessageCircle size={14} />
                <span>{tweet.replies}</span>
              </button>
              <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-status-ok transition-colors active:scale-95">
                <Repeat2 size={14} />
                <span>{tweet.retweets}</span>
              </button>
              <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive transition-colors active:scale-95">
                <Heart size={14} />
                <span>{tweet.likes}</span>
              </button>
              <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors active:scale-95">
                <ExternalLink size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TwitterFeedScreen;
