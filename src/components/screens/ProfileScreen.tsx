import { useState } from "react";
import { User, ChevronRight, Bell, Shield, FileText, HelpCircle, LogOut, Star, MapPin, Settings, Newspaper, Moon, Smartphone } from "lucide-react";

interface ProfileScreenProps {
  onNavigate: (screen: string) => void;
  onLogout: () => void;
}

const menuSections = [
  {
    title: "Conta",
    items: [
      { id: "edit-profile", label: "Editar perfil", icon: User, subtitle: "Nome, e-mail, foto" },
      { id: "favorites", label: "Linhas favoritas", icon: Star, subtitle: "3 linhas salvas" },
      { id: "notifications-settings", label: "Configurar notificações", icon: Bell, subtitle: "Alertas e avisos" },
    ],
  },
  {
    title: "Geral",
    items: [
      { id: "news", label: "Notícias", icon: Newspaper },
      { id: "help", label: "Central de ajuda", icon: HelpCircle },
      { id: "about", label: "Sobre o app", icon: Smartphone, subtitle: "Versão 2.1.0" },
    ],
  },
  {
    title: "Legal",
    items: [
      { id: "privacy", label: "Política de privacidade", icon: Shield },
      { id: "terms", label: "Termos de uso", icon: FileText },
    ],
  },
];

const ProfileScreen = ({ onNavigate, onLogout }: ProfileScreenProps) => {
  return (
    <div className="px-5">
      <div className="pt-14 pb-4">
        <h1 className="text-2xl font-display font-bold text-foreground">Perfil</h1>
      </div>

      {/* User card */}
      <div className="flex items-center gap-4 p-4 bg-card rounded-2xl transit-shadow mb-6 opacity-0 animate-fade-up" style={{ animationFillMode: "forwards" }}>
        <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-display font-bold text-lg">
          JR
        </div>
        <div className="flex-1">
          <h2 className="font-semibold text-foreground">João Ribeiro</h2>
          <p className="text-xs text-muted-foreground">joao.ribeiro@email.com</p>
        </div>
        <ChevronRight size={18} className="text-muted-foreground" />
      </div>

      {/* Stats */}
      <div className="flex gap-3 mb-6 opacity-0 animate-fade-up" style={{ animationDelay: "100ms", animationFillMode: "forwards" }}>
        <div className="flex-1 p-3 bg-card rounded-xl transit-shadow text-center">
          <p className="text-xl font-display font-bold text-foreground">47</p>
          <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Alertas</p>
        </div>
        <div className="flex-1 p-3 bg-card rounded-xl transit-shadow text-center">
          <p className="text-xl font-display font-bold text-foreground">312</p>
          <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Confirmações</p>
        </div>
        <div className="flex-1 p-3 bg-card rounded-xl transit-shadow text-center">
          <p className="text-xl font-display font-bold text-accent">Ouro</p>
          <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Nível</p>
        </div>
      </div>

      {/* Menu sections */}
      {menuSections.map((section, si) => (
        <div key={section.title} className="mb-5 opacity-0 animate-fade-up" style={{ animationDelay: `${(si + 2) * 80}ms`, animationFillMode: "forwards" }}>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-1">{section.title}</h3>
          <div className="bg-card rounded-xl transit-shadow overflow-hidden">
            {section.items.map((item, i) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-secondary/50 transition-colors active:scale-[0.99] border-b border-border/60 last:border-0"
              >
                <item.icon size={18} className="text-muted-foreground shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">{item.label}</p>
                  {item.subtitle && <p className="text-[10px] text-muted-foreground">{item.subtitle}</p>}
                </div>
                <ChevronRight size={16} className="text-muted-foreground shrink-0" />
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* Logout */}
      <button
        onClick={onLogout}
        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-destructive font-medium text-sm mb-8 active:scale-[0.98] transition-transform"
      >
        <LogOut size={16} />
        Sair da conta
      </button>
    </div>
  );
};

export default ProfileScreen;
