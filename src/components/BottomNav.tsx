import { useState } from "react";
import { Home, Search, Bell, MapPin } from "lucide-react";

type Tab = "home" | "search" | "alerts" | "lines";

interface BottomNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const tabs = [
  { id: "home" as Tab, label: "Início", icon: Home },
  { id: "search" as Tab, label: "Buscar", icon: Search },
  { id: "alerts" as Tab, label: "Alertas", icon: Bell },
  { id: "lines" as Tab, label: "Linhas", icon: MapPin },
];

const BottomNav = ({ activeTab, onTabChange }: BottomNavProps) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 glass-surface border-t border-border safe-bottom z-50">
      <div className="flex items-center justify-around max-w-md mx-auto h-16">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center gap-0.5 px-4 py-2 rounded-xl transition-all duration-200 ease-out active:scale-95 ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon
                size={22}
                strokeWidth={isActive ? 2.5 : 2}
                className="transition-all duration-200"
              />
              <span className={`text-[10px] font-medium tracking-wide ${isActive ? "font-semibold" : ""}`}>
                {tab.label}
              </span>
              {isActive && (
                <div className="absolute -top-0 w-8 h-0.5 bg-primary rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
export type { Tab };
