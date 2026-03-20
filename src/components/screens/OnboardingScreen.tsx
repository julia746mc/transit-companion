import { useState } from "react";
import { ArrowLeft, ArrowRight, TrainFront } from "lucide-react";

interface OnboardingScreenProps {
  onComplete: () => void;
  onLogin: () => void;
}

const slides = [
  {
    title: "Sua viagem começa aqui",
    description: "Planeje rotas, acompanhe linhas em tempo real e receba alertas importantes.",
    emoji: "🚆",
  },
  {
    title: "Informação da comunidade",
    description: "Alertas reportados por outros passageiros para você chegar mais rápido.",
    emoji: "👥",
  },
  {
    title: "Todas as linhas na palma da mão",
    description: "Trem, metrô e ônibus. Tudo integrado em um só lugar.",
    emoji: "🗺️",
  },
];

const OnboardingScreen = ({ onComplete, onLogin }: OnboardingScreenProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const next = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="min-h-screen bg-primary flex flex-col max-w-md mx-auto">
      {/* Skip */}
      <div className="flex justify-end px-5 pt-14">
        <button onClick={onLogin} className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors active:scale-95">
          Pular
        </button>
      </div>

      {/* Slide content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        <div className="text-8xl mb-8 opacity-0 animate-fade-up" key={currentSlide} style={{ animationFillMode: "forwards" }}>
          {slides[currentSlide].emoji}
        </div>
        <h1
          className="text-3xl font-display font-bold text-primary-foreground mb-4 opacity-0 animate-fade-up leading-tight"
          key={`t-${currentSlide}`}
          style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
        >
          {slides[currentSlide].title}
        </h1>
        <p
          className="text-primary-foreground/70 text-base leading-relaxed max-w-xs opacity-0 animate-fade-up"
          key={`d-${currentSlide}`}
          style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
        >
          {slides[currentSlide].description}
        </p>
      </div>

      {/* Dots & Actions */}
      <div className="px-8 pb-12">
        <div className="flex justify-center gap-2 mb-8">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === currentSlide ? "w-8 bg-primary-foreground" : "w-2 bg-primary-foreground/30"
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="w-full py-4 rounded-2xl bg-primary-foreground text-primary font-semibold text-base flex items-center justify-center gap-2 active:scale-[0.98] transition-transform transit-shadow-lg"
        >
          {currentSlide < slides.length - 1 ? (
            <>Próximo <ArrowRight size={18} /></>
          ) : (
            <>Começar <TrainFront size={18} /></>
          )}
        </button>

        <button
          onClick={onLogin}
          className="w-full mt-3 py-3 text-primary-foreground/70 text-sm font-medium active:scale-[0.98] transition-transform"
        >
          Já tenho conta
        </button>
      </div>
    </div>
  );
};

export default OnboardingScreen;
