import { useState } from "react";
import { ArrowLeft, Eye, EyeOff, Mail, Lock, User } from "lucide-react";

interface AuthScreenProps {
  onBack: () => void;
  onLogin: () => void;
}

type AuthMode = "login" | "register" | "forgot";

const AuthScreen = ({ onBack, onLogin }: AuthScreenProps) => {
  const [mode, setMode] = useState<AuthMode>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [resetSent, setResetSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "forgot") {
      setResetSent(true);
      return;
    }
    onLogin();
  };

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto">
      {/* Header */}
      <div className="px-5 pt-14 pb-6">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground mb-6 active:scale-95 transition-transform">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-display font-bold text-foreground">
          {mode === "login" && "Entrar"}
          {mode === "register" && "Criar conta"}
          {mode === "forgot" && "Recuperar senha"}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          {mode === "login" && "Acesse sua conta para acompanhar suas linhas"}
          {mode === "register" && "Cadastre-se para reportar alertas e favoritar linhas"}
          {mode === "forgot" && "Enviaremos um link para redefinir sua senha"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="px-5 space-y-4">
        {mode === "register" && (
          <div className="opacity-0 animate-fade-up" style={{ animationFillMode: "forwards" }}>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Nome</label>
            <div className="flex items-center gap-3 bg-card border-2 border-border rounded-xl px-4 py-3 focus-within:border-primary/40 transition-colors">
              <User size={18} className="text-muted-foreground shrink-0" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome completo"
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
              />
            </div>
          </div>
        )}

        <div className="opacity-0 animate-fade-up" style={{ animationDelay: mode === "register" ? "80ms" : "0ms", animationFillMode: "forwards" }}>
          <label className="text-sm font-medium text-foreground mb-1.5 block">E-mail</label>
          <div className="flex items-center gap-3 bg-card border-2 border-border rounded-xl px-4 py-3 focus-within:border-primary/40 transition-colors">
            <Mail size={18} className="text-muted-foreground shrink-0" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
            />
          </div>
        </div>

        {mode !== "forgot" && (
          <div className="opacity-0 animate-fade-up" style={{ animationDelay: mode === "register" ? "160ms" : "80ms", animationFillMode: "forwards" }}>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Senha</label>
            <div className="flex items-center gap-3 bg-card border-2 border-border rounded-xl px-4 py-3 focus-within:border-primary/40 transition-colors">
              <Lock size={18} className="text-muted-foreground shrink-0" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-muted-foreground active:scale-95">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        )}

        {mode === "login" && (
          <div className="flex justify-end">
            <button type="button" onClick={() => setMode("forgot")} className="text-sm text-primary font-medium active:scale-95">
              Esqueci minha senha
            </button>
          </div>
        )}

        {mode === "forgot" && resetSent ? (
          <div className="p-4 rounded-xl bg-status-ok/10 border border-status-ok/20">
            <p className="text-sm text-status-ok font-medium">Link enviado! Verifique seu e-mail.</p>
          </div>
        ) : (
          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-base active:scale-[0.98] transition-transform transit-shadow"
          >
            {mode === "login" && "Entrar"}
            {mode === "register" && "Criar conta"}
            {mode === "forgot" && "Enviar link"}
          </button>
        )}

        {/* Social login */}
        {mode !== "forgot" && (
          <div className="pt-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground">ou continue com</span>
              <div className="flex-1 h-px bg-border" />
            </div>
            <div className="flex gap-3">
              <button type="button" className="flex-1 py-3 rounded-xl border-2 border-border bg-card text-sm font-medium text-foreground active:scale-[0.97] transition-transform">
                Google
              </button>
              <button type="button" className="flex-1 py-3 rounded-xl border-2 border-border bg-card text-sm font-medium text-foreground active:scale-[0.97] transition-transform">
                Apple
              </button>
            </div>
          </div>
        )}

        {/* Switch mode */}
        <div className="text-center pt-4 pb-8">
          {mode === "login" && (
            <p className="text-sm text-muted-foreground">
              Não tem conta?{" "}
              <button type="button" onClick={() => setMode("register")} className="text-primary font-semibold active:scale-95">
                Cadastre-se
              </button>
            </p>
          )}
          {mode === "register" && (
            <p className="text-sm text-muted-foreground">
              Já tem conta?{" "}
              <button type="button" onClick={() => setMode("login")} className="text-primary font-semibold active:scale-95">
                Entrar
              </button>
            </p>
          )}
          {mode === "forgot" && (
            <button type="button" onClick={() => setMode("login")} className="text-sm text-primary font-semibold active:scale-95">
              Voltar ao login
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AuthScreen;
